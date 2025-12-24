import { useRef } from 'react';
import Confetti from 'react-confetti';

import Typography from '@mui/material/Typography';

import HomeButtonDialog from '@/components/HomeButtonDialog';
import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Page7() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <>
      <Meta title="Concluído!" />
      <Confetti width={windowSize.current[0]} height={windowSize.current[1]} />
      <FullSizeCenteredFlexBox flexDirection="column">
        <Typography variant="h3">Parabéns</Typography>
      </FullSizeCenteredFlexBox>
      <HomeButtonDialog />
      <RestartTimer delay={10} />
    </>
  );
}

export default Page7;
