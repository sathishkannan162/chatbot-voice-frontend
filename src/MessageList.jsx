import { calcLength } from 'framer-motion';
import Message from './Message';
import { Box,Paper } from '@mui/material';

export default function MessageList(props) {
  const { messages, ResponsiveHeaderHeight } = props;
  const list = messages.map((message, index) => {
    return <Message key={index} message={message} />;
  });
  return (
    <Paper
      sx={{
        overflowY: 'scroll',
        height: "100vh",
        paddingLeft: 0,
        paddingTop: ResponsiveHeaderHeight,
        paddingBottom: ResponsiveHeaderHeight,
        backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {list}
    </Paper>
  );
}

