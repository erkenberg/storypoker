import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import { MuiSetup } from './mui-setup';
import { JSX, ReactNode, Suspense } from 'react';
import { AppBar } from '@/app/table/components/app-bar';
import { Container } from '@mui/material';

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
        <MuiSetup>
          <AppBar />
          <Suspense>
            <Container maxWidth={'xl'}>{children}</Container>
          </Suspense>
        </MuiSetup>
      </body>
    </html>
  );
}
