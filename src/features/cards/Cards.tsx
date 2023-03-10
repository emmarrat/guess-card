import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCards} from "./cardsThunks";
import {
  selectCards,
  selectFetchingCards,
  selectIsShowed, selectIsStarted,
  selectMessage,
  selectWinningCard,
  setMessage,
  showCard
} from "./cardsSlice";
import {CircularProgress, Grid, Typography} from "@mui/material";
import CardItem from "./components/CardItem";
import PlayButton from "./components/PlayButton";

const Cards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const loading = useAppSelector(selectFetchingCards);
  const winningCard = useAppSelector(selectWinningCard);
  const isShowed = useAppSelector(selectIsShowed);
  const message = useAppSelector(selectMessage);
  const gameStarted = useAppSelector(selectIsStarted);

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
    return dispatch(setMessage('You lose'));
  };

  let content = (
    <>
      <Grid container flexDirection="column" alignItems="center"  sx={{boxShadow: '1px 0px 15px 3px #6A6A6A', borderRadius: '9px', padding: '30px 0'}}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" >
          Welcome to the Bridge Game!
        </Typography>
        <Typography variant="h6" textAlign="center" mt={5}>
          <b>Some rules: </b>
          <br/>
          You have to guess biggest card
          <br/>
          You have 10,000$ budget, each win will multiply the budget in two and from each loss, 2000$ will be reduced
        </Typography>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase" textAlign="center" my={3}>
          Press start and game will begin
        </Typography>
        <PlayButton/>
      </Grid>
    </>
  );

  if (gameStarted) {
    content = (
      <>
        <Grid>
          {isShowed && (
            <Typography variant="h4" fontWeight="bold" textAlign="center" mt={5}>{message}</Typography>)}
        </Grid>
        <Grid container justifyContent="center" mt={5} spacing={5}>
          {loading ? <CircularProgress color="inherit" sx={{mt: 5}}/> : cards.map((card) => (
            <Grid key={card.code} item>
              <CardItem card={card} isShowed={isShowed} onCardClick={findCard}/>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }


  return (content);
};

export default Cards;