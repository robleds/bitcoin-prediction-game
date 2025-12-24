import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Typography } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import FooterBar from '@/components/FooterBar';
import HomeButtonDialog from '@/components/HomeButtonDialog';
import Meta from '@/components/Meta';
import RestartTimer from '@/components/RestartTimer';
import TopLogo from '@/components/TopLogo';
import { CenteredFlexBox, FullSizeCenteredFlexBoxBgImage } from '@/components/styled';

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
    marginTop: 30,
  },
  mainIcon: {
    fontSize: 80,
    // marginBottom: 20,
  },
  mainText: {
    fontSize: 40,
    marginBottom: 20,
  },
  subText: {
    fontSize: 30,
  },
  highlight: {
    color: '#81feef',
    fontWeight: 'bold',
  },
});

function Page5() {
  const classes = useStyles();
  return (
    <>
      <Meta title="Challenge" />
      <FullSizeCenteredFlexBoxBgImage className={classes.container}>
        <TopLogo />
        <HomeButtonDialog needConfirmation={false} />
        <CenteredFlexBox className={classes.childContainer}>
          <ThumbUpOffAltIcon className={classes.mainIcon} />
          <Typography className={classes.mainText} align="center">
            <span className={classes.highlight}>;) Thank you for participating!</span>
          </Typography>
          <Typography className={classes.subText} align="center">
            You will receive a message with the contest results at the end of the day.
            <br />
            <br />
            Good luck!
          </Typography>
        </CenteredFlexBox>
        <FooterBar />
      </FullSizeCenteredFlexBoxBgImage>
      <RestartTimer delay={60} hideIcon />
    </>
  );
}

export default Page5;
