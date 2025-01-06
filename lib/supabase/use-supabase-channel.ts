import { useMemo } from 'react';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { useClientId } from '@/lib/use-client-id';

const client = createClient(
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

export const useSupabaseChannel = (
  channelId: string,
): [RealtimeChannel, () => void] => {
  const clientId = useClientId();
  const channel = useMemo(() => {
    return client.channel(channelId, {
      config: { presence: { key: clientId } },
    });
  }, [channelId, clientId]);

  const cleanup = useMemo(
    () => (): Promise<'ok' | 'timed out' | 'error'> =>
      client.removeChannel(channel),
    [channel],
  );
  return [channel, cleanup];
};
