import React, { FC, JSX, ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import seedrandom from 'seedrandom';
import a_cat_looking_like_james_bond_playing_cards_5e83ac83_3bb3_45cd_9e64_b9ad2aa63765 from '@/public/pokercats/a_cat_looking_like_james_bond_playing_cards_5e83ac83-3bb3-45cd-9e64-b9ad2aa63765.png';
import aristocats_playing_cards_cd7d8475_f693_4b68_88e5_042db260e28c from '@/public/pokercats/aristocats_playing_cards_cd7d8475-f693-4b68-88e5-042db260e28c.png';
import beautiful_bright_pastel_painging_of_cute_kittens_pl_2cea83f4_4c42_4581_b3ee_a6a4c46cdc44 from '@/public/pokercats/beautiful_bright_pastel_painging_of_cute_kittens_pl_2cea83f4-4c42-4581-b3ee-a6a4c46cdc44.png';
import cartoon_of_cats_playing_cards_1590b80c_e16b_4a98_81f8_8000ad655baa from '@/public/pokercats/cartoon_of_cats_playing_cards_1590b80c-e16b-4a98-81f8-8000ad655baa.png';
import cartoon_of_kittens_playing_cards_white_background_8b5996df_300b_4cc4_8db3_6348a87525c5 from '@/public/pokercats/cartoon_of_kittens_playing_cards_white_background_8b5996df-300b-4cc4-8db3-6348a87525c5.png';
import cartoon_of_kittens_playing_cards_white_background_e50e6185_6397_4f97_a127_7f53b5b1308e from '@/public/pokercats/cartoon_of_kittens_playing_cards_white_background_e50e6185-6397-4f97-a127-7f53b5b1308e.png';
import cats_playing_cards_in_the_style_of_futurama_f1cb4c4e_3feb_4372_a33c_3935366c6fc2 from '@/public/pokercats/cats_playing_cards_in_the_style_of_futurama_f1cb4c4e-3feb-4372-a33c-3935366c6fc2.png';
import childrens_book_illustration_cute_kittens_on_compute_17030c3d_8523_45e0_922f_a71af0be8328 from '@/public/pokercats/childrens_book_illustration_cute_kittens_on_compute_17030c3d-8523-45e0-922f-a71af0be8328.png';
import childrens_book_illustration_cute_kittens_on_compute_e078b43e_97fa_4814_84c0_49b073545788 from '@/public/pokercats/childrens_book_illustration_cute_kittens_on_compute_e078b43e-97fa-4814-84c0-49b073545788.png';
import childrens_book_illustration_cute_kittens_playing_ca_4f69aacd_f396_40d6_a9f4_c7822354e71e from '@/public/pokercats/childrens_book_illustration_cute_kittens_playing_ca_4f69aacd-f396-40d6-a9f4-c7822354e71e.png';
import childrens_book_illustration_cute_kittens_playing_pl_1a9f97da_de6c_489b_aa97_db0f9abf492c from '@/public/pokercats/childrens_book_illustration_cute_kittens_playing_pl_1a9f97da-de6c-489b-aa97-db0f9abf492c.png';
import childrens_book_illustration_cute_kittens_programmin_f10fb62c_a7ed_4908_aad6_64c8846cfcdf from '@/public/pokercats/childrens_book_illustration_cute_kittens_programmin_f10fb62c-a7ed-4908-aad6-64c8846cfcdf.png';
import childrens_book_illustration_cute_kittens_with_cup_o_8918507a_c411_4bdb_92b6_2200674d0a09 from '@/public/pokercats/childrens_book_illustration_cute_kittens_with_cup_o_8918507a-c411-4bdb-92b6-2200674d0a09.png';
import childrens_book_illustration_cute_kittens_with_cup_o_8e921a04_c392_497a_b6e0_09eba6fddb6f from '@/public/pokercats/childrens_book_illustration_cute_kittens_with_cup_o_8e921a04-c392-497a-b6e0-09eba6fddb6f.png';
import childrens_book_illustration_cute_kittens_with_cup_o_af6ea6b1_e75b_4007_99c6_826c27c96b66 from '@/public/pokercats/childrens_book_illustration_cute_kittens_with_cup_o_af6ea6b1-e75b-4007-99c6-826c27c96b66.png';
import childrens_book_illustration_cute_kittens_with_cup_o_ebb1eb31_ad02_4b8d_9976_89d7b906d88d from '@/public/pokercats/childrens_book_illustration_cute_kittens_with_cup_o_ebb1eb31-ad02-4b8d-9976-89d7b906d88d.png';
import cute_kittens_1_2_3_5_8_034bdfaa_ab34_4684_91f7_acb1db5eb17e from '@/public/pokercats/cute_kittens_1_2_3_5_8_034bdfaa-ab34-4684-91f7-acb1db5eb17e.png';
import cute_kittens_1_2_3_5_8_1e7c2af3_9756_45b1_a068_f2a1d14a5aa6 from '@/public/pokercats/cute_kittens_1_2_3_5_8_1e7c2af3-9756-45b1-a068-f2a1d14a5aa6.png';
import cute_kittens_1_2_3_5_8_7b871ade_8930_46b8_92fb_4047fcd49c33 from '@/public/pokercats/cute_kittens_1_2_3_5_8_7b871ade-8930-46b8-92fb-4047fcd49c33.png';
import cute_kittens_1_2_3_5_8_99300f2d_5809_4075_93a6_ab870bb29e83 from '@/public/pokercats/cute_kittens_1_2_3_5_8_99300f2d-5809-4075-93a6-ab870bb29e83.png';
import duerer_cats_playing_cards_803b0943_e8dd_4c54_89c7_b8ba9c321e1b from '@/public/pokercats/duerer_cats_playing_cards_803b0943-e8dd-4c54-89c7-b8ba9c321e1b.png';
import duerer_cats_playing_cards_aa500bad_5232_4a6e_995b_9c522972e1b8 from '@/public/pokercats/duerer_cats_playing_cards_aa500bad-5232-4a6e-995b-9c522972e1b8.png';
import duerer_cats_playing_cards_ae9e5000_d28e_46cd_8436_d24cef1f2ee1 from '@/public/pokercats/duerer_cats_playing_cards_ae9e5000-d28e-46cd-8436-d24cef1f2ee1.png';
import etching_cats_playing_cards_20f0a728_9436_412c_bcd0_7718c8afa081 from '@/public/pokercats/etching_cats_playing_cards_20f0a728-9436-412c-bcd0-7718c8afa081.png';
import etching_cats_playing_cards_556a92cf_1a3f_41bf_b33f_db44993a66f0 from '@/public/pokercats/etching_cats_playing_cards_556a92cf-1a3f-41bf-b33f-db44993a66f0.png';
import garfield_cat_playing_cards_402587ce_50c9_4ccc_b5b7_b855d6f520cb from '@/public/pokercats/garfield_cat_playing_cards_402587ce-50c9-4ccc-b5b7-b855d6f520cb.png';
import garfield_cat_playing_cards_572554db_64e7_4cea_9978_a8c1bd8dfe21 from '@/public/pokercats/garfield_cat_playing_cards_572554db-64e7-4cea-9978-a8c1bd8dfe21.png';
import kittens_looking_at_playing_cards_3174cb33_cd3c_449e_8f36_8f8927e62c22 from '@/public/pokercats/kittens_looking_at_playing_cards_3174cb33-cd3c-449e-8f36-8f8927e62c22.png';
import kittens_looking_at_playing_cards_667dd58b_1bc9_4379_883e_49abbec354b1 from '@/public/pokercats/kittens_looking_at_playing_cards_667dd58b-1bc9-4379-883e-49abbec354b1.png';
import kittens_looking_at_playing_cards_c303d0e8_8ce9_4ad0_b937_d20bec7f3365 from '@/public/pokercats/kittens_looking_at_playing_cards_c303d0e8-8ce9-4ad0-b937-d20bec7f3365.png';
import kittens_on_cards_147e83e8_c292_4396_8768_e32b25b71ee3 from '@/public/pokercats/kittens_on_cards_147e83e8-c292-4396-8768-e32b25b71ee3.png';
import kittens_playing_poker_16b7905c_d60b_410a_9e71_d2ed2dca7bcd from '@/public/pokercats/kittens_playing_poker_16b7905c-d60b-410a-9e71-d2ed2dca7bcd.png';
import kittens_playing_poker_2e2f1e42_ee39_4b1c_89d5_d3993702f252 from '@/public/pokercats/kittens_playing_poker_2e2f1e42-ee39-4b1c-89d5-d3993702f252.png';
import kittens_playing_poker_8eb666f9_3673_4f02_934f_48c527ec2ade from '@/public/pokercats/kittens_playing_poker_8eb666f9-3673-4f02-934f-48c527ec2ade.png';
import kitten_with_cards_in_mouth_825717e1_6867_45fb_9a9f_6d8585fb44c3 from '@/public/pokercats/kitten_with_cards_in_mouth_825717e1-6867-45fb-9a9f-6d8585fb44c3.png';
import kitten_with_cards_in_mouth_8a3e4a84_ebdf_43f7_a661_2b290c547cb6 from '@/public/pokercats/kitten_with_cards_in_mouth_8a3e4a84-ebdf-43f7-a661-2b290c547cb6.png';
import manga_comic_of_cats_playing_with_cards_a631885a_aac2_495a_a231_1fc0cb680ca5 from '@/public/pokercats/manga_comic_of_cats_playing_with_cards_a631885a-aac2-495a-a231-1fc0cb680ca5.png';
import manga_comic_of_cats_playing_with_cards_bf02a9e7_ff16_45d3_983d_887892148860 from '@/public/pokercats/manga_comic_of_cats_playing_with_cards_bf02a9e7-ff16-45d3-983d-887892148860.png';
import manga_comic_of_cats_playing_with_cards_ccad90ba_368b_4138_9475_7f8c36852973 from '@/public/pokercats/manga_comic_of_cats_playing_with_cards_ccad90ba-368b-4138-9475-7f8c36852973.png';
import pencil_sketch_of_cats_playing_cards_white_backgroun_bc89f5fb_ebf1_40a7_86a4_dea94b17dd30 from '@/public/pokercats/pencil_sketch_of_cats_playing_cards_white_backgroun_bc89f5fb-ebf1-40a7-86a4-dea94b17dd30.png';
import pokemon_comic_of_cats_playing_cards_50fb8249_4499_4bcf_b52f_c649e7c18a46 from '@/public/pokercats/pokemon_comic_of_cats_playing_cards_50fb8249-4499-4bcf-b52f-c649e7c18a46.png';
import rembrandt_painting_of_cats_playing_cards_3116abd6_88b5_4648_858e_a2e26091dd44 from '@/public/pokercats/rembrandt_painting_of_cats_playing_cards_3116abd6-88b5-4648-858e-a2e26091dd44.png';
import rembrandt_painting_of_cats_playing_cards_6b928c5a_6faf_44b5_ba85_1183441c896c from '@/public/pokercats/rembrandt_painting_of_cats_playing_cards_6b928c5a-6faf-44b5-ba85-1183441c896c.png';
import rembrandt_painting_of_cats_playing_cards_84a7a014_6f40_4af8_91c8_b15ffb2eceb8 from '@/public/pokercats/rembrandt_painting_of_cats_playing_cards_84a7a014-6f40-4af8-91c8-b15ffb2eceb8.png';
import vintage_ad_with_cute_kittens_playing_cards_27631706_9d77_4e25_9c3d_f855f14baa25 from '@/public/pokercats/vintage_ad_with_cute_kittens_playing_cards_27631706-9d77-4e25-9c3d-f855f14baa25.png';
import vintage_ad_with_cute_kittens_playing_cards_a90625b0_90d3_49b9_8ec4_de4410cdc06b from '@/public/pokercats/vintage_ad_with_cute_kittens_playing_cards_a90625b0-90d3-49b9-8ec4-de4410cdc06b.png';
import vintage_ad_with_cute_kittens_playing_cards_e6035cb6_9118_4fa6_a3ec_a683f52d4da9 from '@/public/pokercats/vintage_ad_with_cute_kittens_playing_cards_e6035cb6-9118-4fa6-a3ec-a683f52d4da9.png';
import pokercats from '@/public/pokercats/pokercats.jpg';

const images = [
  a_cat_looking_like_james_bond_playing_cards_5e83ac83_3bb3_45cd_9e64_b9ad2aa63765,
  aristocats_playing_cards_cd7d8475_f693_4b68_88e5_042db260e28c,
  beautiful_bright_pastel_painging_of_cute_kittens_pl_2cea83f4_4c42_4581_b3ee_a6a4c46cdc44,
  cartoon_of_cats_playing_cards_1590b80c_e16b_4a98_81f8_8000ad655baa,
  cartoon_of_kittens_playing_cards_white_background_8b5996df_300b_4cc4_8db3_6348a87525c5,
  cartoon_of_kittens_playing_cards_white_background_e50e6185_6397_4f97_a127_7f53b5b1308e,
  cats_playing_cards_in_the_style_of_futurama_f1cb4c4e_3feb_4372_a33c_3935366c6fc2,
  childrens_book_illustration_cute_kittens_on_compute_17030c3d_8523_45e0_922f_a71af0be8328,
  childrens_book_illustration_cute_kittens_on_compute_e078b43e_97fa_4814_84c0_49b073545788,
  childrens_book_illustration_cute_kittens_playing_ca_4f69aacd_f396_40d6_a9f4_c7822354e71e,
  childrens_book_illustration_cute_kittens_playing_pl_1a9f97da_de6c_489b_aa97_db0f9abf492c,
  childrens_book_illustration_cute_kittens_programmin_f10fb62c_a7ed_4908_aad6_64c8846cfcdf,
  childrens_book_illustration_cute_kittens_with_cup_o_8918507a_c411_4bdb_92b6_2200674d0a09,
  childrens_book_illustration_cute_kittens_with_cup_o_8e921a04_c392_497a_b6e0_09eba6fddb6f,
  childrens_book_illustration_cute_kittens_with_cup_o_af6ea6b1_e75b_4007_99c6_826c27c96b66,
  childrens_book_illustration_cute_kittens_with_cup_o_ebb1eb31_ad02_4b8d_9976_89d7b906d88d,
  cute_kittens_1_2_3_5_8_034bdfaa_ab34_4684_91f7_acb1db5eb17e,
  cute_kittens_1_2_3_5_8_1e7c2af3_9756_45b1_a068_f2a1d14a5aa6,
  cute_kittens_1_2_3_5_8_7b871ade_8930_46b8_92fb_4047fcd49c33,
  cute_kittens_1_2_3_5_8_99300f2d_5809_4075_93a6_ab870bb29e83,
  duerer_cats_playing_cards_803b0943_e8dd_4c54_89c7_b8ba9c321e1b,
  duerer_cats_playing_cards_aa500bad_5232_4a6e_995b_9c522972e1b8,
  duerer_cats_playing_cards_ae9e5000_d28e_46cd_8436_d24cef1f2ee1,
  etching_cats_playing_cards_20f0a728_9436_412c_bcd0_7718c8afa081,
  etching_cats_playing_cards_556a92cf_1a3f_41bf_b33f_db44993a66f0,
  garfield_cat_playing_cards_402587ce_50c9_4ccc_b5b7_b855d6f520cb,
  garfield_cat_playing_cards_572554db_64e7_4cea_9978_a8c1bd8dfe21,
  kittens_looking_at_playing_cards_3174cb33_cd3c_449e_8f36_8f8927e62c22,
  kittens_looking_at_playing_cards_667dd58b_1bc9_4379_883e_49abbec354b1,
  kittens_looking_at_playing_cards_c303d0e8_8ce9_4ad0_b937_d20bec7f3365,
  kittens_on_cards_147e83e8_c292_4396_8768_e32b25b71ee3,
  kittens_playing_poker_16b7905c_d60b_410a_9e71_d2ed2dca7bcd,
  kittens_playing_poker_2e2f1e42_ee39_4b1c_89d5_d3993702f252,
  kittens_playing_poker_8eb666f9_3673_4f02_934f_48c527ec2ade,
  kitten_with_cards_in_mouth_825717e1_6867_45fb_9a9f_6d8585fb44c3,
  kitten_with_cards_in_mouth_8a3e4a84_ebdf_43f7_a661_2b290c547cb6,
  manga_comic_of_cats_playing_with_cards_a631885a_aac2_495a_a231_1fc0cb680ca5,
  manga_comic_of_cats_playing_with_cards_bf02a9e7_ff16_45d3_983d_887892148860,
  manga_comic_of_cats_playing_with_cards_ccad90ba_368b_4138_9475_7f8c36852973,
  pencil_sketch_of_cats_playing_cards_white_backgroun_bc89f5fb_ebf1_40a7_86a4_dea94b17dd30,
  pokemon_comic_of_cats_playing_cards_50fb8249_4499_4bcf_b52f_c649e7c18a46,
  rembrandt_painting_of_cats_playing_cards_3116abd6_88b5_4648_858e_a2e26091dd44,
  rembrandt_painting_of_cats_playing_cards_6b928c5a_6faf_44b5_ba85_1183441c896c,
  rembrandt_painting_of_cats_playing_cards_84a7a014_6f40_4af8_91c8_b15ffb2eceb8,
  vintage_ad_with_cute_kittens_playing_cards_27631706_9d77_4e25_9c3d_f855f14baa25,
  vintage_ad_with_cute_kittens_playing_cards_a90625b0_90d3_49b9_8ec4_de4410cdc06b,
  vintage_ad_with_cute_kittens_playing_cards_e6035cb6_9118_4fa6_a3ec_a683f52d4da9,
  pokercats,
];

const getRandomImage = (seed: string): StaticImageData => {
  const random = seedrandom(seed);
  return images[Math.round(random() * (images.length - 1))];
};

interface CatImageProps {
  label: ReactNode;
  seed: string;
}

export const CatImage: FC<CatImageProps> = ({ label, seed }): JSX.Element => {
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
          src={getRandomImage(seed)}
          alt="Picture of cats playing poker"
          width={300}
          style={{ borderRadius: '64px' }}
        />
      </div>
      {label}
    </div>
  );
};