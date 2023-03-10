import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCards} from "./cardsThunks";
import {
  makeCalculation,
  selectBalance,
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
import {selectUser} from "../users/usersSlice";
import {Navigate} from "react-router-dom";

const Cards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const loading = useAppSelector(selectFetchingCards);
  const winningCard = useAppSelector(selectWinningCard);
  const isShowed = useAppSelector(selectIsShowed);
  const message = useAppSelector(selectMessage);
  const gameStarted = useAppSelector(selectIsStarted);
  const user = useAppSelector(selectUser);
  const balance = useAppSelector(selectBalance);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);


  const findCard = (cardCode: string) => {
    dispatch(showCard());
    if (winningCard === 'draw') {
      dispatch(setMessage('No one wins! Both of cards are the same value!'));
    }
    if (cardCode === winningCard) {
      dispatch(setMessage('Congrats! You won!'));
      dispatch(makeCalculation('win'));
    }
    if (cardCode !== winningCard) {
      dispatch(setMessage('You lose'));
      dispatch(makeCalculation('lose'));
    }
  };

  if (!user) {
    return <Navigate to="/login"/>
  }

  let content = (
    <>
      <Grid container flexDirection="column" alignItems="center"
            sx={{boxShadow: '1px 0px 15px 3px #6A6A6A', borderRadius: '9px', padding: '30px 0'}}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
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
      <Grid container flexDirection="column" alignItems="center">
        <Grid item>
          <Typography variant="h6" fontWeight="bold">Your current budget: {balance} $</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" fontWeight="bold" textTransform="uppercase" mt={3}>{isShowed ? message : 'Choose biggest card'}</Typography>
        </Grid>
        <Grid item container justifyContent="center" mt={5} spacing={5}>
          {loading ? <CircularProgress color="inherit" sx={{mt: 5}}/> : cards.map((card) => (
            <Grid key={card.code} item>
              <CardItem card={card} isShowed={isShowed} onCardClick={findCard}/>
            </Grid>
          ))}
        </Grid>
        {isShowed && <Grid item mt={5}>
            <PlayButton/>
        </Grid>}
      </Grid>
    );
  }


  return (content);
};

export default Cards;