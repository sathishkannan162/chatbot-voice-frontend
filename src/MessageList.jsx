import { calcLength } from 'framer-motion';
import Message from './Message';
import { Box,Paper } from '@mui/material';

export default function MessageList(props) {
  const { messages, responsiveHeaderHeight } = props;
  const list = messages.map((message, index) => {
    return <Message key={index} message={message} />;
  });
  return (
    <Paper
      sx={{
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        height: "100vh",
        paddingLeft: 0,
        paddingTop: responsiveHeaderHeight,
        paddingBottom: responsiveHeaderHeight,
        backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {list}
    </Paper>
  );
}

