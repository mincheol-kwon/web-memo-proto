import React from 'react';
import styled from 'styled-components';

const MemoTemplateBlock = styled.div`
  width: 2048px;
  height: 920px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;

  margin-top: 48px;
  margin-bottom: 32px;
  overflow-y: auto;
`;

function MemoTemplate({ children }) {
  return <MemoTemplateBlock>{children}</MemoTemplateBlock>;
}

export default MemoTemplate;
