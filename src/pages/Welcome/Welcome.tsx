import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';

import { makeStyles } from '@material-ui/core/styles';

import FooterBar from '@/components/FooterBar';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import clickSound from './../../components/Assets/click.mp3';
import BackgroundImg from './assets/bg_transfero_home.png';
import WelcomeMainLogo from './assets/logo-transfero-final.png';
import WelcomeLeftButton from './assets/welcome-button-1.png';
import WelcomeRightButton from './assets/welcome-button-2.png';

const useStyles = makeStyles({
  root: {
    // background: '#110625',
    backgroundImage: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageMainLogo: {
    width: '65%',
    height: 131,
    position: 'absolute',
    marginBottom: 450,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 200,
    justifyContent: 'space-between',
  },
  buttonImage: {
    width: '45%',
  },
});

function Welcome() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(clickSound));
  // delay controller
  const initialSlideLogo = 300;
  const initialSlideLeft = 500;
  const initialSlideRight = 750;
  const [delaySlideLogo, setDelaySlideLogo] = useState(initialSlideLogo);
  const [delaySlideLeft, setDelaySlideLeft] = useState(initialSlideLeft);
  const [delaySlideRight, setDelaySlideRight] = useState(initialSlideRight);

  const closeScreenTransition = (param: string) => {
    setTimeout(() => setDelaySlideLogo(initialSlideLogo / 2), delaySlideLogo / 2);
    setTimeout(() => setDelaySlideLeft(initialSlideLeft / 2), delaySlideLeft / 2);
    setTimeout(() => setDelaySlideRight(initialSlideRight / 2), delaySlideRight / 2);
    let navigateURL = '';
    switch (param) {
      case 'about':
        navigateURL = '/page-1';
        break;
      case 'challenge':
        navigateURL = '/page-2';
        break;
      default:
        navigateURL = '';
        break;
    }
    setTimeout(() => navigate(navigateURL), delaySlideRight + 250);
  };

  useEffect(() => {
    setTimeout(() => setDelaySlideLogo(0), delaySlideLogo);
    setTimeout(() => setDelaySlideLeft(0), delaySlideLeft);
    setTimeout(() => setDelaySlideRight(0), delaySlideRight);
  }, []);

  return (
    <>
      <Meta title="Welcome" />
      <FullSizeCenteredFlexBox className={classes.root}>
        <Fade
          in={delaySlideLogo === 0}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 400, exit: 350 }}
        >
          <CardMedia
            component="img"
            sx={{ objectFit: 'contain' }}
            image={WelcomeMainLogo}
            className={classes.imageMainLogo}
          />
        </Fade>
        <Box className={classes.buttonContainer}>
          <Slide
            direction="right"
            in={delaySlideLeft === 0}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 500, exit: 250 }}
          >
            <CardMedia
              component="img"
              sx={{ objectFit: 'contain' }}
              image={WelcomeLeftButton}
              className={classes.buttonImage}
              onClick={() => {
                audioRef.current.play(), closeScreenTransition('challenge');
              }}
            />
          </Slide>
          <Slide
            direction="left"
            in={delaySlideRight === 0}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 500, exit: 250 }}
          >
            <CardMedia
              component="img"
              sx={{ objectFit: 'contain' }}
              image={WelcomeRightButton}
              className={classes.buttonImage}
              onClick={() => {
                audioRef.current.play(), closeScreenTransition('about');
              }}
            />
          </Slide>
        </Box>
        <FooterBar />
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
