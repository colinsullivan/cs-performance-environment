import React from 'react';
import Pause from '@material-ui/icons/Pause';

import TouchButton from './TouchButton';

const StopButtonTouch = ({onClick}) => (
  <TouchButton
    onClick={onClick}
    icon={<Pause />}
  />
);

export default StopButtonTouch;
