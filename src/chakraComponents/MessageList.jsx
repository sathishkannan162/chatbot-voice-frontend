import Message from './Message';
import { Container, VStack } from '@chakra-ui/react';

export default function MessageList(props) {
  const { messages } = props;
  const list = messages.map((message, index) => {
    return <Message key={index} message={message} />;
  });
  return <VStack>{list}</VStack>;
}
