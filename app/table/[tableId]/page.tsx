'use client';

import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  mergeRemotePlayerState,
  PlayerState,
  RemotePlayerState,
} from '@/app/table/[tableId]/player-state';
import { cardValues, getValueColor } from '@/app/table/[tableId]/game-state';
import { Button, Grid, Stack } from '@mui/material';
import { Chart } from '@/app/table/[tableId]/chart';
import { useSupabaseChannel } from '@/lib/supabase';
import { PlayerOverview } from '@/app/table/[tableId]/player-overview';
import { Statistics } from '@/app/table/[tableId]/statistics';
import { useClientId } from '@/lib/use-client-id';
import { useUsername } from '@/lib/use-username';

interface Props {
  params: { tableId: string };
}

export default function Page({ params }: Props): JSX.Element {
  const tableId = params.tableId;
  const clientId = useClientId();
  const { username } = useUsername();
  const [ownState, setOwnState] = useState<PlayerState>({
    clientId,
    username,
    selectedValue: null,
  });
  const [remotePlayerStates, setRemotePlayerStates] = useState<
    RemotePlayerState[]
  >([]);
  const [revealed, setRevealed] = useState(false);
  const channel = useSupabaseChannel(`table-${tableId}`);
  const resetState = useCallback(() => {
    setRevealed(false);
    setOwnState((oldState) => ({
      ...oldState,
      selectedValue: null,
    }));
    setRemotePlayerStates((oldStates) =>
      oldStates.map((state) =>
        state.isOffline ? { ...state, selectedValue: null } : state,
      ),
    );
  }, [setRemotePlayerStates, setRevealed, setOwnState]);

  useEffect(() => {
    const listeners = channel
      .on('presence', { event: 'sync' }, () => {
        const realTimeState = channel.presenceState<PlayerState>();
        const remoteStates = Object.values(realTimeState)
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
        resetState();
      })
      .subscribe();
    return () => {
      listeners.unsubscribe();
    };
  }, [channel, ownState.clientId, resetState]);

  useEffect(() => {
    if (ownState.username.length > 0) {
      channel.track(ownState);
    }
  }, [channel, ownState]);

  useEffect(() => {
    setOwnState((oldState) => ({ ...oldState, username }));
  }, [username]);

  const getUsedValues = (): string[] =>
    cardValues.filter(
      (value) =>
        ownState.selectedValue === value ||
        remotePlayerStates.some((state) => state.selectedValue === value),
    );

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '10vh',
      }}
    >
      <Grid item xs={12} sm={4} md={2} sx={{ width: '100%' }}>
        <PlayerOverview
          ownState={ownState}
          remotePlayerStates={remotePlayerStates}
          revealed={revealed}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={10}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            {cardValues.map((value) => {
              const color = getValueColor(value)?.regular;
              const colorDark = getValueColor(value)?.dark;
              return (
                <Button
                  disabled={revealed}
                  key={value}
                  variant={
                    ownState.selectedValue !== value ? 'outlined' : 'contained'
                  }
                  value={value}
                  sx={{
                    height: '80px',
                    margin: '4px',
                    borderColor: color,
                    color: ownState.selectedValue !== value ? color : undefined,
                    backgroundColor:
                      ownState.selectedValue === value ? color : undefined,
                    '&.MuiButtonBase-root:hover': {
                      backgroundColor:
                        ownState.selectedValue === value
                          ? colorDark
                          : undefined,
                      borderColor: colorDark,
                    },
                    fontWeight: 'bold',
                  }}
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
            <Stack direction="row" spacing={4} sx={{ marginTop: '8px' }}>
              <Button
                disabled={
                  revealed ||
                  (ownState.selectedValue === null &&
                    remotePlayerStates.every(
                      (state) =>
                        state.isOffline || state.selectedValue === null,
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
                  setTimeout(() => resetState(), 110);
                }}
              >
                Reset
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Stack direction="column" spacing={2}>
              {revealed && (
                <div style={{ margin: 'auto' }}>
                  <Chart
                    data={getUsedValues().map((value) => {
                      let count = 0;
                      if (ownState.selectedValue === value) count++;
                      for (const state of remotePlayerStates) {
                        if (state.selectedValue === value) count++;
                      }
                      return count;
                    })}
                    labels={getUsedValues()}
                  />
                  <Statistics
                    ownState={ownState}
                    remotePlayerStates={remotePlayerStates}
                  />
                </div>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
