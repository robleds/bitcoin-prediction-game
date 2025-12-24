import isMobile from '@/utils/is-mobile';

// import type { Notifications } from './types';

const title = 'Bitcoin Prediction Game';

const email = 'obatag@doctorweb.com.br';

const repository = 'https://github.com/SEU-USUARIO/bitcoin-prediction-game-2023';

const messages = {
  app: {
    crash: {
      title: 'Oooops... Desculpe, eu acho, algo deu errado. Você pode:',
      options: {
        email: `contato com o autor por este e-mail - ${email}`,
        reset: 'Pressione aqui para redefinir o aplicativo',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, há algo errado com este processo de carregamento de componentes... Talvez tentar mais tarde seja a melhor ideia',
  },
  images: {
    failed: 'algo deu errado durante o carregamento da imagem :(',
  },
  404: 'Ei você? O que você está procurando?',
};

const dateFormat = 'MMMM DD, YYYY';

// const notifications: Notifications = {
//   options: {
//     anchorOrigin: {
//       vertical: 'bottom',
//       horizontal: 'left',
//     },
//     autoHideDuration: 6000,
//   },
//   maxSnack: isMobile ? 3 : 4,
// };

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description:
    'A blockchain finance solutions company focused on enabling a more decentralized and free global system.',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
  loader,
  // notifications,
  dateFormat,
  messages,
  repository,
  email,
  title,
  defaultMetaTags,
  giphy404,
};
