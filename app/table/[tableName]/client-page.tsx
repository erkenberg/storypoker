'use client';

import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import {
  mergeRemotePlayerState,
  PlayerState,
  RemotePlayerState,
} from '@/app/table/[tableName]/player-state';
import { cardValues, getValueColor } from '@/app/table/[tableName]/game-state';
import { Button, Grid, Stack } from '@mui/material';
import { useSupabaseChannel } from '@/lib/supabase/use-supabase-channel';
import { PlayerOverview } from '@/app/table/[tableName]/player-overview';
import { useClientId } from '@/lib/use-client-id';
import { useUsername } from '@/lib/use-username';
import { Results } from '@/app/table/[tableName]/results';
import { TableData } from '@/lib/supabase/get-table-data';

interface ClientPageProps {
  tableData: TableData;
}

export default function ClientPage({
  tableData,
}: ClientPageProps): JSX.Element {
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
  const mergedPlayerStates = useMemo(
    () => [ownState, ...remotePlayerStates.filter((state) => !state.isOffline)],
    [ownState, remotePlayerStates],
  );
  const [revealed, setRevealed] = useState(false);
  const channel = useSupabaseChannel(`table-${tableData.name}`);
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

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '10vh',
      }}
    >
      <Grid item xs={12} sm={4} md={3} sx={{ width: '100%' }}>
        <PlayerOverview
          ownState={ownState}
          remotePlayerStates={remotePlayerStates}
          revealed={revealed}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Grid container>
          <Grid item xs={12} lg={8} sx={{ marginBottom: '16px' }}>
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
                disabled={revealed || ownState.selectedValue === null}
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
            {revealed && <Results playerStates={mergedPlayerStates} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
