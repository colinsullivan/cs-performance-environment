import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonSmall = ({icon, onClick}) => (
  <Button mini onClick={onClick}>
    {icon}
  </Button>
);

export default ButtonSmall;
