import Box from '@mui/material/Box';
import { styled } from '@mui/system';

import BackgroundImg from './Assets/bg_transfero_internas.png';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const FullSizeCenteredFlexBoxBgImage = styled(FullSizeCenteredFlexBox)({
  backgroundImage: `url(${BackgroundImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, FullSizeCenteredFlexBoxBgImage };
