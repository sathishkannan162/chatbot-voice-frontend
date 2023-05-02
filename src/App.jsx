// import './App.css'
import ChatInput from './Chat';
import ResponsiveDrawer from './ResponsiveHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e1e1e',
    },
    secondary: {
      main: '#1e1e1e',
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
  }

});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <Box className="App">
        <ResponsiveDrawer />
      </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
