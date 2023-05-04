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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
  const { message, light } = props;
  const avatarSrc = message.role === 'user' ? user : robot;
  const avatarClass = light
    ? `avatar avatar-${message.role}`
    : `avatar avatar-dark-${message.role}`;
  // const markdownClass = light ? `markdown-body markdown-body-light` :`markdown-body markdown-body-dark`;
  return (
    <Paper className={`chat-bubble chat-bubble-${message.role}`}>
      <Avatar src={avatarSrc} className={avatarClass} />
      {/* <Box className="message-text"> */}
      {/* <Typography sx={{overflow: 'hidden'}} className="markdown-body"> */}
      <div className={'markdown-body'}>
        {/* <ReactMarkdown children={message.content} remarkPlugins={[remarkGfm]} /> */}
        <ReactMarkdown
          children={message.content}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
      {/* </Typography> */}
      {/* </Box> */}
    </Paper>
  );
}
