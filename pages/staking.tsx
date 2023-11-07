import type { NextPage } from 'next';
import { Box, FormLabel, NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, Stack, SimpleGrid, Button, Text } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
import { useState } from 'react';
import { SCQueryType, useAccount} from '@useelven/core';
import { useElvenScQuery } from '../hooks/useElvenScQuery';
import { Address } from "@multiversx/sdk-core";
import abiJSON from "../staking-contract.abi.json";

const Staking: NextPage = () => {



  const { address } = useAccount();
  const hexAdress = new Address(address);

  const { data: stakingPosition } =
    useElvenScQuery<number>({
      type: SCQueryType.NUMBER,
      funcName: 'getStakingPosition',
      args: [hexAdress.hex()],
      abiJSON: abiJSON,
    });

  const num = stakingPosition / 1000000000000000000;

  const [valueStake, setValueStake] = useState(0)
  const [valueUnstake, setValueUnstake] = useState(0)



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
          <FormControl isRequired>
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
              userSelect="none"
              _hover={{ bg: 'elvenTools.color2.darker' }}
              transition="background-color .3s" width="100px">
              Stake
            </Button>
            </Stack>
          </FormControl>
            <FormControl isRequired>
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
              userSelect="none"
              _hover={{ bg: 'elvenTools.color2.darker' }}
              transition="background-color .3s" width="100px">
              Unstake
            </Button>
              </Stack>
              <FormLabel textColor="elvenTools.white" fontSize="sm" alignContent="center">
                { num }
              </FormLabel>
            </FormControl>
          </SimpleGrid>
          </Box>
      </Box>
    </MainLayout>
  );
};

export default Staking;
