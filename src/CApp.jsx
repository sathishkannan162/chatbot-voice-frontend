import SimpleSidebar from './SimpleSidebar';
import { useState } from 'react';
import { sampleMessages } from './sampleConversations/sampleConversations';
import MessageList from './chakraComponents/MessageList';
import MessageInput from './chakraComponents/MessageInput'
export default function App() {
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState(sampleMessages);
  return (
    <SimpleSidebar Header="Chat with AI">
      <MessageList messages={messages} />
      <MessageInput messages={messages} setMessages={setMessages} />
    </SimpleSidebar>
  );
}
