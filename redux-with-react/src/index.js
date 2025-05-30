import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);

//Provider is a part of react-redux library. It is used to wrap the application with the store
//So that all the components can access the store. It is a custom provider similar to context provider
