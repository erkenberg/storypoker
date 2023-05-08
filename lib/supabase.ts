import { useMemo } from 'react';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';

export const useSupabaseChannel = (channelId: string): RealtimeChannel => {
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
    return client.channel(channelId);
  }, [client, channelId]);
};
