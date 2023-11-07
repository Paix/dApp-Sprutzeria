import { Box, Text } from '@chakra-ui/react';
import { CollectionInfoBox } from './CollectionInfoBox';
import { shortenHash } from '../utils/shortenHash';
import { useElvenScQuery } from '../hooks/useElvenScQuery';
import { SCQueryType, useConfig } from '@useelven/core';

const smartContractAddress = process.env.NEXT_PUBLIC_NFT_SMART_CONTRACT;

export const Hero = () => {
  const { explorerAddress } = useConfig();
  const { data: collectionSize, isLoading: collectionSizeLoading } =
    useElvenScQuery<number>({
      funcName: 'getApy',
      type: SCQueryType.NUMBER,
    });

  const { data: collectionTicker, isLoading: collectionTickerLoading } =
    useElvenScQuery<number>({
      funcName: 'getTokensID',
      type: SCQueryType.STRING,
    });


  return (
    <Box width="100%">
      <Text
        as="h1"
        fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
        textAlign={{ base: 'center', md: 'left' }}
        fontWeight="black"
        lineHeight="shorter"
        mb={5}
      >
        Inizia a far SprutZare i tuoi SprutZ su rete {' '}
        <Text
          as="a"
          color="elvenTools.color2.base"
          href="https://multiversx.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          MultiversX
        </Text>{' '}
        e ottieni gli SpritZ.
      </Text>
      <Text
        as="h2"
        fontSize="lg"
        fontWeight="thin"
        textAlign={{ base: 'center', md: 'left' }}
      >
        Osserva la tua collezione e inizia a far lavorare i tuoi SpritZ con un boost iniziale del 
        <Text as="span" fontWeight="medium">
          {` ${collectionSize / 100 || 0}%`}
        </Text>
      </Text>
      <Box
        display="flex"
        justifyContent={{ base: 'center', md: 'flex-start' }}
        mt={10}
        gap={3}
        sx={{
          '@media screen and (max-width: 650px)': {
            flexDirection: 'column',
          },
        }}
      >
        <CollectionInfoBox
          content={collectionTicker || '-'}
          label="Collection ticker. Click for details."
          isLoading={collectionTickerLoading}
          href={`${explorerAddress}/tokens/${collectionTicker}`}
        />
        <CollectionInfoBox
          content={
            smartContractAddress
              ? shortenHash(smartContractAddress || '', 12)
              : 'No smart contract provided!'
          }
          label={`Smart contract. Click for details.`}
          href={
            smartContractAddress
              ? `${explorerAddress}/accounts/${smartContractAddress}`
              : undefined
          }
        />
        <CollectionInfoBox
          content={`${collectionSize/100 || 0}%`}
          isLoading={collectionSizeLoading}
          label="APY"
        />
      </Box>
    </Box>
  );
};
