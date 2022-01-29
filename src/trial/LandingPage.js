 
import { useState } from 'react';

import { Provider } from 'react-redux';

import MainRoute from './components/user/routes';

import ThemeConfig from './theme';

import GlobalStyles from './theme/globalStyles';

import ScrollToTop from './components/ScrollToTop';

import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import store from './redux/store';

export default function LandingPage() {

  return (
  <Provider store={store}>	
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
         <BaseOptionChartStyle />
           <MainRoute />          
    </ThemeConfig>
   </Provider>  
  );
}
