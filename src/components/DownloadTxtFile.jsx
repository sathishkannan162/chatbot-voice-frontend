import beautify from 'js-beautify';
import { Button } from '@mui/material';

const DownloadTxtFile = ({ messages }) => {
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const data = beautify(JSON.stringify(messages), { indent_size: 2, space_in_empty_paren: true });
    const file = new Blob([data], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <Button variant="contained" onClick={downloadTxtFile}>
      Download chat
    </Button>
  );
};

export default DownloadTxtFile;
