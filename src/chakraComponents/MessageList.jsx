import Message from './Message';
import { Flex } from '@chakra-ui/react';

export default function MessageList(props) {
  const { messages } = props;
  const list = messages.map((message, index) => {
    return <Message key={index} message={message} />;
  });
  return (
    <Flex direction={'column'} gap={1} justifyContent={'right'}>
      {list}
    </Flex>
  );
}
