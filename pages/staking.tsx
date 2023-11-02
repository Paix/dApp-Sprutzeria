import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
import { MintHero } from '../components/MintHero';
import { HeroImage } from '../components/HeroImage';

const Staking: NextPage = () => {
  return (
    <MainLayout>
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth', 'about']} />
      </HeaderMenu>
      <Box
        display="flex"
        justifyContent="space-between"
        mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
      </Box>
    </MainLayout>
  );
};

export default Staking;
