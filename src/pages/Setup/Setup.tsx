import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { title } from '@/config/index';

import PackageJson from './../../../package.json';

function Setup() {
  return (
    <>
      <Meta title="Setup" />
      <FullSizeCenteredFlexBox flexDirection="column">
        <Typography variant="h3">{`${title} v${PackageJson.version}`}</Typography>
        <Button
          to={`/welcome`}
          component={Link}
          variant="outlined"
          sx={{ mt: 4 }}
          size="small"
          color="warning"
        >
          ENTRAR
        </Button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Setup;
