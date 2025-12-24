import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    margin: 20,
    marginLeft: 90,
    position: 'absolute',
    top: 0,
    left: 0,
    float: 'left',
  },
});

function RestartTimer(props: {
  delay: number | null | undefined;
  hideIcon: boolean | null | undefined;
}) {
  const navigate = useNavigate();
  const classes = useStyles();
  const totalTimer = props.delay || 60;
  const [seconds, setSeconds] = useState(totalTimer);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1 / 4);
    }, 1000 / 4);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setProgress(100 - (seconds / totalTimer) * 100);
    if (seconds === 0) {
      for (let i = 0; i < 10000; i++) {
        window.clearInterval(i);
      }
      setTimeout(() => {
        navigate('/welcome');
      }, 1000);
    }
  }, [seconds]);

  const handleReload = () => {
    navigate(0);
  };
  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
        <LinearProgress color="info" variant="determinate" value={progress} />
      </Box>
      {!props.hideIcon && (
        <Button
          variant="outlined"
          color="warning"
          onClick={handleReload}
          className={classes.button}
        >
          <TimerIcon />
        </Button>
      )}
    </>
  );
}

RestartTimer.defaultProps = {
  delay: 5,
  hideIcon: false,
};
export default RestartTimer;
