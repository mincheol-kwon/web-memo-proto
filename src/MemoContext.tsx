import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  Dispatch,
  MutableRefObject,
} from 'react';

export type Memo = { id: number; name: string; text: string; color: string };

export type Action =
  | { type: 'CREATE'; memo: Memo }
  | { type: 'REMOVE'; id: number };

type MemoDispatch = Dispatch<Action>;

function memoReducer(memos: Memo[], action: Action) {
  switch (action.type) {
    case 'CREATE':
      return memos.concat(action.memo);
    case 'REMOVE':
      return memos.filter((memo) => memo.id !== action.id);
    default:
      throw new Error(`Unhandled action type`);
  }
}

const MemoStateContext = createContext<Memo[] | null>(null);
const MemoDispatchContext = createContext<MemoDispatch | null>(null);
const MemoNextIdContext = createContext<MutableRefObject<number> | null>(null);

export function MemoProvider({ children }: { children: React.ReactNode }) {
  const rawItems: string | null = localStorage.getItem('local');

  const initialMemos =
    rawItems !== null
      ? JSON.parse(rawItems)
      : {
          id: 1,
          name: '나',
          text: '테스트용',
          color: 'FED3DC',
        };

  const [state, dispatch] = useReducer(memoReducer, initialMemos);
  const nextId = useRef(initialMemos.length + 1);
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
