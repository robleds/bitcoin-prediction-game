import { Card, CardMedia } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import FooterBar from '@/components/FooterBar';
import HomeButtonDialog from '@/components/HomeButtonDialog';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox, FullSizeCenteredFlexBoxBgImage } from '@/components/styled';

import './style.css';

const useStyles = makeStyles({
  container: {
    minWidth: '100hw',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'block',
  },
  iframeContainer: {
    backgroundColor: 'pink',
    display: 'block',
    marginTop: 60,
  },
  iframeDiv: {
    display: 'block',
    height: '100%',
  },
  iframe: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});

const iframeUrl = 'https://www.transfero.com';

function Page1() {
  const classes = useStyles();
  return (
    <>
      <Meta title="Escolha" />
      <FullSizeCenteredFlexBoxBgImage className={classes.container}>
        <HomeButtonDialog tiny />
        <FullSizeCenteredFlexBox className={classes.iframeContainer}>
          <Card className={classes.iframeDiv}>
            <CardMedia component="iframe" src={iframeUrl} className={classes.iframe} />
          </Card>
        </FullSizeCenteredFlexBox>
        <FooterBar />
      </FullSizeCenteredFlexBoxBgImage>
    </>
  );
}

export default Page1;
