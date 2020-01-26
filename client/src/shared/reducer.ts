import { EffectAction, State } from './types';

export function effectReducer(state: State, action: EffectAction): State {
  let letters = state.letters;
  if (!action) return state;

  if (action.type === 'SET_INITIAL_STATE') {
    const { clues, letters } = action;
    return {
      active: null,
      clues,
      letters,
    };
  }
  if (action.type === 'RECONNECTING') {
    return { active: null, clues: null, letters: [] };
  }

  const { active, setLetter } = action;
  if (setLetter) {
    const { i, j, letter } = setLetter;
    letters = [...letters];
    const newRow = [...letters[i]];
    newRow[j] = letter;
    letters[i] = newRow;
  }
  return {
    ...state,
    active,
    letters,
  };
}