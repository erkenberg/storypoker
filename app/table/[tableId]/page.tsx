'use client';

import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  mergeRemotePlayerState,
  PlayerState,
  RemotePlayerState,
} from '@/app/table/[tableId]/player-state';
import { cardValues } from '@/app/table/[tableId]/game-state';
import { Button, Card, Stack } from '@mui/material';
import { Chart } from '@/app/table/[tableId]/chart';
import { UsernameInput } from '@/app/table/[tableId]/username-input';
import { useSupabaseChannel } from '@/lib/supabase';
import { PlayerOverview } from '@/app/table/[tableId]/player-overview';

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
  const [remotePlayerStates, setRemotePlayerStates] = useState<
    RemotePlayerState[]
  >([]);
  const [revealed, setRevealed] = useState(false);
  const channel = useSupabaseChannel(`table-${tableId}`);

  useEffect(() => {
    const listeners = channel
      .on('presence', { event: 'sync' }, () => {
        const state2 = channel.presenceState<PlayerState>();
        const remoteStates = Object.values(state2)
          .map((state) => ({
            clientId: state[0].clientId,
            username: state[0].username,
            selectedValue: state[0].selectedValue,
          }))
          .filter((state) => state.clientId !== ownState.clientId);

        setRemotePlayerStates((oldRemoteStates) =>
          mergeRemotePlayerState(oldRemoteStates, remoteStates),
        );
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
        remotePlayerStates.some(
          (state) => !state.isOffline && state.selectedValue === value,
        ),
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
        <PlayerOverview
          ownState={ownState}
          remotePlayerStates={remotePlayerStates}
          revealed={revealed}
        />
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
        <Stack direction="row" spacing={4}>
          <Button
            disabled={
              revealed ||
              (ownState.selectedValue === null &&
                remotePlayerStates.every(
                  (state) => state.isOffline || state.selectedValue === null,
                ))
            }
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

          <Button
            variant={'contained'}
            disabled={!revealed}
            onClick={(): void => {
              channel.send({
                type: 'broadcast',
                event: 'reset',
              });
              // NOTE: channels have a default rate limit of 1 message per 100ms.
              // After the broadcast we need to wait a bit before our updated own state can be actually properly distributed.
              setTimeout(() => {
                setRevealed(false);
                setOwnState((oldState) => ({
                  ...oldState,
                  selectedValue: null,
                }));
              }, 110);
            }}
          >
            Reset
          </Button>
        </Stack>
        <Stack direction="row" spacing={4}>
          <div style={{ maxWidth: '400px' }}>
            {revealed && (
              <Chart
                data={getUsedValues().map((value) => {
                  let count = 0;
                  if (ownState.selectedValue === value) count++;
                  for (const state of remotePlayerStates) {
                    if (!state.isOffline && state.selectedValue === value)
                      count++;
                  }
                  return count;
                })}
                labels={getUsedValues()}
              />
            )}
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}
