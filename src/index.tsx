import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import { persistor, store} from './store/store';
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyAAjw85uxcbY1mnVmcAOTTkCtCc7pgCbDM",

    authDomain: "web-task-7772f.firebaseapp.com",

    projectId: "web-task-7772f",

    storageBucket: "web-task-7772f.appspot.com",

    messagingSenderId: "461861595848",

    appId: "1:461861595848:web:2a13858b5fd2a05385d3fd"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Suspense fallback={"...loading"}>
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
