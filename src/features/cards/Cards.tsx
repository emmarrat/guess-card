import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCards} from "./cardsThunks";
import {selectCards, selectFetchingCards} from "./cardsSlice";
import {CircularProgress, Grid} from "@mui/material";
import CardItem from "./components/CardItem";

const Cards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const loading = useAppSelector(selectFetchingCards);

  useEffect( () => {
    dispatch(fetchCards());
  }, [dispatch]);

  console.log(cards);


  return (
    <Grid container justifyContent="center" mt={5} spacing={5}>
      {loading ? <CircularProgress color="inherit" sx={{mt: 5}}/> : cards.map((card) => (
        <Grid key={card.code} item>
          <CardItem card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;