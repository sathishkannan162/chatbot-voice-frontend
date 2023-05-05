import ResponsiveDrawer from './components/ResponsiveHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#000',
    },
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#fff',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#1e1e1e',
    },
    secondary: {
      main: '#1e1e1e',
    },
  },
});

function App() {
  const [light, setLight] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? false : true
  );

  const handleDarkMode = () => {
    setLight(!light);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setTheme(mediaQuery.matches ? false : true);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return (
    <>
      <ThemeProvider theme={light ? lightTheme : darkTheme}>
        <Box className="App">
          <ResponsiveDrawer handleDarkMode={handleDarkMode} light={light} />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
