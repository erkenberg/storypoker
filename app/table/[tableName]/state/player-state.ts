export interface PlayerState {
  clientId: string;
  username: string;
  selectedValue: string | null;
  isModerator: boolean;
  isObserver: boolean;
  /**
   * Timestamp when the client last had any activity on the shared state.
   */
  timestamp?: number;
  isOffline?: boolean;
}

const maxOfflineTime = 5 * 60 * 1000;

export const mergePlayerState = (
  oldRemotePlayerStates: PlayerState[],
  newRemotePlayerStates: PlayerState[],
): PlayerState[] => {
  const now = Date.now();
  return [
    // players that are no longer tracked by realtime (e.g. because they closed the page) but are still kept in state
    // for some time in case they come back
    ...oldRemotePlayerStates
      .filter((state) => {
        // Only keep clients that are inactive for at most maxInactiveTime
        return (
          (!state.timestamp || now - state.timestamp < maxOfflineTime) &&
          // remove clients that are active
          !newRemotePlayerStates.some(
            ({ clientId }) => clientId === state.clientId,
          )
        );
      })
      .map((state) => ({ ...state, isOffline: true })),
    // players currently tracked
    ...newRemotePlayerStates.map((state) => ({
      ...state,
      isOffline: false,
    })),
  ];
};
