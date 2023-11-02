import { Box, SimpleGrid } from '@chakra-ui/react';
import { TeamMember } from './TeamMember';
import { team } from '../config/dappUi';
import { HomeSectionTitle } from './HomeSectionTitle';

export const Team = () => {
  if (!Array.isArray(team)) return null;

  return (
    <Box mt={32}>
      <HomeSectionTitle title="Team" />
      <SimpleGrid columns={2} spacing={10}>
        {team.map((teamMember, index) => (
          <center key={index}>
            <TeamMember key={index} {...teamMember} />
          </center>
        ))}
      </SimpleGrid>
    </Box>
  );
};
