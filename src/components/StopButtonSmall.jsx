import React from 'react';
import Pause from '@material-ui/icons/Pause';

import ButtonSmall from './ButtonSmall';

const StopButtonSmall = ({onClick}) => (
  <ButtonSmall
    onClick={onClick}
    icon={<Pause />}
  />
);

export default StopButtonSmall;
