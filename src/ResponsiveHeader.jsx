import { useState } from 'react';
import httpCommon from './http/http-common';
import MessageList from './MessageList';
import RecordAudioComponent from './RecordAudio';
import { TextField, IconButton, Box } from '@mui/material';
import { Send } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DownloadTxtFile from './DownloadTxtFile';
import Button from '@mui/material/Button';

const drawerWidth = 200;
const responsiveHeaderHeight = '56px';
const sampleMessages = [
  { role: 'user', content: 'hi' },
  { role: 'assistant', content: 'Hello! What can you do?' },
  { role: 'user', content: 'Can you sing?' },
  {
    role: 'assistant',
    content:
      'As a AI language model, I cannot sing.But I can write poems about anything you wish.',
  },
  { role: 'user', content: 'Can you sing?' },
  {
    role: 'assistant',
    content:
      'As a AI language model, I cannot sing.But I can write poems about anything you wish.',
  },
  { role: 'user', content: 'Can you sing?' },
  {
    role: 'assistant',
    content:
      'As a AI language model, I cannot sing.But I can write poems about anything you wish.',
  },
  { role: 'user', content: 'Can you sing?' },
  {
    role: 'assistant',
    content:
      'As a AI language model, I cannot sing.But I can write poems about anything you wish.',
  },
  { role: 'user', content: 'Can you sing?' },
  {
    role: 'assistant',
    content:
    "```js \n" +"function test() {\n" + "  console.log('notice the blank line before this function?');\n" + "}\n" + "```",
  },
];

const codeSamplemessage=   [{ role: 'user', content: 'Can you sing?' },
  {
    role: 'assistant',
    content:
    "```js \n" +"function test() {\n" + "  console.log('notice the blank line before this function?');\n" + "}\n" + "```",
  },
];


function ResponsiveDrawer(props) {
  const { window,handleDarkMode, light, theme} = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  // const [messages, setMessages] = useState(sampleMessages);
  // const [messages, setMessages] = useState(codeSamplemessage);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault(); // Prevent the form from submitting
      handleInputSubmit(event);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleInputSubmit = async (event) => {
    event.preventDefault();
    messages.push({ role: 'user', content: inputText });

    const response = await httpCommon.post('/complete', { messages });
    setMessages([
      ...messages,
      { role: 'assistant', content: response.data.response },
    ]);
    setInputText('');
  };

  const clearChat = () => {
    setMessages([]);
  };

  const drawer = (
    <div>
      <List
        sx={{
          height: {xs:'84vh', md: '97vh'},
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DownloadTxtFile messages={messages} />
        </ListItem>
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" onClick={clearChat}>
            Clear Chat
          </Button>
        </ListItem>
      </List>
      <List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: responsiveHeaderHeight,
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
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
          <Typography variant="h6" noWrap component="div">
            Chat With AI
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: {xs: '80vh', sm:'100vh', md: '100vh'},
          }}
        >
          <MessageList
            messages={messages}
          light={light}
          theme={theme}
            responsiveHeaderHeight={responsiveHeaderHeight}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            width: { xs: "100vw", sm: `calc(100% - ${drawerWidth}px)` },
            bottom: {xs: '3vh', md:'3vh'} 
          }}
        >
          <Box
            display={'flex'}
            sx={{
              width: { xs: "90%", sm: `calc(100% - 80px )` },
              paddingTop: '2px',
              paddingBottom: '2px',
              paddingLeft: '0px',
              // paddingTop: 0,
              // paddingBottom: 0,
              textDecoration: 'none',
              margin: '0 auto',
              borderRadius: '5px',
            }}
          >
            <TextField
              multiline
              maxRows={5}
              placeholder="Type your message"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              size="small"
            padding={0}
              sx={{
                flexGrow: 1,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <IconButton color='primary' onClick={handleInputSubmit}>
                <Send />
              </IconButton>
              <RecordAudioComponent setInputText={setInputText} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;

