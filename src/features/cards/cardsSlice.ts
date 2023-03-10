import {PlayingCard} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchCards} from "./cardsThunks";

interface CardsState {
  items: PlayingCard[];
  fetching: boolean;
  winningCard: string;
  isShowed: boolean;
  message: string;
}

const initialState: CardsState = {
  items: [],
  fetching: false,
  winningCard: '',
  isShowed: false,
  message: '',
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    showCard: state => {
      state.isShowed = true;
    },
    closeCard: state => {
      state.isShowed = false;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCards.pending, (state) => {
      state.items = []
      state.fetching = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, {payload: cards}) => {
      state.items = cards;
      state.fetching = false;

      const values = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'JACK': 11,
        'QUEEN': 12,
        'KING': 13,
        'ACE': 14,
      };

      const [card1, card2] = cards;

      const value1 = values[card1.value];
      const value2 = values[card2.value];

      state.items = [card1, card2];
      if (value1 > value2) {
        state.winningCard = card1.code;
      } else if (value1 < value2) {
        state.winningCard = card2.code;
      } else {
        state.winningCard = 'draw';
      }
    });
    builder.addCase(fetchCards.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const cardsReducer = cardsSlice.reducer;

export const {showCard, closeCard, setMessage} = cardsSlice.actions;


export const selectCards = (state: RootState) => state.cards.items;
export const selectFetchingCards = (state: RootState) => state.cards.fetching;
export const selectWinningCard = (state: RootState) => state.cards.winningCard;
export const selectIsShowed = (state: RootState) => state.cards.isShowed;
export const selectMessage = (state: RootState) => state.cards.message;
