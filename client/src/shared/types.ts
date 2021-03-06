export type ClueSetData = {
  order: number[];
  byNumber: {
    [number: string]: {
      /**
       * The text for the crossword clue.
       */
      clue: string;

      /**
       * The number of letters in the clue.
       */
      size: number;

      /**
       * The arrangement of the words in the clue. In most cases, this is the string version of the clue size.
       */
      wordArrangement: string;

      row: number;
      col: number;
    };
  };
};

export type CluesData = {
  width: number;
  height: number;
  across: ClueSetData;
  down: ClueSetData;
};

/**
 * A representation of the user's focus within the grid. All modifications to
 * the grid's letters are performed by modifying a letter at a time, and most
 * result in the cursor being moved.
 */
export type Cursor = {
  /**
   * The direction that the cursor is pointing in.
   */
  direction: 'across' | 'down';

  /**
   * The clue's number.
   */
  clueNumber: number;

  /**
   * The character index within the clue, indexed from 0.
   */
  char: number;
} | null;

/**
 * An action describing how a player has changed the state of their cursor and
 * the board. This action is distinct from UIAction, which only records the key
 * strokes or clicks; this action describes the end result of the UI interaction
 * to the server and the other connected players.
 */
export type PlayerAction = {
  type: 'PLAYER_ACTION';

  /**
   * The UUID of the player making the move.
   */
  playerId: string;

  /**
   * The new location of the user's cursor.
   */
  cursor: Cursor;

  /**
   * Any modifications to entered letters in the grid.
   */
  setLetter?: { i: number; j: number; letter: string };

  reset?: true;
};

export type EffectAction =
  | PlayerAction
  | { type: 'SET_INITIAL_DATA'; state: State; playerId: string }
  | { type: 'RECONNECTING' }
  | { type: 'PLAYER_DISCONNECTED'; playerId: string }
  | { type: 'COMPLETED' };

export type State = {
  /**
   * The position of the connected users' cursors within the board.
   */
  cursors: {
    [uuid: string]: Cursor;
  };

  /**
   * The 2d array of filled-in letters in the crossword. Blank and out-of-bounds
   * letters are represented with an empty string.
   */
  letters: string[][];

  /**
   * The clues of the current crossword.
   */
  clues: CluesData | null;

  /**
   * Is the crossword completed or not. The client cannot derive this, as the
   * answers are not stored client-side.
   */
  isComplete: boolean;
};
