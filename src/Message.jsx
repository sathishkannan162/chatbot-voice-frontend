import robot from './assets/robot-avatar.png';
import user from './assets/user-avatar.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css'

export default function Message(props) {
  const {message} = props;
  return (
    <div className={`chat-bubble chat-bubble-${message.role}`}>
      <div className="message-username"><img className='chat-logo' src={message.role==='user'? user: robot}></img></div>
      <div className="message-text markdown-body"><ReactMarkdown children={message.content} remarkPlugins={[remarkGfm]}></ReactMarkdown></div>
    </div>
  );
}

