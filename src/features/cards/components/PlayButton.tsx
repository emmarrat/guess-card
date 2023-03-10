import React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeCard, selectIsShowed, selectIsStarted, startGame } from '../cardsSlice';
import { fetchCards } from '../cardsThunks';

const PlayButton = () => {
  const dispatch = useAppDispatch();
  const isShowed = useAppSelector(selectIsShowed);
  const isStarted = useAppSelector(selectIsStarted);

  const startTheGame = () => {
    dispatch(startGame());
  };

  const playAgain = async () => {
    await dispatch(closeCard());
    await dispatch(fetchCards());
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={isShowed && isStarted ? playAgain : startTheGame}
        sx={{ width: '200px' }}
      >
        {isShowed ? 'PLay again' : 'Play'}
      </Button>
    </>
  );
};

export default PlayButton;
