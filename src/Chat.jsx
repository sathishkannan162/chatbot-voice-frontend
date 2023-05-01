import { useState } from 'react';
import httpCommon from './http/http-common';
import MessageList from './MessageList';
import RecordAudioComponent from './RecordAudio';
import DownloadTxtFile from './DownloadTxtFile';
import {BsSend} from 'react-icons/bs';


function ChatInput() {
  const [inputText, setInputText] = useState('');
  const [ messages, setMessages ] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
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


  return (
    <>
    <div className='side-panel'>
    <DownloadTxtFile messages={messages}/>
    <button className='clear-chat-button' onClick={clearChat}>Clear Chat</button>
    </div>
    <div className='chat-container'>
      <MessageList messages={messages} />
      <div className='input-container'>
        <form className='chat-input' onSubmit={handleInputSubmit}> 
      <textarea cols="30" rows="1" className='text-input' type="text" value={inputText} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <button className='send-button' type="submit"><BsSend /></button>
    </form>
    <RecordAudioComponent setInputText={setInputText}/>
  </div>
  </div>
    </>
  );
}

export default ChatInput;
