import React from 'react';
import { withStyles  } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

const styles = () => ({
  button: {
    margin: 0,
    height: 64,
    width: 64
  },
});


const TouchButton = ({icon, onClick, classes}) => (
  <IconButton
    onClick={onClick}
    className={classes.button}
    variant="outlined"
  >
		{icon}
	</IconButton>  
);

export default withStyles(styles)(TouchButton);
