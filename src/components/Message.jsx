import robot from '../assets/robot-avatar.png';
import user from '../assets/user-avatar.png';
import { Avatar, Paper, Tooltip } from '@mui/material';
import '../styles/github-markdown-css/common.css';
import '../styles/github-markdown-css/light.css';
import '../styles/github-markdown-css/dark.css';
import '../styles/Message.css';
import MarkdownBody from './MarkdownBody';

export default function Message(props) {
  const { message, light } = props;
  const avatarSrc = message.role === 'user' ? user : robot;
  const avatarClass = light
    ? `avatar avatar-${message.role}`
    : `avatar avatar-dark-${message.role}`;
  //NOTE: setting state inside jsx leads to rerendering loop. set state outside it. eg: inside the function.
  let markdownClass = light
    ? `markdown-body-light markdown-body`
    : `markdown-body-dark markdown-body`;
  return (
    <Paper className={`chat-bubble chat-bubble-${message.role}`}>
      <Avatar src={avatarSrc} className={avatarClass} />
      <div className={markdownClass}>
        <MarkdownBody light={light} content={message.content} />
      </div>
    </Paper>
  );
}
