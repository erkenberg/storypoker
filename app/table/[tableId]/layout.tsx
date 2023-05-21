'use client';

import React, { JSX, ReactNode, useEffect, useState } from 'react';
import { useUsername } from '@/lib/use-username';

export default function TableLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { UsernameInput } = useUsername();
  // Accessing the username via localStorage and conditionally rendering the login throws
  // hydration errors if we don't wait for the component to be fully mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <></>;
  }

  return (
    <>
      {UsernameInput && <UsernameInput />}
      {/* If we show the usernameInput we want to hide actual page (but still render it,*/}
      {/*  so that we keep the state if we just briefly edit our name )*/}
      <div
        style={UsernameInput ? { visibility: 'hidden', display: 'none' } : {}}
      >
        {children}
      </div>
    </>
  );
}
