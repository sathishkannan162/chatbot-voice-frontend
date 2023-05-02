// import './App.css'
import ChatInput from './Chat';
import ResponsiveDrawer from './ResponsiveHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme({
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

function App() {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Box className="App">
        <ResponsiveDrawer />
      </Box>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
