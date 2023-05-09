import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import { createPopper } from '@popperjs/core'; // Add this line
import Dropdown from 'bootstrap/js/dist/dropdown'; // Add this line
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import axios from 'axios';

import './assets/main.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHCrIImoeXEh6OSuf9GUa96acRcgqCml0",
  authDomain: "ziggybotai.firebaseapp.com",
  projectId: "ziggybotai",
  storageBucket: "ziggybotai.appspot.com",
  messagingSenderId: "204305150848",
  appId: "1:204305150848:web:46141e68686b954a344765",
  measurementId: "G-DNLB4PQE2R"
};

// Initialize Firebase
initializeApp(firebaseConfig);
library.add(faPhone, faTwitter, faUserSecret, faShoppingCart, fas);

const app = createApp(App)
app.use(createPinia())
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router)

// console.log(process.env.VUE_APP_API_URL);
// axios.defaults.baseURL = process.env.VUE_APP_API_URL;
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(
//   config => {
//     if (config.url.startsWith('http://')) {
//       config.url = config.url.replace('http://', 'https://');
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

app.mount('#app')

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', () => {
  const dropdownElements = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
  const dropdownList = dropdownElements.map(function (dropdownToggleEl) {
    return new Dropdown(dropdownToggleEl);
  });
});
