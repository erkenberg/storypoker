'use client';

import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlayerState } from '@/app/table/[tableId]/player-state';
import { cardValues } from '@/app/table/[tableId]/game-state';
import { Button, Card, Stack } from '@mui/material';
import { Chart } from '@/app/table/[tableId]/chart';
import { UsernameInput } from '@/app/table/[tableId]/username-input';

interface Props {
  params: { tableId: string };
}

export default function Page({ params }: Props): JSX.Element {
  const tableId = params.tableId;
  const [ownState, setOwnState] = useState<PlayerState>({
    // TODO: uuid and/or localStorage
    clientId: `${Math.round(Math.random() * 100000)}`,
    username: '',
    selectedValue: null,
  });
  const [otherPlayersState, setOtherPlayersState] = useState<PlayerState[]>([]);
  const [revealed, setRevealed] = useState(false);
  // TODO: extract to context provider
  const client = useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
      {
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      },
    );
  }, []);
  const channel = useMemo(() => {
    return client.channel(`table-${tableId}`);
  }, [client, tableId]);
  useEffect(() => {
    const listeners = channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<PlayerState>();
        const otherState = Object.values(state)
          .map((st) => ({
            clientId: st[0].clientId,
            username: st[0].username,
            selectedValue: st[0].selectedValue,
          }))
          .filter((st) => st.clientId !== ownState.clientId);
        setOtherPlayersState(otherState);
      })
      .on('broadcast', { event: 'reveal' }, () => {
        setRevealed(true);
      })
      .on('broadcast', { event: 'reset' }, () => {
        setRevealed(false);
        setOwnState((oldState) => ({
          ...oldState,
          selectedValue: null,
        }));
      })
      .subscribe();
    return () => {
      listeners.unsubscribe();
    };
  }, [channel, ownState.clientId]);

  useEffect(() => {
    channel.track(ownState);
  }, [channel, ownState]);

  const updateUsername = useCallback((username: string): void => {
    setOwnState((oldState) => ({ ...oldState, username }));
  }, []);

  if (!ownState.username) {
    return <UsernameInput onSubmit={updateUsername} />;
  }

  const getUsedValues = (): string[] =>
    cardValues.filter(
      (value) =>
        ownState.selectedValue === value ||
        otherPlayersState.some((state) => state.selectedValue === value),
    );

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        marginTop: '10vh',
        marginLeft: '10vw',
        marginRight: '10vw',
      }}
    >
      <div>
        <Card sx={{ minWidth: '150px' }} variant={'outlined'}>
          <ul>
            <li key={ownState.clientId}>
              {ownState.username}{' '}
              {revealed
                ? ownState.selectedValue
                : ownState.selectedValue != null
                ? '✓'
                : ''}
            </li>
            {otherPlayersState.map((state) => (
              <li key={state.clientId}>
                {state.username}{' '}
                {revealed
                  ? state.selectedValue
                  : state.selectedValue != null
                  ? '✓'
                  : ''}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Stack direction="column" spacing={2}>
        <div>
          {cardValues.map((value) => {
            return (
              <Button
                disabled={revealed}
                variant={
                  ownState.selectedValue !== value ? 'outlined' : 'contained'
                }
                key={value}
                value={value}
                sx={{ height: '80px', margin: '4px' }}
                onClick={({ currentTarget }): void => {
                  setOwnState((oldState) => ({
                    ...oldState,
                    selectedValue:
                      oldState.selectedValue === value
                        ? null
                        : currentTarget.value,
                  }));
                }}
              >
                {value}
              </Button>
            );
          })}
        </div>
        <div>
          {!revealed &&
            (ownState.selectedValue ||
              otherPlayersState.some(
                (state) => state.selectedValue != null,
              )) && (
              <Button
                variant={'contained'}
                onClick={(): void => {
                  channel.send({
                    type: 'broadcast',
                    event: 'reveal',
                  });
                  setRevealed(true);
                }}
              >
                Reveal
              </Button>
            )}
          {revealed && (
            <Button
              variant={'contained'}
              onClick={(): void => {
                channel.send({
                  type: 'broadcast',
                  event: 'reset',
                });
                setRevealed(false);
                setOwnState((oldState) => ({
                  ...oldState,
                  selectedValue: null,
                }));
              }}
            >
              Reset
            </Button>
          )}
        </div>

        {revealed && (
          <Chart
            data={getUsedValues().map((value) => {
              let count = 0;
              if (ownState.selectedValue === value) count++;
              for (const state of otherPlayersState) {
                if (state.selectedValue === value) count++;
              }
              return count;
            })}
            labels={getUsedValues()}
          />
        )}
      </Stack>
    </Stack>
  );
}
