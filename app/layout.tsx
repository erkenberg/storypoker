import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import { MuiSetup } from './mui-setup';
import { JSX, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'StoryPoker',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <MuiSetup>{children}</MuiSetup>
      </body>
    </html>
  );
}
