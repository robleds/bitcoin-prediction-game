import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  prev: {
    marginLeft: 30,
  },
  next: {
    marginRight: 30,
  },
});

export default function SlideNavButton({ isNext = false }) {
  const classes = useStyles();

  // const handleClick = () => {};

  return (
    <div>
      {!isNext && (
        <ArrowCircleLeftOutlinedIcon
          sx={{ fontSize: '5em' }}
          className={classes.prev}
          // onClick={handleClick}
        />
      )}
      {isNext && (
        <ArrowCircleRightOutlinedIcon
          sx={{ fontSize: '5em' }}
          className={classes.next}
          // onClick={handleClick}
        />
      )}
    </div>
  );
}
