import React, { FC, JSX, ReactNode } from 'react';
import Image from 'next/image';
import pokercats from '@/public/pokercats.jpg';

interface CatImageProps {
  label: ReactNode;
}

export const CatImage: FC<CatImageProps> = ({ label }): JSX.Element => {
  return (
    <div style={{ margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          src={pokercats}
          alt="Picture of cats playing poker"
          width={300}
          style={{ borderRadius: '64px' }}
        />
      </div>
      {label}
    </div>
  );
};
