import { useState } from 'react';
import httpCommon from './http/http-common';
import MessageList from './MessageList';
import RecordAudioComponent from './RecordAudio';
import DownloadTxtFile from './DownloadTxtFile';
import {BsSend} from 'react-icons/bs';
import { Grid, Button, TextField } from '@mui/material';
import SidePanel from './SidePanel';

function ChatInput() {
  const [inputText, setInputText] = useState('');
  const [ messages, setMessages ] = useState([]);

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
    
    const response = await httpCommon.post('/complete', {messages});
    setMessages([...messages, { role: 'assistant', content: response.data.response}]);
    setInputText('');
  };

  const clearChat = () => {
    setMessages([]);
  }


  // return (
  //   <>
  //   <div className='side-panel'>
  //   <DownloadTxtFile messages={messages}/>
  //   <button className='clear-chat-button' onClick={clearChat}>Clear Chat</button>
  //   </div>
  //   <div className='chat-container'>
  //     <MessageList messages={messages} />
  //     <div className='input-container'>
  //       <form className='chat-input' onSubmit={handleInputSubmit}> 
  //     <textarea cols="30" rows="1" className='text-input' type="text" value={inputText} onChange={handleInputChange} onKeyDown={handleKeyDown} />
  //     <button className='send-button' type="submit"><BsSend /></button>
  //   </form>
  //   <RecordAudioComponent setInputText={setInputText}/>
  // </div>
  // </div>
  //   </>
  // );
  return (
<Grid container className= "setheight">
  <Grid item xs={3} >
    <SidePanel  />
      </Grid>
      <Grid item xs={9} className="setHeight">
        <MessageList messages={messages} />
        <Grid container>
          <Grid item xs={10}>
            <TextField
              fullWidth
              multiline
              rows={1}
              placeholder="Type your message here"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={handleInputSubmit}>
              <BsSend />
            </Button>
            <RecordAudioComponent setInputText={setInputText}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChatInput;
