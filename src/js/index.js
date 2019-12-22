import '../css/style.css';
import startSite from './startSite.js';
require.context("../img/", true, /\.(png|svg|jpg|gif)$/);

startSite();
