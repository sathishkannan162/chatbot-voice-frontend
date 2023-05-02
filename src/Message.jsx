// import robot from './assets/robot-avatar.png';
// import user from './assets/user-avatar.png';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import 'github-markdown-css/github-markdown.css'

// export default function Message(props) {
//   const {message} = props;
//   return (
//     <div className={`chat-bubble chat-bubble-${message.role}`}>
//       <div className="message-username"><img className='chat-logo' src={message.role==='user'? user: robot}></img></div>
//       <div className="message-text markdown-body"><ReactMarkdown children={message.content} remarkPlugins={[remarkGfm]}></ReactMarkdown></div>
//     </div>
//   );
// }

import robot from './assets/robot-avatar.png';
import user from './assets/user-avatar.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar, Paper, Typography } from '@mui/material';
import 'github-markdown-css/github-markdown.css';
import './Message.css';
import { Box } from '@mui/material';
// import { makeStyles } from '@mui/material/styles';

// const useStyles = makeStyles({
  // chatBubble: { margin: '5px', padding: '8px', borderRadius: '8px' },
  // chatBubbleUser: {
  //   display: 'flex',
  //   flexDirection: 'row-reverse',
  //   alignItems: 'center',
  //   alignSelf: 'flex-end',
  //   paddingLeft: '20px',
  // },
  // chatBubbleAssistant: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   maxWidth: '55%',
  // },
  // chatBubbleText: {
  //   flexGrow: 1,
  // },
  // chatBubbleTextUser: {
  //   display: 'block',
  //   textAlign: 'right',
  // },
  // avatar: {
  //   marginRight: '8px',
  //   marginLeft: '8px',
  //   width: '32px',
  //   height: '32px',
  // },
  // avatarUser: {
  //   marginRight: 0,
  //   marginLeft: '8px',
  // },
// });

export default function Message(props) {
  // const classes = useStyles();
  const { message } = props;
  const avatarSrc = message.role === 'user' ? user : robot;
  return (
      <Paper className={`chat-bubble chat-bubble-${message.role}`}>
      <Avatar src={avatarSrc} className={`avatar avatar-${message.role}`} />
      {/* <Box className="message-text"> */}
        {/* <Typography sx={{overflow: 'hidden'}} className="markdown-body"> */}
        <div className='markdown-body'>
          <ReactMarkdown
            children={message.content}
            remarkPlugins={[remarkGfm]}
          /></div>
        {/* </Typography> */}
      {/* </Box> */}
    </Paper>
  );
}
