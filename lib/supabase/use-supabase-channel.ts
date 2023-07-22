import { useMemo } from 'react';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { useClientId } from '@/lib/use-client-id';

export const useSupabaseChannel = (channelId: string): RealtimeChannel => {
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
  return useMemo(() => {
    return client.channel(channelId, {
      config: { presence: { key: clientId } },
    });
  }, [client, channelId, clientId]);
};
