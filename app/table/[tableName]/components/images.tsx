import React, { FC, JSX, ReactNode } from 'react';
import Image from 'next/image';

import cat_image_00001 from '@/public/pokercats/pokercats-00001.png';
import cat_image_00002 from '@/public/pokercats/pokercats-00002.png';
import cat_image_00003 from '@/public/pokercats/pokercats-00003.png';
import cat_image_00004 from '@/public/pokercats/pokercats-00004.png';
import cat_image_00005 from '@/public/pokercats/pokercats-00005.png';
import cat_image_00006 from '@/public/pokercats/pokercats-00006.png';
import cat_image_00007 from '@/public/pokercats/pokercats-00007.png';
import cat_image_00008 from '@/public/pokercats/pokercats-00008.png';
import cat_image_00009 from '@/public/pokercats/pokercats-00009.png';
import cat_image_00010 from '@/public/pokercats/pokercats-00010.png';
import cat_image_00011 from '@/public/pokercats/pokercats-00011.png';
import cat_image_00012 from '@/public/pokercats/pokercats-00012.png';
import cat_image_00013 from '@/public/pokercats/pokercats-00013.png';
import cat_image_00014 from '@/public/pokercats/pokercats-00014.png';
import cat_image_00015 from '@/public/pokercats/pokercats-00015.png';
import cat_image_00016 from '@/public/pokercats/pokercats-00016.png';
import cat_image_00017 from '@/public/pokercats/pokercats-00017.png';
import cat_image_00018 from '@/public/pokercats/pokercats-00018.png';
import cat_image_00019 from '@/public/pokercats/pokercats-00019.png';
import cat_image_00020 from '@/public/pokercats/pokercats-00020.png';
import cat_image_00021 from '@/public/pokercats/pokercats-00021.png';
import cat_image_00022 from '@/public/pokercats/pokercats-00022.png';
import cat_image_00023 from '@/public/pokercats/pokercats-00023.png';
import cat_image_00024 from '@/public/pokercats/pokercats-00024.png';
import cat_image_00025 from '@/public/pokercats/pokercats-00025.png';
import cat_image_00026 from '@/public/pokercats/pokercats-00026.png';
import cat_image_00027 from '@/public/pokercats/pokercats-00027.png';
import cat_image_00028 from '@/public/pokercats/pokercats-00028.png';
import cat_image_00029 from '@/public/pokercats/pokercats-00029.png';
import cat_image_00030 from '@/public/pokercats/pokercats-00030.png';
import cat_image_00031 from '@/public/pokercats/pokercats-00031.png';
import cat_image_00032 from '@/public/pokercats/pokercats-00032.png';
import cat_image_00033 from '@/public/pokercats/pokercats-00033.png';
import cat_image_00034 from '@/public/pokercats/pokercats-00034.png';
import cat_image_00035 from '@/public/pokercats/pokercats-00035.png';
import cat_image_00036 from '@/public/pokercats/pokercats-00036.png';
import cat_image_00037 from '@/public/pokercats/pokercats-00037.png';
import cat_image_00038 from '@/public/pokercats/pokercats-00038.png';
import cat_image_00039 from '@/public/pokercats/pokercats-00039.png';
import cat_image_00040 from '@/public/pokercats/pokercats-00040.png';
import cat_image_00041 from '@/public/pokercats/pokercats-00041.png';
import cat_image_00042 from '@/public/pokercats/pokercats-00042.png';
import cat_image_00043 from '@/public/pokercats/pokercats-00043.png';
import cat_image_00044 from '@/public/pokercats/pokercats-00044.png';
import cat_image_00045 from '@/public/pokercats/pokercats-00045.png';
import cat_image_00046 from '@/public/pokercats/pokercats-00046.png';
import dog_image_00001 from '@/public/pokerdogs/pokerdogs-00001.png';
import dog_image_00002 from '@/public/pokerdogs/pokerdogs-00002.png';
import dog_image_00003 from '@/public/pokerdogs/pokerdogs-00003.png';
import dog_image_00004 from '@/public/pokerdogs/pokerdogs-00004.png';
import dog_image_00005 from '@/public/pokerdogs/pokerdogs-00005.png';
import dog_image_00006 from '@/public/pokerdogs/pokerdogs-00006.png';
import dog_image_00007 from '@/public/pokerdogs/pokerdogs-00007.png';
import dog_image_00008 from '@/public/pokerdogs/pokerdogs-00008.png';
import dog_image_00009 from '@/public/pokerdogs/pokerdogs-00009.png';
import dog_image_00010 from '@/public/pokerdogs/pokerdogs-00010.png';
import dog_image_00011 from '@/public/pokerdogs/pokerdogs-00011.png';
import dog_image_00012 from '@/public/pokerdogs/pokerdogs-00012.png';
import dog_image_00013 from '@/public/pokerdogs/pokerdogs-00013.png';
import dog_image_00014 from '@/public/pokerdogs/pokerdogs-00014.png';
import dog_image_00015 from '@/public/pokerdogs/pokerdogs-00015.png';
import dog_image_00016 from '@/public/pokerdogs/pokerdogs-00016.png';
import dog_image_00017 from '@/public/pokerdogs/pokerdogs-00017.png';
import dog_image_00018 from '@/public/pokerdogs/pokerdogs-00018.png';
import dog_image_00019 from '@/public/pokerdogs/pokerdogs-00019.png';
import dog_image_00020 from '@/public/pokerdogs/pokerdogs-00020.png';
import dog_image_00021 from '@/public/pokerdogs/pokerdogs-00021.png';
import dog_image_00022 from '@/public/pokerdogs/pokerdogs-00022.png';
import dog_image_00023 from '@/public/pokerdogs/pokerdogs-00023.png';
import dog_image_00024 from '@/public/pokerdogs/pokerdogs-00024.png';
import dog_image_00025 from '@/public/pokerdogs/pokerdogs-00025.png';
import dog_image_00026 from '@/public/pokerdogs/pokerdogs-00026.png';
import dog_image_00027 from '@/public/pokerdogs/pokerdogs-00027.png';
import dog_image_00028 from '@/public/pokerdogs/pokerdogs-00028.png';
import dog_image_00029 from '@/public/pokerdogs/pokerdogs-00029.png';
import dog_image_00030 from '@/public/pokerdogs/pokerdogs-00030.png';
import dog_image_00031 from '@/public/pokerdogs/pokerdogs-00031.png';
import dog_image_00032 from '@/public/pokerdogs/pokerdogs-00032.png';

const images = [
  cat_image_00001,
  cat_image_00002,
  cat_image_00003,
  cat_image_00004,
  cat_image_00005,
  cat_image_00006,
  cat_image_00007,
  cat_image_00008,
  cat_image_00009,
  cat_image_00010,
  cat_image_00011,
  cat_image_00012,
  cat_image_00013,
  cat_image_00014,
  cat_image_00015,
  cat_image_00016,
  cat_image_00017,
  cat_image_00018,
  cat_image_00019,
  cat_image_00020,
  cat_image_00021,
  cat_image_00022,
  cat_image_00023,
  cat_image_00024,
  cat_image_00025,
  cat_image_00026,
  cat_image_00027,
  cat_image_00028,
  cat_image_00029,
  cat_image_00030,
  cat_image_00031,
  cat_image_00032,
  cat_image_00033,
  cat_image_00034,
  cat_image_00035,
  cat_image_00036,
  cat_image_00037,
  cat_image_00038,
  cat_image_00039,
  cat_image_00040,
  cat_image_00041,
  cat_image_00042,
  cat_image_00043,
  cat_image_00044,
  cat_image_00045,
  cat_image_00046,
  dog_image_00001,
  dog_image_00002,
  dog_image_00003,
  dog_image_00004,
  dog_image_00005,
  dog_image_00006,
  dog_image_00007,
  dog_image_00008,
  dog_image_00009,
  dog_image_00010,
  dog_image_00011,
  dog_image_00012,
  dog_image_00013,
  dog_image_00014,
  dog_image_00015,
  dog_image_00016,
  dog_image_00017,
  dog_image_00018,
  dog_image_00019,
  dog_image_00020,
  dog_image_00021,
  dog_image_00022,
  dog_image_00023,
  dog_image_00024,
  dog_image_00025,
  dog_image_00026,
  dog_image_00027,
  dog_image_00028,
  dog_image_00029,
  dog_image_00030,
  dog_image_00031,
  dog_image_00032,
];

export const getRandomImageIndex = (): number => {
  return Math.round(Math.random() * (images.length - 1));
};

interface CatImageProps {
  label: ReactNode;
  imageIndex: number;
}

export const Images: FC<CatImageProps> = ({
  label,
  imageIndex,
}): JSX.Element => {
  return (
    <div style={{ margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          placeholder="blur"
          src={images[imageIndex % images.length]}
          alt="Picture of cats playing poker"
          width={300}
          style={{ borderRadius: '64px' }}
        />
      </div>
      {label}
    </div>
  );
};
