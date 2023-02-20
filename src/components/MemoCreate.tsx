import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { addMemo, Inputs } from '../modules/Memo';
import MemoColorButton from './MemoColorButton';
import ToastNotification from './ToastNotification';

const InsertFormPositioner = styled.div`
  width: 20%;
  bottom: 0;
  left: 0;
  position: top;
  margin-left: 5rem;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 16px;
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 16px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

function MemoCreate() {
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    text: '',
    color: 'FED3DC',
  });

  const [toastState, setToastState] = useState<boolean>(false);

  const { name, text, color } = inputs;

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || text === '') {
      setToastState(true);
    } else {
      dispatch(addMemo(inputs));
      setInputs({
        ...inputs,
        name: '',
        text: '',
      });
    }
  };

  return (
    <InsertFormPositioner>
      <InsertForm onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="이름 입력"
          onChange={onChange}
          value={name}
        />
      </InsertForm>
      <InsertForm onSubmit={onSubmit}>
        <Input
          name="text"
          placeholder="메모 내용을 입력 후, Enter 를 누르세요"
          onChange={onChange}
          value={text}
        />
      </InsertForm>
      {toastState === true ? (
        <ToastNotification setToastState={setToastState} />
      ) : null}
      <ThemeProvider
        theme={{
          palette: {
            pink: '#FED3DC',
            green: '#E2FFE9',
            yellow: '#FFFEAF',
          },
        }}
      >
        <ButtonGroup>
          <MemoColorButton
            color="pink"
            selected={color === 'FED3DC'}
            onClick={() => setInputs({ ...inputs, color: 'FED3DC' })}
          >
            #FED3DC
          </MemoColorButton>
          <MemoColorButton
            color="green"
            selected={color === 'E2FFE9'}
            onClick={() => setInputs({ ...inputs, color: 'E2FFE9' })}
          >
            #E2FFE9
          </MemoColorButton>
          <MemoColorButton
            color="yellow"
            selected={color === 'FFFEAF'}
            onClick={() => setInputs({ ...inputs, color: 'FFFEAF' })}
          >
            #FFFEAF
          </MemoColorButton>
        </ButtonGroup>
      </ThemeProvider>
    </InsertFormPositioner>
  );
}

export default React.memo(MemoCreate);
