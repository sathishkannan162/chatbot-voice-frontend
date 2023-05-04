import { useState } from 'react';
import httpCommon from './http/http-common';
import MessageList from './MessageList';
import RecordAudioComponent from './RecordAudio';
import { BsSend } from 'react-icons/bs';
import { Grid, TextField, IconButton, Box } from '@mui/material';
import { Send } from '@mui/icons-material';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChatInput from './Chat';
import DownloadTxtFile from './DownloadTxtFile';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const drawerWidth = 200;
const inputWidth = 100;
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

function ResponsiveDrawer(props) {
  const { window,handleDarkMode, light, theme} = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  // const [messages, setMessages] = useState(sampleMessages);

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
    // TODO: react sets the two states at the same time, so the message is not shown. fix this.
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
      {/* <Toolbar /> */}
      {/* <Divider /> */}
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
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
        {/* <ListItem key={text} disablePadding> */}
        {/* <ListItemButton> */}
        {/* <ListItemIcon> */}
        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        {/* </ListItemIcon> */}
        {/* <ListItemText primary={text} /> */}
        {/* </ListItemButton> */}
        {/* </ListItem> */}
        {/* ))} */}
      </List>
      {/* <Divider /> */}
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => ( */}
        {/* <ListItem key={text} disablePadding> */}
        {/* <ListItemButton> */}
        {/* <ListItemIcon> */}
        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        {/* </ListItemIcon> */}
        {/* <ListItemText primary={text} /> */}
        {/* </ListItemButton> */}
        {/* </ListItem> */}
        {/* ))} */}
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
          {/* <FormControlLabel sx={{ ml: 'auto' }} control={<Switch onClick={handleDarkMode} />} label="Dark Mode" /> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        {/* <ChatInput /> */}
        {/* <Grid container> */}
        {/* <Grid item xs={2} md={2} > */}
        {/* <SidePanel messages={messages} clearChat={clearChat}/> */}
        {/* </Grid> */}
        {/* <Grid item xs={10} md={10} > */}
        {/* chat log */}
        <Box
          sx={{
            width: '100%',
            height: {xs: '80vh', sm:'100vh', md: '100vh'},
            // height: {xs: "40vh", sm: "60vh", md: "80vh", lg: "80vh", xl: "80vh"},
          }}
        >
          <MessageList
            messages={messages}
          light={light}
          theme={theme}
            responsiveHeaderHeight={responsiveHeaderHeight}
          />
        </Box>
        {/* text field */}
        <Box
          sx={{
            position: 'absolute',
            width: { xs: "100vw", sm: `calc(100% - ${drawerWidth}px)` },
            bottom: {xs: '3vh', md:'3vh'} 
            // border: '1px solid #ccc',
          }}
        >
          {/* <Grid container> */}
          {/* <Grid item xs={10}> */}
          <Box
            display={'flex'}
            sx={{
              width: { xs: "90%", sm: `calc(100% - 80px )` },
              paddingTop: '2px',
              paddingBottom: '2px',
              paddingLeft: '0px',
              paddingTop: 0,
              paddingBottom: 0,
              textDecoration: 'none',
              // outline: 'black solid 1px',
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
            {/* </Grid> */}
            {/* <Grid item xs={2}> */}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <IconButton color='primary' onClick={handleInputSubmit}>
                <Send />
              </IconButton>
              <RecordAudioComponent setInputText={setInputText} />
            </Box>
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </Box>
        {/* </Grid> */}
        {/* </Grid> */}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;

