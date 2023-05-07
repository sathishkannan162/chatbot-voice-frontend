import MessageList from './MessageList';
import { Box } from '@mui/material';
export default function MessageBox(props) {
  const { responsiveHeaderHeight, messages, light } = props;
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '80vh', sm: '100vh', md: '100vh' },
      }}
    >
      <MessageList
        messages={messages}
        light={light}
        responsiveHeaderHeight={responsiveHeaderHeight}
      />
    </Box>
  );
}
