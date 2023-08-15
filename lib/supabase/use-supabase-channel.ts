import { useMemo } from 'react';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { useClientId } from '@/lib/use-client-id';

export const useSupabaseChannel = (
  channelId: string,
): [RealtimeChannel, () => void] => {
  const clientId = useClientId();
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
    return client.channel(channelId, {
      config: { presence: { key: clientId } },
    });
  }, [client, channelId, clientId]);

  const cleanup = useMemo(
    () => () => client.removeChannel(channel),
    [client, channel],
  );
  return [channel, cleanup];
};
