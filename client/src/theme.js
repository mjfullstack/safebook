// theme.js for passing via context

// import React, { Component } from 'react';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

// All the following keys are optional.
// We try our best to provide a great default value.

// export const theme = createMuiTheme({
// export function theme  ( { createMuiTheme{

// class Theme extends Component {
//   constructor(props){
//     super(props);
//   this.state={
//     theme: this.theme,
//   }
// }
// return


const theme = createMuiTheme({
  typography: {
      useNextVariants: true,
    },
    palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  }
});

export default theme;