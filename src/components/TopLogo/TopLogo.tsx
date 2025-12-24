import React from 'react';
import { useNavigate } from 'react-router-dom';

import CardMedia from '@mui/material/CardMedia';

import { makeStyles } from '@material-ui/core/styles';

import clickSound from './../Assets/click.mp3';
import TopMainLogo from './assets/logo-transfero-final-small.png';

const useStyles = makeStyles({
  imageTopLogo: {
    width: 300,
    height: 94,
    float: 'left',
    position: 'absolute',
    top: 38,
    left: 75,
    backgroundSize: 'contain',
    // backgroundColor: 'pink',
  },
});

export default function TopLogo() {
  const classes = useStyles();
  const navigate = useNavigate();
  const audioRef = React.useRef(new Audio(clickSound));

  const handleClick = () => {
    audioRef.current.play();
    navigate('/welcome');
  };

  return (
    <CardMedia
      image={TopMainLogo}
      className={classes.imageTopLogo}
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    />
  );
}
