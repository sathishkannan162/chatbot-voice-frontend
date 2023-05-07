import DownloadTxtFile from './DownloadTxtFile';
import { List, ListItem } from '@mui/material';
import ClearChatButton from './ClearChatButton';

export default function SideDrawer(props) {
  const { messages, setMessages } = props;

  const clearChat = () => {
    setMessages([]);
  };

  const sideButtons = [
    <DownloadTxtFile messages={messages} />,
    <ClearChatButton clearChat={clearChat} />,
  ];

  const sideList = sideButtons.map((item, key) => {
    return (
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        key={key}
      >
        {item}
      </ListItem>
    );
  });
  return (
    <div>
      <List
        sx={{
          height: { xs: '84vh', md: '97vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {sideList}
      </List>
    </div>
  );
}
