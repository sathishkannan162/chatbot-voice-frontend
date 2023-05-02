import { useState } from 'react';
import httpCommon from './http/http-common';
import MessageList from './MessageList';
import RecordAudioComponent from './RecordAudio';
import { BsSend } from 'react-icons/bs';
import { Grid, TextField, IconButton,Box } from '@mui/material';
import SidePanel from './SidePanel';
import { Send } from '@mui/icons-material';

function ChatInput() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

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

  return (
    <Grid container>
      {/* <Grid item xs={2} md={2} > */}
        {/* <SidePanel messages={messages} clearChat={clearChat}/> */}
      {/* </Grid> */}
      <Grid item xs={10} md={10} >
        <MessageList messages={messages} />
          <Box sx={{height: "7vh"}}>
        <Grid container>
          <Grid item xs={10} >
            <TextField
              multiline
              rows={1}
              placeholder="Type your message here"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              size='small'
              sx={{ width: '95%', rows: 1, borderRadius: 40, outline: 'none' }}
            />
            <IconButton 
              onClick={handleInputSubmit}
            >
              <Send />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <RecordAudioComponent setInputText={setInputText} />
          </Grid>
        </Grid>
          </Box>
      </Grid>
    </Grid>
  );
}

export default ChatInput;
