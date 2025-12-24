import { Box, Slide } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  bottomBar: {
    width: '100%',
    height: 14,
    backgroundColor: '#3635d9dd',
    position: 'absolute',
    bottom: 0,
  },
});

export default function FooterBar() {
  const classes = useStyles();
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={{ enter: 1, exit: 1 }}>
      <Box className={classes.bottomBar} />
    </Slide>
  );
}
