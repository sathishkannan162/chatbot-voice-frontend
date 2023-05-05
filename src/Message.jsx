import { useState } from 'react';
import robot from './assets/robot-avatar.png';
import user from './assets/user-avatar.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar, Paper, Box, Tooltip } from '@mui/material';
// import 'github-markdown-css/github-markdown.css';
import './github-markdown-css/common.css';
import './github-markdown-css/light.css';
import './github-markdown-css/dark.css';
import './Message.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  gruvboxDark,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function Message(props) {
  const { message, light } = props;
  const [copy, setCopy] = useState(false); //TODO: separate the copy icon elements into a separate element and pass the codeblock as props, so that the whole component is not changed when the icon has to change.
  const avatarSrc = message.role === 'user' ? user : robot;
  const avatarClass = light
    ? `avatar avatar-${message.role}`
    : `avatar avatar-dark-${message.role}`;
  let codeBlockTemp = ''; // NOTE: create a variable to temporarily store codeblock for copy
  //NOTE: setting state inside jsx leads to rerendering loop. set state outside it. eg: inside the function.
  let markdownClass = light
    ? `markdown-body-light markdown-body`
    : `markdown-body-dark markdown-body`;
  const handleCopyCodeBlock = () => {
    window.navigator.clipboard.writeText(codeBlockTemp);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };
  return (
    <Paper className={`chat-bubble chat-bubble-${message.role}`}>
      <Avatar src={avatarSrc} className={avatarClass} />
      <div className={markdownClass}>
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
                      // color: light ? 'white' : 'black', // TODO:uncomment when implementing dark mode
                      color: 'purple',
                      // NOTE: set color to grey or some other suitable color for dark mode and do the same for light mode.
                    }}
                  >
                    {match[1]}
                    {copy ? (
                      <Tooltip title="copied" placement="right-end">
                        <AssignmentTurnedInIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip title="copy code" placement="right-end">
                        <ContentPasteIcon
                          fontSize="small"
                          onClick={handleCopyCodeBlock}
                        />
                      </Tooltip>
                    )}
                  </Box>
                  <div hidden>{(codeBlockTemp = children)}</div>
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
    </Paper>
  );
}
