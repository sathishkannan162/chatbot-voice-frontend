import { Flex } from '@chakra-ui/react';
import { Tooltip, IconButton } from '@chakra-ui/react';
import { BiMicrophone } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { MdOutlineTranscribe } from 'react-icons/md';
import { useState } from 'react';

export default function RecordButtons(props) {
  const [recording, setRecording] = useState(false);
  return (
    <Flex direction={'row'}>
      {recording ? (
        <Tooltip label="Stop Recording">
          <IconButton icon={<BsStopCircle />}></IconButton>
        </Tooltip>
      ) : (
        <Tooltip label="Start Recording">
          <IconButton icon={<BiMicrophone/>}
          ></IconButton>
        </Tooltip>
      )}
      <Tooltip label="Transcribe">
        <IconButton icon={<MdOutlineTranscribe />}></IconButton>
      </Tooltip>
    </Flex>
  );
}
