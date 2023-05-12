import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { TextareaAutosize } from '@mui/material';
import '../styles/messageInput.css';
import { Send } from '@mui/icons-material';
import RecordButtons from './RecordButtons';

export default function MessageInput(props) {
  return (
    <Flex
      position={'fixed'}
      bottom="10px"
      minW={{ base: '90vw', sm: '94vw', md: '80vw' }}
    >
      <TextareaAutosize
        maxRows={5}
        minRows={1}
        placeholder={'Type your message'}
        className={'textarea-input'}
      />
      <Tooltip label="Send Message">
        <IconButton aria-label="Send Message" icon={<Send />}></IconButton>
      </Tooltip>
      <RecordButtons />
    </Flex>
  );
}
