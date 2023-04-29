import beautify from 'js-beautify';
const DownloadTxtFile = ({messages}) => {
  console.log(messages);
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const data = beautify(JSON.stringify(messages), { indent_size: 2, space_in_empty_paren: true });
    const file = new Blob([data], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <button className='download-chat-button' onClick={downloadTxtFile}>Download chat</button>
  );
};

export default DownloadTxtFile;
