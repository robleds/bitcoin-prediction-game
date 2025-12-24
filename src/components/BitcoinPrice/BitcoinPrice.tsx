import { useEffect, useState } from 'react';

import { CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import BtcLogo from './assets/btc-logo.png';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  mainText: {
    fontSize: 19,
  },
  priceText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#81feef',
  },
  image: {
    width: 65,
    height: 50,
    backgroundSize: 'contain',
    marginRight: 27,
  },
});

function BitcoinPrice() {
  const [bitcoinPrice, setBitcoinPrice] = useState('');
  const classes = useStyles();

  const formatting_options = {
    // style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // users can see how locale passed as a parameter.
  const dollarString = new Intl.NumberFormat('en-US', formatting_options);

  const enviroment = import.meta.env.MODE;
  const devPath = 'http://127.0.0.1:3000';
  const prodPath = 'http://64.226.110.141:3000';
  const fetchBitcoinPrice = async () => {
    axios
      .get(`${enviroment === 'development' ? devPath : prodPath}/btc-price`)
      .then((response) => {
        const btcPrice = response.data;
        const finalString = dollarString.format(btcPrice) as string;
        setBitcoinPrice(finalString);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const intervalId = setInterval(() => {
      console.log('---interval---');
      fetchBitcoinPrice();
    }, 30000); // 30seg
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box className={classes.container}>
      <CardMedia image={BtcLogo} className={classes.image} />
      <div>
        <Typography className={classes.mainText}>{'Bitcoin price:'}</Typography>
        <Typography className={classes.priceText}>{`US$ ${
          bitcoinPrice === '' ? ' Loading...' : bitcoinPrice
        }`}</Typography>
      </div>
    </Box>
  );
}

export default BitcoinPrice;
