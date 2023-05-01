import Message from "./Message";
import { Paper } from '@mui/material';

export default function MessageList(props) {
  const { messages } = props;
  const list = messages.map((message, index) => {
    return <Message key={index} message={message} />;
  });
  return (
    <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
      {list}
    </Paper>
  );
}
// export default function MessageList(props) {
//   const { messages } = props;
//   const list = messages.map((message, index) => {
//     return <Message key={index} message={message} />;
//   });
//   return <div style={{ overflow: scroll}} className="chat-log">{list}</div>;
// }

