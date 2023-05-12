import { Card, CardBody, Avatar, Flex, Text } from '@chakra-ui/react';
import robot from '../assets/robot-avatar.png';
import user from '../assets/user-avatar.png' 
export default function Message(props) {
  const { message } = props;
  const isUser = message.role==='user';

  return (
    <Card>
      <CardBody>
        <Flex gap="4" flexDir={isUser?"row":"row-reverse"} >
          <Avatar name={isUser?'user':'assistant'} src={isUser?  user: robot}></Avatar> 
          <Text>{message.content}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
}
