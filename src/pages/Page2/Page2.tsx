import { useEffect, useState } from 'react';

import { CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { makeStyles } from '@material-ui/core/styles';

import FooterBar from '@/components/FooterBar';
import HomeButtonDialog from '@/components/HomeButtonDialog';
import Meta from '@/components/Meta';
import NavButtons from '@/components/NavButtons';
import RestartTimer from '@/components/RestartTimer';
import TopLogo from '@/components/TopLogo';
import { CenteredFlexBox, FullSizeCenteredFlexBoxBgImage } from '@/components/styled';

import BrzLogo from './assets/brz.png';

const useStyles = makeStyles({
  container: {
    minWidth: '100hw',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  childContainer: {
    marginTop: 70,
    position: 'absolute',
    width: '82%',
  },
  image: {
    width: 300,
    height: 377,
    marginRight: 50,
    backgroundSize: 'contain',
  },
  textContainer: {
    marginLeft: 70,
  },
  mainText: {
    width: 590,
    fontSize: 26,
    paddingBottom: 30,
  },
  subText: {
    width: 590,
    fontSize: 27,
    fontWeight: 'bold',
    color: '#81feef',
  },
  subTextOver: {
    width: 590,
    fontSize: 27,
    fontWeight: 'bold',
    color: '#81feef',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    marginTop: 60,
    paddingRight: 140,
    paddingLeft: 140,
    paddingTop: 30,
    paddingBottom: 30,
  },
  buttonIcon: {
    fontSize: 60,
    position: 'absolute',
    right: 20,
  },
  buttonText: {
    fontSize: 40,
  },
  highlight: {
    color: '#81feef',
    fontWeight: 'bold',
  },
});

function BlueLine() {
  return (
    <Box
      sx={{
        width: 3,
        height: 210,
        backgroundColor: '#3d3dff',
      }}
    />
  );
}

function Page2() {
  const classes = useStyles();
  const currentHours = new Date().getHours();
  const openingDatetime = 0;
  const closureHours = 23;
  // const [awardDatetime, setAwardDatetime] = useState(17);
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    setIsEnabled(currentHours < closureHours && currentHours >= openingDatetime);
  }, []);
  return (
    <>
      <Meta title="Challenge" />
      <FullSizeCenteredFlexBoxBgImage className={classes.container}>
        <TopLogo />
        <HomeButtonDialog needConfirmation={false} />
        {isEnabled && <NavButtons left={'/welcome'} right={'/page-3'} />}
        {isEnabled && (
          <CenteredFlexBox className={classes.childContainer}>
            <CardMedia image={BrzLogo} className={classes.image} />
            <BlueLine />
            <Box className={classes.textContainer}>
              <Typography className={classes.mainText}>
                Guess what will be the bitcoin price at 5 pm (Brasília) and win{' '}
                <span className={classes.highlight}>1000 BRZs*</span> in your Transfero account.
              </Typography>
              <Typography
                className={classes.subText}
              >{`The closest guess wins the prize.`}</Typography>
            </Box>
          </CenteredFlexBox>
        )}
        {!isEnabled && (
          <CenteredFlexBox className={classes.childContainer}>
            <Box>
              <Typography
                className={classes.subTextOver}
              >{`The contest is over, but you can come back tomorrow to compete for 1000 BRZs.`}</Typography>
            </Box>
          </CenteredFlexBox>
        )}
        <FooterBar />
      </FullSizeCenteredFlexBoxBgImage>
      <RestartTimer delay={120} hideIcon />
    </>
  );
}

export default Page2;
