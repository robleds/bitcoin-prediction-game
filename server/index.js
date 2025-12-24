const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/btc-price', (req, res) => {

  const apiKey = 'POLLC33V4BEGRX6DH2HU';
  const CRYPTOWAT_API_URL = `https://api.cryptowat.ch/markets/kraken/btcusd/price?apikey=${apiKey}`;
  // const CRYPTOWAT_API_URL = 'https://crypto.transfero.com/api/v2/markets';

  axios.get(CRYPTOWAT_API_URL)
    .then(response => {
      const price = response.data.result.price;
      // const transferoCoinList = response.data;
      // let outputBtc = '';
      // transferoCoinList.forEach(element => {
      //   if (element.ticker === "BTC/USDC") {
      //     outputBtc = element.price.toFixed(2);
      //   }
      // });
      res.send(`${price}`);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Erro ao obter preço do BTC');
    });
});

app.get('/participation', (req, res) => {
  const firebase = require('firebase/app');
  const { getDatabase, ref, child, get } = require('firebase/database');
  require('firebase/database');
  const XLSX = require('xlsx');
  const fs = require('fs');
  const firebaseConfig = {
    apiKey: "AIzaSyD6PIAosEq7XwKsNX9w-h1IYN2wuhRMAww",
    authDomain: "obatag.firebaseapp.com",
    databaseURL: "https://obatag-default-rtdb.firebaseio.com",
    projectId: "obatag",
    storageBucket: "obatag.appspot.com",
    messagingSenderId: "1012439164529",
    appId: "1:1012439164529:web:94721477a2fc7885e59dd0",
    measurementId: "G-3NQHHPQKLY"
  };
  firebase.initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase());
  get(child(dbRef, `transfero2003/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const fileName = 'participants.xlsx';
      const data = snapshot.val();
      const arrayData = Object.values(data);
      const spreadsheet = XLSX.utils.json_to_sheet(arrayData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, spreadsheet, 'Transfero Websummit 2023');
      const prefixProd = '/root';
      const filePath = `${process.env.HOME === prefixProd ? './..' : '.'}/${fileName}`;
      XLSX.writeFile(workBook, filePath);
      fs.readFile(filePath, function (err, data) {
        if (err) {
          res.status(500).send({ error: err });
        }
        else {
          res.setHeader('Content-Disposition', 'attachment; filename=participants.xlsx');
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.send(data);
        }
      });
    } else {
      res.send("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
