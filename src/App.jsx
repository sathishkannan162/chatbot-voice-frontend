import ResponsiveDrawer from './ResponsiveHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#0d1117'
    // },
    // secondary: {
    //   main: '#0d1117'
    // },
    // primary: {
    //   main: '#1e1e1e',
    // },
    // secondary: {
    //   main: '#1e1e1e',
    // },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#1e1e1e',
    // },
    // secondary: {
    //   main: '#1e1e1e',
    // },
  },
});

function App() {
  const [light, setLight] = useState(true);

  const handleDarkMode = ()=>{
    setLight(!light);
  }
  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? false : true
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setTheme(mediaQuery.matches ? false : true);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  return (
    <>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <Box className="App">
          <ResponsiveDrawer handleDarkMode={handleDarkMode} theme={theme} light={light} />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
