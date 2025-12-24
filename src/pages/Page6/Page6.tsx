import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import HomeButtonDialog from '@/components/HomeButtonDialog';
import Meta from '@/components/Meta';
import Quiz from '@/components/Quiz';
import ReplayDialog from '@/components/ReplayDialog';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Page6() {
  return (
    <>
      <Meta title="Quiz!" />
      <FullSizeCenteredFlexBox flexDirection="column">
        <Typography variant="h3">Quiz!</Typography>
        <Quiz />
        <Quiz />
        <Button
          to={`/finish`}
          component={Link}
          variant="outlined"
          sx={{ mt: 4 }}
          size="small"
          color="warning"
        >
          finalizar
        </Button>
      </FullSizeCenteredFlexBox>
      <HomeButtonDialog />
      <ReplayDialog />
    </>
  );
}

export default Page6;
