import type { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';

const About: NextPage = () => {

  return (
    <MainLayout>
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth', 'mint', 'about']} />
      </HeaderMenu>
      <Box
        sx={{
          a: {
            color: 'elvenTools.color3.base',
          },
        }}
      >
        <Text
          as="h2"
          fontSize="4xl"
          fontWeight="black"
          mb={10}
          mt={{ xl: 6, '2xl': 16 }}
        >
          About
        </Text>
        <Text mb={4}>
          A new era of NFTs marketplace based on{' '}
          <Text
            as="a"
            color="elvenTools.color2.base"
            href="https://multiversx.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            MultiversX
          </Text>{' '}
          blockchain.
          read more in{' '}
          <a href="https://www.twitter.com/SprutZeria">
            Sprutzeria
          </a>{' '}
        </Text>
      </Box>
    </MainLayout>
  );
};

export default About;
