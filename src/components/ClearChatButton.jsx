import { Button } from "@mui/material";

export default function ClearChatButton(props) {
  const {clearChat} = props;
  return (
    <Button variant="contained" onClick={clearChat}>
      Clear Chat
    </Button>
  );
}
