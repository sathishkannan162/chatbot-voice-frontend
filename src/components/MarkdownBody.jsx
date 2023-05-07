import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  gruvboxDark,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Box, Tooltip } from '@mui/material';

export default function MarkdownBody(props) {
  const { content, light } = props;
  const [copy, setCopy] = useState(false); //TODO: separate the copy icon elements into a separate element and pass the codeblock as props, so that the whole component is not changed when the icon has to change.
  const handleCopyCodeBlock = () => {
    window.navigator.clipboard.writeText(codeBlockTemp);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };
  let codeBlockTemp = ''; // NOTE: create a variable to temporarily store codeblock for copy
  const copyIconColorDark = '#aaa';
  const copyIconColorLight = '#444';
  return (
    <ReactMarkdown
      children={content}
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
                  color: light ? copyIconColorLight : copyIconColorDark, // TODO:uncomment when implementing dark mode
                  // color: 'purple',
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
  );
}
