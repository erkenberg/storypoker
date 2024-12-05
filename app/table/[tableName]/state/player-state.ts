export interface PlayerState {
  clientId: string;
  username: string;
  selectedValue: string | null;
}

export interface RemotePlayerState extends PlayerState {
  /**
   * Timestamp when the client last had any activity on the shared state.
   */
  lastActive: number;
  isOffline: boolean;
}

export const mergeRemotePlayerState = (
  oldRemotePlayerStates: RemotePlayerState[],
  newRemotePlayerStates: PlayerState[],
): RemotePlayerState[] => {
  const now = Date.now();
  const currentlyActiveClientIds = newRemotePlayerStates.map(
    ({ clientId }) => clientId,
  );

  const inactiveRemotePlayerStates = oldRemotePlayerStates
    .filter((state) => {
      return (
        // remove clients that are inactive for more than 1 minute
        (state.lastActive === undefined ||
          now - state.lastActive < 60 * 1000) &&
        // remove clients that are active
        !currentlyActiveClientIds.includes(state.clientId)
      );
    })
    .map((state) => ({ ...state, lastActive: now, isOffline: true }));
  const newRemotePlayerStatesWithActive = newRemotePlayerStates.map(
    (state) => ({ ...state, lastActive: now, isOffline: false }),
  );
  return [...newRemotePlayerStatesWithActive, ...inactiveRemotePlayerStates];
};
