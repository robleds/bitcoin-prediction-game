import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';

import { makeStyles } from '@material-ui/core/styles';
// Firebase
import { getDatabase, ref, set } from 'firebase/database';

import BitcoinPrice from '@/components/BitcoinPrice';
import FooterBar from '@/components/FooterBar';
import FormParticipate from '@/components/FormParticipate/FormParticipate';
import HomeButtonDialog from '@/components/HomeButtonDialog';
import Meta from '@/components/Meta';
import NavButtons from '@/components/NavButtons';
import RestartTimer from '@/components/RestartTimer';
import TopLogo from '@/components/TopLogo';
import { CenteredFlexBox, FullSizeCenteredFlexBoxBgImage } from '@/components/styled';

import ClickSound from './../../components/Assets/click.mp3';
import SubmitSound from './assets/submit-form.mp3';

const useStyles = makeStyles({
  container: {
    minWidth: '100hw',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  childContainer: {
    // backgroundColor: '#3540f2',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 70,
  },
  mainText: {
    fontSize: 25,
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
  },
  button: {
    width: '100%',
    color: 'white',
    paddingRight: 100,
    paddingLeft: 60,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#3540f2',
  },
  buttonIconArrow: {
    fontSize: 30,
    position: 'absolute',
    right: 20,
    color: 'white',
  },
  buttonIconProcess: {
    fontSize: 30,
    position: 'absolute',
    right: 22,
    color: 'white',
  },
  buttonIconSuccess: {
    fontSize: 30,
    position: 'absolute',
    right: 20,
    color: 'white',
  },
  buttonText: {
    fontSize: 20,
    paddingLeft: 35,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 50,
  },
  highlight: {
    color: '#81feef',
    fontWeight: 'bold',
  },
  termsText: {
    paddingTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
});

const CssNButton = styled(Button)({
  '&:hover': {
    backgroundColor: '#3540ff',
  },
});

interface participation {
  id: string;
  timestemp_start: string;
  timestemp_answer: string;
  timestemp_form: string;
  timestemp_end: string;
  bundle: string;
  btz_value: number;
  name: string;
  email: string;
  phone: string;
  telegram: string;
}

interface MyFormElement {
  btc: string;
}

function Page4() {
  const classes = useStyles();
  const navigate = useNavigate();
  const form = useRef<MyFormElement>(null);
  const audioRefClick = useRef(new Audio(ClickSound));
  const audioRefSubmit = useRef(new Audio(SubmitSound));
  const [loading, setLoading] = useState(false);
  const [registerSucess, setRegisterSucess] = useState(false);
  const [resetTimmer, setResetTimmer] = useState(true);

  const handleSubmit = async () => {
    audioRefClick.current.play();
    setLoading(true);
    const bundleId = 'oba.transfero.websummit.participation';
    const getLocalData = (await localStorage.getItem(bundleId)) || '';
    const localParticipation = JSON.parse(getLocalData);
    const btc = form?.current?.btc || 0;
    const participation: participation = {
      ...localParticipation,
      btz_value: btc,
      timestemp_answer: new Date().toISOString(),
    };

    await writeUserData(participation);

    window.setTimeout(() => {
      audioRefSubmit.current.play();
      setLoading(false);
      setRegisterSucess(true);
      window.setTimeout(() => {
        navigate(`/page-5`);
      }, 1600);
    }, 600);
  };

  async function writeUserData(request: participation) {
    await localStorage.removeItem(request.bundle);
    const db = await getDatabase();
    const requestId = request.id;
    await set(ref(db, 'transfero2003/' + requestId), request);
    await localStorage.setItem(request.bundle, JSON.stringify(request));
  }

  useEffect(() => {
    setTimeout(() => setResetTimmer(true), 200);
  }, [resetTimmer]);

  function handleTextChange() {
    setResetTimmer(false);
  }

  return (
    <>
      <Meta title="Challenge" />
      <FullSizeCenteredFlexBoxBgImage className={classes.container}>
        <TopLogo />
        <HomeButtonDialog needConfirmation={false} />
        <NavButtons left={'/page-3'} right={'/page-5'} />
        <CenteredFlexBox className={classes.childContainer}>
          <BitcoinPrice />
          <Typography className={classes.mainText} align="center">
            What will be the <span className={classes.highlight}>Bitcoin</span> price at{' '}
            <span className={classes.highlight}>5 pm (Brasília)</span>?
          </Typography>

          <FormParticipate ref={form} onTextChange={handleTextChange} />

          <Box className={classes.buttonContainer}>
            <CssNButton
              onClick={handleSubmit}
              className={classes.button}
              disabled={loading || registerSucess}
            >
              <Typography className={classes.buttonText}>{`save`}</Typography>
              {!loading && !registerSucess && (
                <ArrowForwardIcon className={classes.buttonIconArrow} />
              )}
              {registerSucess && <CheckCircleIcon className={classes.buttonIconSuccess} />}
              {loading && <CircularProgress size={25} className={classes.buttonIconProcess} />}
            </CssNButton>
          </Box>
          <Typography
            className={classes.termsText}
            onClick={() => window.open('https://cryptowat.ch/pt-br/charts/KRAKEN:BTC-USD')}
          >
            The real price of Bitcoin will be verified based on{' '}
            <span style={{ textDecoration: 'underline' }}>www.cryptowat.ch</span> website
          </Typography>
        </CenteredFlexBox>
        <FooterBar />
      </FullSizeCenteredFlexBoxBgImage>
      {resetTimmer && <RestartTimer delay={180} hideIcon />}
    </>
  );
}

export default Page4;
