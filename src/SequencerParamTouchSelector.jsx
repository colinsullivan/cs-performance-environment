/**
 *  @file       SequencerParamTouchSelector.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Hammer from 'react-hammerjs';
import { DIRECTION_UP, DIRECTION_DOWN } from 'hammerjs';
import * as _ from 'lodash';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { turquoiseLight } from './colors';
//import Button from '@material-ui/core/Button';

import { sequencer_update_param } from './actions';

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
    width: '48px',
    height: '48px',
    backgroundColor: `#${turquoiseLight.toString(16)}`,
    display: 'inline-block'
  }
});


class SequencerParamTouchSelector extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
      panning: false,
      panAmount: 0
    };
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleChange = event => {
    this.props.changeSequencerParam(event.target.value);
  };

  handlePanStart = e => {
    this.setState({
      panning: true,
      panAmount: 0,
      open: true
    });
  };

  handlePanEnd = e => {
    this.setState({
      panning: false,
      open: false
    });
  };

  getCurrentValueIndex = () => {
    return _.findIndex(
      this.props.options,
      opt => opt.value === this.props.value
    );
  };

  handlePan = e => {
    const panCallbackAmount = 5;
    const valueChangeThreshold = 5 * 15;
    let panAmount = this.state.panAmount;
    switch (e.direction) {
      case DIRECTION_UP:
        panAmount -= panCallbackAmount;

        if (panAmount < -1.0 * valueChangeThreshold) {
          this.setState({
            panAmount: 0
          });
          const currentIndex = this.getCurrentValueIndex();
          const newIndex = Math.max(currentIndex - 1, 0);
          this.props.changeSequencerParam(this.props.options[newIndex].value);
        } else {
          this.setState({
            panAmount
          });
        }
        break;

      case DIRECTION_DOWN:
        panAmount += panCallbackAmount;
        if (panAmount > valueChangeThreshold) {
          this.setState({
            panAmount: 0
          });
          const currentIndex = this.getCurrentValueIndex();
          const newIndex = Math.min(
            this.props.options.length - 1,
            currentIndex + 1
          );
          this.props.changeSequencerParam(this.props.options[newIndex].value);
        } else {
          this.setState({
            panAmount
          });
        }
        break;
      
      default:
        break;
    }

  }

  render() {
    const { classes, sequencerId, param, options, value } = this.props;

    const hammerOptions = {
      touchAction: 'compute',
      recognizers: {
        pan: {
          threshold: 1
        }
      }
    };

    return (
      <div>
        <Hammer
          options={hammerOptions}
          onPan={this.handlePan}
          onPanCancel={this.handlePanCancel}
          onPanEnd={this.handlePanEnd}
          onPanStart={this.handlePanStart}
        >
          <div className={classes.touchAreaContainer}>
          </div>
        </Hammer>
        <FormControl className={classes.formControl}>
          <InputLabel>{param}</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={value}
            onChange={this.handleChange}
            inputProps={{
              name: `sequencer_${sequencerId}_${param}`
            }}
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
        //<Button className={classes.button} onClick={this.handleOpen}>
          //Open the select
        //</Button>

function mapStateToProps (state, ownProps) {
  return {
    value: state.sequencers[ownProps.sequencerId][ownProps.param]
  };
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    changeSequencerParam: (val) => {
      dispatch(
        sequencer_update_param(
          ownProps.sequencerId,
          ownProps.param,
          val
        )
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SequencerParamTouchSelector));

