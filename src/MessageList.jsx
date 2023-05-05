import Message from './Message';
import { Paper } from '@mui/material';

export default function MessageList(props) {
  const {light,theme} = props;
  const { messages, responsiveHeaderHeight } = props;
  const list = messages.map((message, index) => {
    return <Message key={index} message={message} light={light} theme={theme} />;
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
        height: {xs:"84vh", sm:"90vh", md:"100vh"},
        paddingLeft: 0,
        paddingTop: responsiveHeaderHeight,
        paddingBottom: "10vh",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {list}
    </Paper>
  );
}

