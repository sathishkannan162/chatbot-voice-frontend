import SimpleSidebar from './SimpleSidebar';
import { useState } from 'react';
import { Box, Card, CardBody, Avatar, Flex, Text } from '@chakra-ui/react';
import { sampleMessages } from './sampleConversations/sampleConversations';
import MessageList from './chakraComponents/MessageList';
export default function App() {
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState(sampleMessages);
  return (
    <SimpleSidebar>
      <MessageList messages={messages} /> 
    </SimpleSidebar>
  );
}
