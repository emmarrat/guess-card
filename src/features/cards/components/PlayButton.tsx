import React from 'react';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectIsShowed, selectIsStarted, startGame} from "../cardsSlice";



const PlayButton = () => {
  const dispatch = useAppDispatch();
  const isShowed = useAppSelector(selectIsShowed);
  const isStarted = useAppSelector(selectIsStarted);

  const startTheGame = () => {
    dispatch(startGame());
  };


  return (
    <>
      <Button
        variant="contained"
        onClick={ startTheGame}
        sx={{width: '200px'}}
      >
        {isShowed ? 'PLay again' : 'Play'}
      </Button>
    </>
  );
};

export default PlayButton;