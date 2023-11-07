import { Box, Text } from '@chakra-ui/react';
//import Image from 'next/image';
import { FC } from 'react';
import { SocialIcon } from 'react-social-icons';

interface TeamMemberProps {
  name: string;
  imageUrl: string;
  socialMediaLinks?: string[];
  bio?: string;
}

export const TeamMember: FC<TeamMemberProps> = ({
  name,
  imageUrl,
  socialMediaLinks,
  bio,
}) => {
  return (
    <Box justifyContent="center" alignItems="center" width="250px">
      <Box display="flex" alignItems="center" alignContent="center" justifyContent="center" as="img" src={imageUrl} alt={name} width="250px" height="250px" borderRadius="xl">
      </Box>
      <Text textAlign="center" mt={5} fontWeight="bold" fontSize="xl">
        {name}
      </Text>
      {socialMediaLinks && (
        <Box
          display="flex"
          mt={5}
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          {socialMediaLinks.map((link, index) => (
            <SocialIcon
              key={index}
              url={link}
              bgColor="#ff6633"
              style={{ width: 30, height: 30 }}
            />
          ))}
        </Box>
      )}
      {bio && (
        <Text mt={5} textAlign="center">
          {bio}
        </Text>
      )}
    </Box>
  );
};
