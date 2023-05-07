import { useState } from 'react';
import {
  IconButton,
  Box,
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MaterialUISwitch from './MaterialUISwitch';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
import SideDrawer from './SideDrawer';
// import { codeSamplemessage, sampleMessages } from './sampleConversations';

const drawerWidth = 200;
const responsiveHeaderHeight = '56px';

function ResponsiveDrawer(props) {
  const { window, handleDarkMode, light } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  // const [messages, setMessages] = useState(sampleMessages);
  // const [messages, setMessages] = useState(codeSamplemessage);
  // TODO: set initial state of the button from the light state.

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Responsive header code from Mui.com */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: responsiveHeaderHeight,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              position: 'absolute',
              left: '5%',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ paddingLeft: { xs: '25px', md: 0 } }}
          >
            Chat With AI
          </Typography>
          <MaterialUISwitch onClick={handleDarkMode} />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="download, clearchat buttons"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <SideDrawer messages={messages} setMessages={setMessages} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <SideDrawer messages={messages} setMessages={setMessages} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <MessageBox
          responsiveHeaderHeight={responsiveHeaderHeight}
          light={light}
          messages={messages}
        />
        <MessageInput
          drawerWidth={drawerWidth}
          messages={messages}
          setMessages={setMessages}
        />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
