import React from "react";
import { withStyles } from "@material-ui/core/styles";
import * as _ from "lodash";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { turquoiseTransparentColor, getRGBAString } from "constants/colors";
import TouchPanParameter from "components/TouchPanParameter";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    display: "inline-block"
  },
  touchAreaContainer: {
    backgroundColor: getRGBAString(turquoiseTransparentColor),
    display: "inline-block"
  }
});

/**
 *  @class        ParamTouchSelector
 *
 *  @classdesc    Implements a specific touch menu interaction for a single
 *  parameter.  The component is composed of a dropdown as well as a
 *  TouchPanParameter region.  When selecting from the dropdown, the value is
 *  propagated to the parent immediately but while using the TouchPanParameter,
 *  the value is only sent once the pan gesture stops.
 **/
class ParamTouchSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Whether the select is open
      open: false,
      // A local copy of the value state, changes during panning before
      // propagating choice upwards.
      localValue: props.value
    };
  }
  /**
   *  Updates the local value in case it is different than the value sent
   *  from the parent.  This path is used when the option is selected directly
   *  from the dropdown menu because the `localValue` is not used.
   **/
  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({
        localValue: value
      });
    }
  }

  /**
   *  A helper method to find the index of the current value in our list
   *  of options.
   **/
  getCurrentValueIndex = () => {
    return _.findIndex(
      this.props.options,
      opt => opt.value === this.state.localValue
    );
  };

  /**
   *  When the dropdown menu is closed.
   **/
  handleMenuClosed = () => {
    this.setState({ open: false });
  };

  /**
   *  When the dropdown menu is opened.
   **/
  handleOpen = () => {
    this.setState({ open: true });
  };

  /**
   *  When option is selected directly from the dropdown menu.
   **/
  handleMenuSelected = event => {
    this.props.onChange(event.target.value);
  };

  /**
   *  When panning starts on the TouchPanParameter, opens the dropdown menu.
   **/
  handlePanStart = () => {
    this.setState({
      open: true
    });
  };

  /**
   *  When panning stops on the TouchPanParameter, close the dropdown menu and
   *  propagate the current value to parent component (actually sets the value).
   **/
  handlePanEnd = () => {
    this.setState({
      open: false
    });
    this.props.onChange(this.state.localValue);
  };

  // While panning, the local value is changed, the value isn't set until
  // panning guesture stops.
  handleTouchParamUp = () => {
    const currentIndex = this.getCurrentValueIndex();
    const newIndex = Math.max(currentIndex - 1, 0);
    this.setState({
      localValue: this.props.options[newIndex].value
    });
  };

  handleTouchParamDown = () => {
    const currentIndex = this.getCurrentValueIndex();
    const newIndex = Math.min(this.props.options.length - 1, currentIndex + 1);
    this.setState({
      localValue: this.props.options[newIndex].value
    });
  };

  render() {
    const { classes, param, options, value } = this.props;
    const { open, localValue } = this.state;

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
            open={open}
            onClose={this.handleMenuClosed}
            onOpen={this.handleOpen}
            value={localValue}
            onChange={this.handleMenuSelected}
          >
            {options.map(option => (
              <MenuItem value={option.value} key={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(ParamTouchSelector);
