
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './redux/store';

import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';

import App from './App';

import * as serviceWorker from './serviceWorker';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Privder store={store}>
	<HelmetProvider>
	   <BrowserRouter>
	      <App />
	   </BrowserRouter>
	</HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
