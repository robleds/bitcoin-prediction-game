import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import { makeStyles } from '@material-ui/core/styles';

import { FullSizeCenteredFlexBox } from '../styled';
import clickSound from './../Assets/click.mp3';

const useStyles = makeStyles({
  container: {
    marginTop: 70,
  },
  containerLeft: {
    position: 'absolute',
    left: 15,
  },
  containerRight: {
    position: 'absolute',
    right: 15,
  },
});

const ArrowLeft = () => {
  return (
    <svg id="Camada_2" viewBox="0 0 72.18 138.7">
      <g>
        <polyline
          style={{
            fill: 'none',
            stroke: '#81feef',
            strokeMiterlimit: 10,
            strokeWidth: 4,
          }}
          points="70.76 137.28 2.83 69.35 70.76 1.41"
        />
      </g>
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <svg id="Camada_2" viewBox="0 0 72.18 138.7">
      <g>
        <polyline
          style={{
            fill: 'none',
            stroke: '#81feef',
            strokeMiterlimit: 10,
            strokeWidth: 4,
          }}
          points="1.41 1.41 69.35 69.35 1.41 137.28"
        />
      </g>
    </svg>
  );
};

interface MyComponentProps {
  left: string;
  right: string;
}

const NavButtons: React.FC<MyComponentProps> = (props: MyComponentProps) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const audioRef = React.useRef(new Audio(clickSound));

  const urlLeft = props.left;
  const urlRight = props.right;

  const handleClickLeft = () => {
    audioRef.current.play();
    navigate(urlLeft);
  };

  const handleClickRight = () => {
    audioRef.current.play();
    if (urlRight) navigate(urlRight);
  };

  return (
    <FullSizeCenteredFlexBox className={classes.container}>
      <Button
        variant="text"
        color="inherit"
        onClick={handleClickLeft}
        className={classes.containerLeft}
      >
        <ArrowLeft />
      </Button>
      {urlRight && (
        <Button
          variant="text"
          color="inherit"
          onClick={handleClickRight}
          className={classes.containerRight}
        >
          <ArrowRight />
        </Button>
      )}
    </FullSizeCenteredFlexBox>
  );
};

export default NavButtons;
