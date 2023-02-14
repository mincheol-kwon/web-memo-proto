import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { useMemoDispatch } from '../MemoContext';

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const MemoItemBlock = styled.div`
  display: flex;
  position: relative;
  margin: 1rem;
  padding: 1rem;
  width: 200px;
  height: 200px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
  background: #${(props) => props.color};
`;

const Text = styled.div`
  flex: 1;
  font-size: 16px;
  color: #495057;
`;

const Name = styled.div`
  font-size: 8px;
  color: #495057;
`;

function MemoItem({ id, name, text, color }) {
  const dispatch = useMemoDispatch();
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  return (
    <MemoItemBlock color={color}>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
      <Text>{text}</Text>
      <Name>{name}</Name>
    </MemoItemBlock>
  );
}

export default React.memo(MemoItem);
