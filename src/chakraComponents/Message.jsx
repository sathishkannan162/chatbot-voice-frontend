import { Card, CardBody, Avatar, Flex, Text } from '@chakra-ui/react';
import robot from '../assets/robot-avatar.png';
import user from '../assets/user-avatar.png';
import '../styles/github-markdown-css/common.css';
import '../styles/github-markdown-css/light.css';
import '../styles/github-markdown-css/dark.css';
import MarkdownBody from './MarkdownBody';

export default function Message(props) {
  const { message } = props;
  const isUser = message.role === 'user';

  return (
    <Flex direction={isUser ? 'row-reverse' : 'row'}>
      <Card maxW={{ base: '100%', sm: '100%', md: '85%' }} boxShadow="md">
        <CardBody paddingY={2}>
          <Flex
            gap="2"
            flexDir={isUser ? 'row-reverse' : 'row'}
            alignItems="center"
          >
            <Avatar
              name={isUser ? 'user' : 'assistant'}
              src={isUser ? user : robot}
            ></Avatar>
            <div className='markdown-body markdown-body-light'>

              <MarkdownBody content={message.content} />
            </div>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
