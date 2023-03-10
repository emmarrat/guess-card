import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCards} from "./cardsThunks";
import {
  selectCards,
  selectFetchingCards,
  selectIsShowed,
  selectMessage,
  selectWinningCard,
  setMessage,
  showCard
} from "./cardsSlice";
import {CircularProgress, Grid, Typography} from "@mui/material";
import CardItem from "./components/CardItem";

const Cards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const loading = useAppSelector(selectFetchingCards);
  const winningCard = useAppSelector(selectWinningCard);
  const isShowed = useAppSelector(selectIsShowed);
  const message = useAppSelector(selectMessage);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);


  const findCard = (cardCode: string) => {
    dispatch(showCard());
    if (winningCard === 'draw') {
      return dispatch(setMessage('No one wins! Both of cards are the same value!'));
    }
    if (cardCode === winningCard) {
      return dispatch(setMessage('Congrats! You won!'));
    }
    return dispatch(setMessage('You lose :(  Try one more type'));
  };


  return (
    <>
      <Grid container justifyContent="center" mt={5} spacing={5}>
        {loading ? <CircularProgress color="inherit" sx={{mt: 5}}/> : cards.map((card) => (
          <Grid key={card.code} item>
            <CardItem card={card} isShowed={isShowed} onCardClick={findCard}/>
          </Grid>
        ))}
      </Grid>
      <Grid>
        {isShowed && (
          <Typography variant="h4" textAlign="center" mt={5}>{message}</Typography>)}
      </Grid>

    </>
  );
};

export default Cards;