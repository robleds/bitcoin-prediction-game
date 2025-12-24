import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

import clickSound from './../Assets/click.mp3';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: 57,
    right: 60,
    float: 'right',
    padding: 15,
    // backgroundColor: 'green',
  },
  containerTiny: {
    position: 'absolute',
    top: 0,
    right: 0,
    float: 'right',
    padding: 15,
    // backgroundColor: 'green',
  },
  iconHome: {
    fill: 'none',
    stroke: '#fff',
    strokeLinecap: 'round',
    strokeWidth: 3,
  },
});

export default function HomeButtonDialog({ needConfirmation = false, tiny = false }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const audioRef = React.useRef(new Audio(clickSound));

  const handleClickOpen = () => {
    audioRef.current.play();
    if (needConfirmation) {
      return setOpen(true);
    }
    navigate('/welcome');
  };

  const handleBackButtonDialog = () => {
    setOpen(false);
  };

  const handleSucess = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <div>
      <Button
        variant="text"
        color="inherit"
        onClick={handleClickOpen}
        className={tiny ? classes.containerTiny : classes.container}
      >
        <svg id="Camada_2" viewBox="0 0 49.61 41.23">
          <g id="Camada_1-2" data-name="Camada 1">
            <g>
              <path className={classes.iconHome} d="M40.73,15.85v23.89H8.88V15.85" />
              <path className={classes.iconHome} d="M1.49,20.56L24.8,1.91l23.31,18.65" />
            </g>
          </g>
        </svg>
      </Button>

      <Dialog
        open={open}
        onClose={handleBackButtonDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Tem certerteza que deseja reiniciar?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar a aplicação vai voltar para tela inicial e todo processo não salvo será
            perdido.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="info" onClick={handleBackButtonDialog}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSucess} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
