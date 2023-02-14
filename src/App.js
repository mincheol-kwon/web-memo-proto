import React from 'react';
import { createGlobalStyle } from 'styled-components';
import MemoTemplate from './components/MemoTemplate';
import MemoHead from './components/MemoHead';
import MemoList from './components/MemoList';
import { MemoProvider } from './MemoContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <MemoProvider>
      <GlobalStyle />
      <MemoTemplate>
        <MemoHead />
        <MemoList />
      </MemoTemplate>
    </MemoProvider>
  );
}

export default App;
