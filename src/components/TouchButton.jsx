import React from 'react';
import { withStyles  } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    height: 48,
    width: 48
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
