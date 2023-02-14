import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';

function memoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.memo);
    case 'REMOVE':
      return state.filter((memo) => memo.id !== action.id);
    case 'UPDATE':
      return action.newstate;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const MemoStateContext = createContext();
const MemoDispatchContext = createContext();
const MemoNextIdContext = createContext();

export function MemoProvider({ children }) {
  const rawItems = localStorage.getItem('local');
  const items = JSON.parse(rawItems);

  const initialMemos =
    rawItems !== null
      ? items
      : {
          id: 1,
          name: '나',
          text: '테스트용',
          color: 'FED3DC',
        };

  const [state, dispatch] = useReducer(memoReducer, initialMemos);
  const nextId = useRef(2);
  console.log(initialMemos);
  useEffect(() => {
    localStorage.setItem('local', JSON.stringify(state));
  }, [state]);

  return (
    <MemoStateContext.Provider value={state}>
      <MemoDispatchContext.Provider value={dispatch}>
        <MemoNextIdContext.Provider value={nextId}>
          {children}
        </MemoNextIdContext.Provider>
      </MemoDispatchContext.Provider>
    </MemoStateContext.Provider>
  );
}

export function useMemoState() {
  const context = useContext(MemoStateContext);
  if (!context) {
    throw new Error('Cannot find Provider');
  }
  return context;
}

export function useMemoDispatch() {
  const context = useContext(MemoDispatchContext);
  if (!context) {
    throw new Error('Cannot find Provider');
  }
  return context;
}

export function useMemoNextId() {
  const context = useContext(MemoNextIdContext);
  if (!context) {
    throw new Error('Cannot find Provider');
  }
  return context;
}
