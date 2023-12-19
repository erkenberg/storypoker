/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode leads to errors in the `app/table/[tablename]/client-page.tsx` useeffects for subscribing to the
  // supabase channels when executing the `useEffect`s twice in dev mode.
  // TODO: figure out to correctly setup the `useEffect`s and enable strict mode again
  // (lol, as if this will ever happen)
  reactStrictMode: false,
};

module.exports = nextConfig;
