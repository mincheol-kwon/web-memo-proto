import React from 'react';
import styled from 'styled-components';
import MemoCreate from './MemoCreate';
import type { Memo } from '../modules/Memo';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const MemoHeadBlock = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    display: flex;
    margin: 1rem;
    font-size: 36px;
    color: #343a40;
  }
  .num-memo {
    color: #20c997;
    font-size: 18px;
    margin-top: 2px;
    font-weight: bold;
  }
`;

function MemoHead() {
  const memos: Memo[] = useSelector<RootState, Memo[]>(
    (state) => state.memoReducer,
  );
  return (
    <MemoHeadBlock>
      <h1>
        메모 관리 앱
        <MemoCreate />
      </h1>
      <div className="num-memo">메모 개수: {memos.length}개</div>
    </MemoHeadBlock>
  );
}

export default MemoHead;
