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

import { useState } from 'react';
import robot from './assets/robot-avatar.png';

import user from './assets/user-avatar.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar, Divider, Paper, Typography, Box } from '@mui/material';
import 'github-markdown-css/github-markdown.css';
import './Message.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  gruvboxDark,
  gruvboxLight,
  duotoneLight,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
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
  const { message, light, theme } = props;
  const [codeBlock, setCodeBlock] = useState('');
  const [copy, setCopy] = useState(false);
  const avatarSrc = message.role === 'user' ? user : robot;
  const avatarClass = light
    ? `avatar avatar-${message.role}`
    : `avatar avatar-dark-${message.role}`;
  // const markdownClass = light ? `markdown-body markdown-body-light` :`markdown-body markdown-body-dark`;
  let codeBlockTemp = ''; // create a variable to temporarily store codeblock for copy
  // setting state inside jsx leads to rerendering loop.
  // set state outside it. eg: inside the function.
  const handleCopyCodeBlock = () => {
    window.navigator.clipboard.writeText(codeBlockTemp);
    setCopy(true);
    console.log({ codeBlockTemp });
    console.log({ codeBlock });
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };
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
                <div className="markdown-code-body">
                  <Box
                    className="code-header"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      // color: light ? 'white' : 'black', // uncomment when implementing dark mode
                      color: 'purple',
                      // set color to grey or some other suitable color for dark mode and do the same for light mode.
                    }}
                  >
                    {match[1]}
                    {copy ? (
                      <AssignmentTurnedInIcon />
                    ) : (
                      // tooltip for the buttons.
                      <ContentPasteIcon
                        fontSize="small"
                        onClick={handleCopyCodeBlock}
                      />
                    )}
                  </Box>
                  {/* <Divider /> */}
                  <div hidden>{(codeBlockTemp = children)}</div>
                  {console.log(match[1])}
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    style={light ? materialLight : gruvboxDark}
                    language={match[1]}
                    PreTag="div"
                  />
                </div>
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
