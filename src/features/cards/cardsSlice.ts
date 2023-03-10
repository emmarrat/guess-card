import {PlayingCard} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchCards} from "./cardsThunks";

interface CardsState {
  items: PlayingCard[];
  fetching: boolean;
  winningCard: PlayingCard | null;

}

const initialState: CardsState = {
  items: [],
  fetching: false,
  winningCard: null,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchCards.pending, (state) => {
      state.items = []
      state.fetching = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, {payload: cards}) => {
      state.items = cards;
      state.fetching = false;
    });
    builder.addCase(fetchCards.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const cardsReducer = cardsSlice.reducer;

export const selectCards = (state: RootState) => state.cards.items;
export const selectFetchingCards = (state: RootState) => state.cards.fetching;

