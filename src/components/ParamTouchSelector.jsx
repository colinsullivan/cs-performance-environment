import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as _ from 'lodash';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { turquoiseTransparentColor, getRGBAString } from 'constants/colors';
import TouchPanParameter from 'components/TouchPanParameter';

const styles = theme => ({
  button: {
    //display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    display: 'inline-block'
    //minWidth: 120,
  },
  touchAreaContainer: {
    backgroundColor: getRGBAString(turquoiseTransparentColor),
    display: 'inline-block'
  }
});

class ParamTouchSelector extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  getCurrentValueIndex = () => {
    return _.findIndex(
      this.props.options,
      opt => opt.value === this.props.value
    );
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handlePanStart = () => {
    this.setState({
      open: true
    });
  };

  handlePanEnd = () => {
    this.setState({
      open: false
    });
  };
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  handleTouchParamUp = () => {
    const currentIndex = this.getCurrentValueIndex();
    const newIndex = Math.max(currentIndex - 1, 0);
    this.props.onChange(this.props.options[newIndex].value);
  };

  handleTouchParamDown = () => {
    const currentIndex = this.getCurrentValueIndex();
    const newIndex = Math.min(
      this.props.options.length - 1,
      currentIndex + 1
    );
    this.props.onChange(this.props.options[newIndex].value);
  };


  render() {
    const { classes, param, options, value } = this.props;

    return (
      <div>
        <div className={classes.touchAreaContainer}>
          <TouchPanParameter
            panStart={this.handlePanStart}
            tickUp={this.handleTouchParamUp}
            tickDown={this.handleTouchParamDown}
            panEnd={this.handlePanEnd}
          />
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel>{param}</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={value}
            onChange={this.handleChange}
          >
            {options.map(option => (
                <MenuItem
                  value={option.value}
                  key={option.label}
                >{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
};

export default withStyles(styles)(ParamTouchSelector);
