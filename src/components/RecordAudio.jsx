import { useState } from 'react';
import httpCommon from '../http/http-common';
import { BiMicrophone } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { MdOutlineTranscribe } from 'react-icons/md';
import { Box, IconButton, Tooltip } from '@mui/material';

const RecordAudioComponent = (props) => {
  const { setInputText } = props;
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const handleStartRecording = () => {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        setAudioBlob(audioBlob);
      });

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 12000);
    });
  };
  // TODO: audio would be posted automatically after stop recording.
  // TODO: change the button from start to stop when recording start and vice versa.
  const handleStopRecording = () => {
    setRecording(false);
  };

  const handlePostAudio = () => {
    const formData = new FormData();
    formData.append('audioData', audioBlob, 'recording.wav');
    httpCommon
      .post('/record', formData)
      .then((response) => {
        setInputText(response.data.transcript);
        setAudioBlob(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {recording ? (
          <Tooltip title="Stop Recording">
            <IconButton onClick={handleStopRecording} color="error">
              <BsStopCircle />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Start Recording">
            <IconButton onClick={handleStartRecording} color="primary">
              <BiMicrophone />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Transcribe">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={handlePostAudio}
              disabled={!audioBlob}
              color="primary"
            >
              <MdOutlineTranscribe />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
    </>
  );
};

export default RecordAudioComponent;
