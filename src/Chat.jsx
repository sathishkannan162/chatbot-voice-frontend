import React, { useState } from 'react';
import httpCommon from './http/http-common';
import MessageList from './MessageList';
import RecordAudioComponent from './RecordAudio';
import DownloadTxtFile from './DownloadTxtFile';
import {BsSend} from 'react-icons/bs';


function ChatInput() {
  const [inputText, setInputText] = useState('');
  const [ messages, setMessages ] = useState([]);

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


  return (
    <>
    {/* <h1 className='chat-title'>Chat</h1> */}
    {/* <p className='chat-subtitle'>Talk to the assistant</p> */}
    {/* <p className='chat-subtitle'>Press the microphone button to start recording</p> */}
    {/* <p className='chat-subtitle'>Press the microphone button again to stop recording</p> */}
    {/* <p className='chat-subtitle'>Press the download button to download the conversation</p> */}
    <div className='side-panel'>
    <DownloadTxtFile messages={messages}/>
    <button className='clear-chat-button' onClick={clearChat}>Clear Chat</button>
    </div>
    <div className='chat-container'>
      <MessageList messages={messages} />
      <div className='input-container'>
    <form className='chat-input' onSubmit={handleInputSubmit}>
      <input className='text-input' type="text" value={inputText} onChange={handleInputChange} />
      <button className='send-button' type="submit"><BsSend /></button>
    </form>
    <RecordAudioComponent setInputText={setInputText}/>
  </div>
  </div>
    </>
  );
}

export default ChatInput;
