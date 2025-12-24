import CategoryIcon from '@mui/icons-material/Category';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FlagIcon from '@mui/icons-material/Flag';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import QuizIcon from '@mui/icons-material/Quiz';
import ReplayIcon from '@mui/icons-material/Replay';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Setup]: {
    component: asyncComponentLoader(() => import('@/pages/Setup')),
    path: '/',
    title: 'Setup',
    icon: PhonelinkSetupIcon,
  },
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/welcome',
    title: 'Welcome',
    icon: FlagIcon,
  },
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/page-1',
    title: 'Botões Iniciais',
    icon: CategoryIcon,
  },
  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Vídeozão',
    icon: OndemandVideoIcon,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Intermediária',
    icon: HourglassTopIcon,
  },
  [Pages.Page4]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/page-4',
    title: 'Vídeozão',
    icon: OndemandVideoIcon,
  },
  [Pages.Page5]: {
    component: asyncComponentLoader(() => import('@/pages/Page5')),
    path: '/page-5',
    title: 'Opinião e IBM',
    icon: FeedbackIcon,
  },
  [Pages.Page6]: {
    component: asyncComponentLoader(() => import('@/pages/Page6')),
    path: '/page-6',
    title: 'Quizes',
    icon: QuizIcon,
  },
  [Pages.Page7]: {
    component: asyncComponentLoader(() => import('@/pages/Page7')),
    path: '/finish',
    title: 'Finish',
    icon: ReplayIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
