export interface Inputs {
  name: string;
  text: string;
  color: string;
}
export interface Memo extends Inputs {
  id: number;
}

export type Action =
  | { type: 'CREATE'; memo: Memo }
  | { type: 'REMOVE'; id: number };

const rawItems: string | null = localStorage.getItem('local');

const initialMemos: Memo[] =
  rawItems !== null
    ? JSON.parse(rawItems)
    : [
        {
          id: 1,
          name: '나',
          text: '테스트용',
          color: 'FED3DC',
        },
      ];
let nextId = initialMemos.length + 1;

export function addMemo(input: Inputs) {
  return {
    type: 'CREATE',
    memo: {
      id: nextId++,
      name: input.name,
      text: input.text,
      color: input.color,
    },
  };
}

export default function memoReducer(
  memos: Memo[] = initialMemos,
  action: Action,
) {
  switch (action.type) {
    case 'CREATE':
      return memos.concat(action.memo);
    case 'REMOVE':
      return memos.filter((memo) => memo.id !== action.id);
    default:
      return memos;
  }
}
