import { SocialIcon } from 'react-social-icons';
import { Box } from '@chakra-ui/react';

export const SocialMediaIcons = () => {
  return (
    <Box display="flex" alignItems="center" gap={3}>
      <SocialIcon
        url="https://www.twitter.com/SprutZeria"
        bgColor="#fff"
        style={{ width: 30, height: 30 }}
      />
      <SocialIcon
        url="https://discord.gg/DP6nNzNw"
        bgColor="#fff"
        style={{ width: 30, height: 30 }}
      />
    </Box>
  );
};
