import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import MemoItem from './MemoItem';
import { Memo } from '../modules/Memo';
import MemoColorButton from './MemoColorButton';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const MemoListBlock = styled.div<{ column: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.column}, 1fr);
`;
const ButtonGroup = styled.div`
  margin: 1rem;
  & + & {
    margin-top: 1rem;
  }
`;

function MemoList() {
  const memos: Memo[] = useSelector<RootState, Memo[]>(
    (state) => state.memoReducer,
  );
  const [column, setColumns] = useState<number>(1);
  return (
    <ThemeProvider
      theme={{
        palette: {
          what: '#20C997',
        },
      }}
    >
      <ButtonGroup>
        <MemoColorButton
          selected={1 === column}
          color="what"
          onClick={() => setColumns(1)}
        >
          1
        </MemoColorButton>
        <MemoColorButton
          selected={2 === column}
          color="what"
          onClick={() => setColumns(2)}
        >
          2
        </MemoColorButton>
        <MemoColorButton
          selected={3 === column}
          color="what"
          onClick={() => setColumns(3)}
        >
          3
        </MemoColorButton>
      </ButtonGroup>
      <MemoListBlock column={column}>
        {memos.map((memo) => (
          <MemoItem
            key={memo.id}
            id={memo.id}
            name={memo.name}
            text={memo.text}
            color={memo.color}
          />
        ))}
      </MemoListBlock>
    </ThemeProvider>
  );
}

export default MemoList;
