import { useState } from 'react';
import httpCommon from './http/http-common';
import { BiMicrophone } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { MdOutlineTranscribe } from 'react-icons/md';
// import {MdTranscribe} from 'react-icons/md'
// import {TfiWrite} from 'react-icons/tfi';
import { Box, Button, IconButton } from '@mui/material';

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
    // setTimeout(handlePostAudio, 1000);
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
      {/* <div className="audio-buttons"> */}
    <Box sx={{display: "flex", flexDirection:"row"}}>
        {recording ? (
          <IconButton
            className="stop-audio-button"
            onClick={handleStopRecording}
          >
            <BsStopCircle />
          </IconButton>
        ) : (
          <IconButton
            className="start-audio-button"
            onClick={handleStartRecording}
          >
            <BiMicrophone />
          </IconButton>
        )}
        <IconButton
          className="transcribe-button"
          onClick={handlePostAudio}
          disabled={!audioBlob}
        >
          {/* Transcribe */}
    <MdOutlineTranscribe />

        </IconButton>
    </Box>
      {/* </div> */}
    </>
  );
};

export default RecordAudioComponent;
