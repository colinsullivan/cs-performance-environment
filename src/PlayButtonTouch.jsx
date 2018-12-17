import React from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';

import TouchButton from './TouchButton';


const PlayButtonTouch = ({onClick}) => (
  <TouchButton
    onClick={onClick}
    icon={<PlayArrow />}
  />
);

export default PlayButtonTouch;
