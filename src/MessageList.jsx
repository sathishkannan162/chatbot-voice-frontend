import Message from "./Message";

export default function MessageList(props) {
  const { messages } = props;
  const list = messages.map((message, index) => {
    return <Message key={index} message={message} />;
  });
  return <div style={{ overflow: scroll}} className="chat-log">{list}</div>;
}

