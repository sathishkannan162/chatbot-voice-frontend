import SimpleSidebar from './SimpleSidebar';
import { useState } from 'react';
import { sampleMessages } from './sampleConversations/sampleConversations';
import MessageList from './chakraComponents/MessageList';
import MessageInput from './chakraComponents/MessageInput';
import Downloadbutton from './chakraComponents/DownloadButton';
import ClearChat from './chakraComponents/ClearChat';

export default function App() {
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState(sampleMessages);
  return (
    <SimpleSidebar
      Header="Chat with AI"
      SidebarList={[Downloadbutton, ClearChat]}
    >
      <MessageList messages={messages} />
      <MessageInput messages={messages} setMessages={setMessages} />
    </SimpleSidebar>
  );
}
