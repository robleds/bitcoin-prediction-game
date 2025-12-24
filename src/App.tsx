import { Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

// Firebase
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';

// import FooterBar from './components/FooterBar';
// import TopLogo from './components/TopLogo';
// import HomeButtonDialog from './components/HomeButtonDialog';

function App() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyD6PIAosEq7XwKsNX9w-h1IYN2wuhRMAww',
    authDomain: 'obatag.firebaseapp.com',
    databaseURL: 'https://obatag-default-rtdb.firebaseio.com',
    projectId: 'obatag',
    storageBucket: 'obatag.appspot.com',
    messagingSenderId: '1012439164529',
    appId: '1:1012439164529:web:94721477a2fc7885e59dd0',
    measurementId: 'G-3NQHHPQKLY',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  useEffect(() => {
    console.log('GA:', analytics);
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      <HotKeys />
      <SW />
      <BrowserRouter>
        <Sidebar />
        {/* <TopLogo /> */}
        {/* <HomeButtonDialog needConfirmation={false} /> */}
        {/* <FooterBar /> */}
        <Pages />
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
