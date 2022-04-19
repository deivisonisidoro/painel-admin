import React from 'react';
import Routes from "./routes";
import {ThemeProvider, createTheme,} from '@material-ui/core'
import {BrowserRouter as Router} from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function App() {
  
  /* HOOKS */
  const darkMode = useSelector(state => state.utilsReducer.darkMode);
  
  /*THEME*/
  const theme = createTheme({
    spacing: 4,
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#007bff',
      },
      secondary: {
        main:'#808080'
      },
      background: {
        default: darkMode ? '#181818' : '#FFF',
        dark: darkMode ? '#181818' : '#e5e5e5',
        paper: darkMode ? '#323232' : '#e5e5e5',
      },
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes darkMode={darkMode} />
      </ThemeProvider>
    </Router>
  );
}

