import React from 'react';
import {Card, CardMedia} from "@mui/material";
import {PlayingCard} from '../../../types';

interface Props {
  card: PlayingCard;
}

const CardItem: React.FC<Props> = ({card}) => {
  return (
    <Card sx={{width: '225px'}}>
      <CardMedia
        component="img"
        image={card.image}
        alt={card.value + ' ' + card.suit}
        sx={{height: '100%'}}
      />
    </Card>
  );
};

export default CardItem;