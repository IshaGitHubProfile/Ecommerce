import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions , Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout : 5000,
  position : positions.BOTTOM_CENTER,
  transition : transitions.SCALE,
};
//ReactDOM.render() method is called to render the root component (App) into the DOM.
ReactDOM.render(
  //Provider is a component provided by the react-redux library that allows React components to access the Redux store and dispatch actions.
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root") //The rendered output is inserted into the HTML element with the id "root".
);

//This code sets up a React application with Redux integration for state management and react-alert for displaying alerts. 
//It configures the application to use the Redux store and alerts throughout the component tree, and then renders the App component into the DOM.