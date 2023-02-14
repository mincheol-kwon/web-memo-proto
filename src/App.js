import React from "react";
import { createGlobalStyle } from "styled-components";
import MemoTemplate from "./components/MemoTemplate";
import MemoHead from "./components/MemoHead";
import MemoList from "./components/MemoList";
import MemoCreate from "./components/MemoCreate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <MemoTemplate>
        <MemoHead />
        <MemoList />
        <MemoCreate />
      </MemoTemplate>
    </>
  );
}

export default App;
