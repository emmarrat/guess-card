import React, {useState} from 'react';
import {Card, CardMedia, Typography} from "@mui/material";
import {PlayingCard} from '../../../types';
import backOfCard from '../../../assets/images/backOfCard.jpg';
import {useAppSelector} from "../../../app/hooks";
import {selectWinningCard} from "../cardsSlice";


interface Props {
  card: PlayingCard;
  isShowed: boolean;
  onCardClick: (cardCode: string) => void;
}

const CardItem: React.FC<Props> = ({card, isShowed, onCardClick}) => {
const winningCard = useAppSelector(selectWinningCard);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onCardClick(card.code);
  };
  return (
    <>
    <Card  sx={{width: '225px', boxShadow: isClicked ? '1px 0px 15px 3px #6A6A6A' : undefined}} onClick={handleClick}>
      <CardMedia
        component="img"
        image={isShowed ? card.image : backOfCard}
        alt={isShowed ? card.value + ' ' + card.suit : 'back of the card'}
        sx={{height: '100%'}}
      />
    </Card>
      {winningCard === card.code && isShowed && <Typography textAlign="center" fontWeight="bold" mt={2}>This card is bigger!</Typography>}

    </>
  );
};

export default CardItem;