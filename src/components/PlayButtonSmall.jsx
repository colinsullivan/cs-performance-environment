import React from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';

import ButtonSmall from './ButtonSmall';

const PlayButtonSmall = ({onClick}) => (
  <ButtonSmall
    onClick={onClick}
    icon={<PlayArrow />}
  />
);

export default PlayButtonSmall;
