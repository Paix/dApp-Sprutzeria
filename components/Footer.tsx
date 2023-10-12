import { Container, Box, Text, Stack } from '@chakra-ui/react';
import packageJson from '../package.json';

export const Footer = () => {
  return (
    <Box
      height="120px"
      bgColor="elvenTools.dark.darker"
      color="elvenTools.white"
      display="flex"
      alignItems="center"
    >
      <Container
        maxW="container.xl"
        fontSize="sm"
        fontWeight="normal"
        textAlign="center"
      >
        <Box>Sprutzeria Dapp (v{`${packageJson.version}`})</Box>
        <Box fontSize="xs" fontWeight="hairline">
          Made with ❤ from Sprutzer
        </Box>
        <Stack
          fontSize="xs"
          fontWeight="bold"
          direction="row"
          justifyContent="center"
        >
          <Text
            as="a"
            color="elvenTools.color3.base"
            href="https://www.elven.tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            Elven Tools ⚡
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};
