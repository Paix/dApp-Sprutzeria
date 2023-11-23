import type { NextPage } from 'next';
import { Box, FormLabel, NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, Stack, SimpleGrid, Text, Spinner, Button } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
import { useState, useCallback } from 'react';
import {
  SCQueryType, useAccount, useApiCall, useConfig, useTransaction
} from '@useelven/core';
import { useElvenScQuery } from '../hooks/useElvenScQuery';
import { Address, BigUIntValue, BytesValue, ContractCallPayloadBuilder, ContractFunction } from "@multiversx/sdk-core";
import { Token } from "../types/account";
import abiJSON from "../staking-contract.abi.json";
import { shortenHash } from '../utils/shortenHash';

const smartContractAddress = process.env.NEXT_PUBLIC_NFT_SMART_CONTRACT ? process.env.NEXT_PUBLIC_NFT_SMART_CONTRACT : "";

const Staking: NextPage = () => {

  const { address } = useAccount();
  const hexAdress = new Address(address);
  const { explorerAddress } = useConfig();

  const { data: stakedAddresses } =
    useElvenScQuery<string>({
      type: SCQueryType.STRING,
      funcName: 'getStakedAddresses',
      abiJSON: abiJSON,
    });

  console.log(stakedAddresses);
  const { data: stakingPosition = 0 } =
    useElvenScQuery<number>({
      type: SCQueryType.NUMBER,
      funcName: 'getStakingPosition',
      args: [hexAdress.hex()],
      abiJSON: abiJSON,
      autoInit: Boolean(hexAdress)
    });

  const { data: tokenId } =
    useElvenScQuery<string>({
      funcName: 'getTokensID',
      type: SCQueryType.STRING,
    });

  const { data: dataESDT } = useApiCall<Token>({
    url: `/accounts/${hexAdress}/tokens/${tokenId}`,
    autoInit: Boolean(hexAdress) && Boolean(tokenId),
  });

  const realStakingPosition = stakingPosition / 1000000000000000000;

  const [valueStake, setValueStake] = useState(0);
  const [valueUnstake, setValueUnstake] = useState(0);

  const { pending, triggerTx, transaction } = useTransaction();
  
  const stakeTransaction = useCallback(() => {
    // Prepare data payload for smart contract using MultiversX JS SDK core tools
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ESDTTransfer'))
      .setArgs([
        BytesValue.fromUTF8(tokenId.trim()),
        new BigUIntValue(valueStake * 1000000000000000000),
        BytesValue.fromUTF8("stake")
      ])
      .build();

    triggerTx({
      address: smartContractAddress,
      gasLimit: 5000000,
      value: 0,
      data,
    });
  }, [valueStake, tokenId, triggerTx]);

  const unstakeTransaction = useCallback(() => {
    // Prepare data payload for smart contract using MultiversX JS SDK core tools
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('unstake'))
      .setArgs([
        new BigUIntValue(valueUnstake * 1000000000000000000),
      ])
      .build();
      
    triggerTx({
      address: smartContractAddress,
      gasLimit: 5000000,
      value: 0,
      data,
    });
  }, [valueUnstake, tokenId, triggerTx]);

  return (
    <MainLayout>
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth', 'about']} />
      </HeaderMenu>
      <Box
        display="flex"
        justifyContent="center"
        mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
        <Box
          paddingLeft="60px"
          bgColor="elvenTools.dark.darker"
          borderRadius="xl"
          userSelect="none"
          boxShadow="0 0 25px"
          color="elvenTools.shadowColor"
          display="flex"
          bgGradient="linear-gradient(90deg, elvenTools.dark.base 0%, elvenTools.dark.darker 70%);"
          width="480px"
          height="320px"
        >
          <SimpleGrid columns={1}>
            <Text textAlign="center" mt={5} fontWeight="bold" fontSize="xl" textColor="elvenTools.white">
              Staking now
            </Text>
            <FormControl>
              <FormLabel textColor="elvenTools.white" fontSize="sm">
                Spritz amount:
              </FormLabel>
              <Stack shouldWrapChildren direction='row'>
                <NumberInput
                  onChange={(valueString) => setValueStake(Number(valueString))}
                  value={Number(valueStake)}
                  max={10000}
                  min={0}
                  size="md"
                  textColor="elvenTools.white"
                >
                  <NumberInputField textColor="elvenTools.white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper textColor="elvenTools.white" />
                    <NumberDecrementStepper textColor="elvenTools.white" />
                  </NumberInputStepper>
                </NumberInput>
                <Button borderColor="elvenTools.color2.darker" borderWidth={2}
                  bgColor="transparent" rounded="xl"
                  fontWeight="normal"
                  cursor="pointer"
                  color="elvenTools.white"
                  _hover={{ bg: 'elvenTools.color2.darker' }}
                  transition="background-color .3s" width="100px"
                  onClick={stakeTransaction}
                  disabled={pending}
                >
                  Stake
                </Button>
              </Stack>
              <FormLabel textColor="elvenTools.white" fontSize="sm" alignContent="center">
                Avail SPRITZ Balance: {Number(dataESDT?.balance) / 1000000000000000000}
              </FormLabel>
            </FormControl>
            {pending && <Spinner ml={5} />}
            {transaction && process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN ? (
              <Stack direction="row" ml={5}>
                <Text color="elvenTools.white">Transaction details: </Text>
                <Text
                  textDecoration="underline"
                  color="elvenTools.white"
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href={`${explorerAddress}/transactions/${transaction
                    .getHash()
                    .toString()}`}
                >
                  {shortenHash(transaction.getHash().toString())}
                </Text>
              </Stack>
            ) : null}
            <FormControl>
              <FormLabel textColor="elvenTools.white" fontSize="sm" alignContent="center">
                Spritz amount: 
              </FormLabel>
              <Stack shouldWrapChildren direction='row'>
                <NumberInput
                  onChange={(valueString) => setValueUnstake(Number(valueString))}
                  value={Number(valueUnstake)}
                  max={10000}
                  min={0}
                  size="md"
                  textColor="elvenTools.white"
                >
                  <NumberInputField textColor="elvenTools.white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper textColor="elvenTools.white" />
                    <NumberDecrementStepper textColor="elvenTools.white" />
                  </NumberInputStepper>
                </NumberInput>
                <Button borderColor="elvenTools.color2.darker" borderWidth={2}
                  bgColor="transparent" rounded="xl"
                  fontWeight="normal"
                  cursor="pointer"
                  color="elvenTools.white"
                  _hover={{ bg: 'elvenTools.color2.darker' }}
                  transition="background-color .3s" width="100px"
                  onClick={unstakeTransaction}
                  disabled={pending}>
                  Unstake
                </Button>
              </Stack>
              <FormLabel textColor="elvenTools.white" fontSize="sm" alignContent="center">
                Avail SPRITZ Balance: {realStakingPosition}
              </FormLabel>
            </FormControl>
          </SimpleGrid>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Staking;
