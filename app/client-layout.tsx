'use client';

import { Container } from '@mui/material';
import { JSX, ReactNode } from 'react';

type ClientLayoutProps = {
  children: ReactNode;
};

export const ClientLayout = ({ children }: ClientLayoutProps): JSX.Element => {
  return <Container maxWidth={'xl'}>{children}</Container>;
};
