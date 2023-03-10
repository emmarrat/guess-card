import {createAsyncThunk} from "@reduxjs/toolkit";
import {PlayingCard, CardData} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCards = createAsyncThunk<PlayingCard[]>(
  'cards/fetchCards',
  async () => {
    const response = await axiosApi.get<CardData>('new/draw/?count=2');

    const responseData = response.data;

    const newData: PlayingCard[] = responseData.cards.map((res) => {
      return {
        code: res.code,
        image: res.image,
        suit: res.suit,
        value: res.value
      }
    });

    return newData;
  }
);