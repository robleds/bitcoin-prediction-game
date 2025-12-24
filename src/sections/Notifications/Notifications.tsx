import { SnackbarProvider } from 'notistack';

// import { notifications } from '@/config';
import Notifier from './Notifier';

function Notifications() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Notifier />
    </SnackbarProvider>
  );
}

export default Notifications;
