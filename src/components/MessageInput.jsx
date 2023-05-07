import { useState } from 'react';
import { Box, TextField, IconButton} from '@mui/material';
import httpCommon from '../http/http-common';
import RecordAudioComponent from './RecordAudio';
import { Send } from '@mui/icons-material';

export default function MessageInput(props) {
  const { drawerWidth, messages, setMessages } = props;

  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault(); // Prevent the form from submitting
      handleInputSubmit(event);
    }
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
  return (
    <Box
      sx={{
        position: 'absolute',
        width: { xs: '100vw', sm: `calc(100% - ${drawerWidth}px)` },
        bottom: { xs: '3vh', md: '3vh' },
      }}
    >
      <Box
        display={'flex'}
        sx={{
          width: { xs: '90%', sm: `calc(100% - 80px )` },
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
          <IconButton color="primary" onClick={handleInputSubmit}>
            <Send />
          </IconButton>
          <RecordAudioComponent setInputText={setInputText} />
        </Box>
      </Box>
    </Box>
  );
}
