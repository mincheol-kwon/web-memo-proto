import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import MemoTemplate from './components/MemoTemplate';
import MemoHead from './components/MemoHead';
import MemoList from './components/MemoList';
import { Memo } from './modules/Memo';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const App: React.FC = () => {
  const memos: Memo[] = useSelector<RootState, Memo[]>(
    (state) => state.memoReducer,
  );

  useEffect(() => {
    localStorage.setItem('local', JSON.stringify(memos));
  }, [memos]);
  return (
    <>
      <GlobalStyle />
      <MemoTemplate>
        <MemoHead />
        <MemoList />
      </MemoTemplate>
    </>
  );
};

export default App;
