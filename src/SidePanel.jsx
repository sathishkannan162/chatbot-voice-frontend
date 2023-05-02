import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import DownloadTxtFile from './DownloadTxtFile';

const SidePanel = (props) => {
  const [open, setOpen] = useState(false);
  const {messages, clearChat} = props;

  const togglePanel = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* <button onClick={togglePanel}>Toggle Panel</button> */}
      <Drawer anchor="left" variant='permanent' >
        <List >
    <ListItem >
    <DownloadTxtFile messages={messages}/>
          </ListItem>
          <ListItem sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
            <Button variant="contained" onClick={clearChat}>Clear Chat</Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SidePanel;
