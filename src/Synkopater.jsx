/**
 *  @file       Synkopater.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


import * as actions from 'actions';
import { ARP_MODES } from 'reducers';
import SynkopaterPiano from 'components/SynkopaterPiano';
import PlayButtonSmall from 'components/PlayButtonSmall';
import StopButtonSmall from 'components/StopButtonSmall';
import QueueSequencerButton from 'components/QueueSequencerButton';


class Synkopater extends React.Component {
  handleModeChange (e) {
    this.props.changeMode(e.target.value);
  }
  handleFloatSequencerParamChanged = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      this.props.changeSequencerParam(e.target.id, val);
    }
  }
  handleFloatInstrParamChanged = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      this.props.changeInstrumentParam(e.target.id, val);
    }
  }
  render () {

    var activeNotes = [];
    var numberParams = {
      inputProps: {
        step: 0.001,
        min: 0.0
      }
    };

    if (this.props.sequencer.event) {
      activeNotes.push(this.props.sequencer.event.midinote);
    }

    return (
      <div className="row">
        <div className="col-12">
          <SynkopaterPiano
            sequencerId={this.props.sequencerId}
            keyBaseWidth={1.5}
          />
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-2">
              <QueueSequencerButton
                sequencerId={this.props.sequencerId}
                playButtonComponent={PlayButtonSmall}
                stopButtonComponent={StopButtonSmall}
              />
            </div>
            <div className="col-2">
							<Select
								native
								value={this.props.sequencer.arpMode}
								onChange={this.handleModeChange.bind(this)}
							>
                {Object.keys(ARP_MODES).map((arpMode) => {
                  return <option key={arpMode} value={arpMode}>{arpMode}</option>;
                })};
							</Select>
            </div>
            <div className="col-1">
              <TextField
                id="dur"
                label="dur"
                value={this.props.sequencer.dur}
                onChange={this.handleFloatSequencerParamChanged}
                type="number"
                margin="normal"
                InputProps={numberParams}
              />
            </div>
            <div className="col-1">
              <TextField
                id="offset"
                label="offset"
                value={this.props.sequencer.offset}
                onChange={this.handleFloatSequencerParamChanged}
                type="number"
                margin="normal"
                InputProps={numberParams}
              />
            </div>
            <div className="col-1">
              <TextField
                id="stretch"
                label="stretch"
                value={this.props.sequencer.stretch}
                onChange={this.handleFloatSequencerParamChanged}
                type="number"
                margin="normal"
                InputProps={numberParams}
              />
            </div>
            <div className="col-1">
              <TextField
                id="legato"
                label="legato"
                value={this.props.sequencer.legato}
                onChange={this.handleFloatSequencerParamChanged}
                type="number"
                margin="normal"
                InputProps={numberParams}
              />
            </div>
            <div className="col-1">
              <TextField
                id="delayFactor"
                label="delayFactor"
                value={this.props.parameters.delayFactor}
                onChange={this.props.changeInstrumentParam}
                type="number"
                margin="normal"
                InputProps={numberParams}
              />
            </div>
            <div className="col-1">
              <TextField
                id="euclideanNumHits"
                label="euclideanNumHits"
                value={this.props.sequencer.euclideanNumHits}
                onChange={this.handleFloatSequencerParamChanged}
                type="number"
                margin="normal"
                InputProps={numberParams}
              />
            </div>
            <div className="col-1">
              <TextField
                id="euclideanTotalNumHits"
                label="euclideanTotalNumHits"
                value={this.props.sequencer.euclideanTotalNumHits}
                onChange={this.handleFloatSequencerParamChanged}
                type="number"
                margin="normal"
                InputProps={numberParams}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state, ownProps) {
  return {
    sequencer: state.sequencers[ownProps.sequencerId],
    parameters: state.components[ownProps.componentId].parameters
  };
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    removeNote: (note) => {
      dispatch(
        actions.synkopater_arp_remove_note(
          ownProps.sequencerId,
          note
        )
      )
    },
    addNote: (note) => {
      dispatch(
        actions.synkopater_arp_add_note(
          ownProps.sequencerId,
          note
        )
      );
    },
    changeMode: (mode) => {
      dispatch(
        actions.synkopater_arp_change_mode(
          ownProps.sequencerId,
          mode
        )
      );
    },
    changeSequencerParam: (param, val) => {
      dispatch(
        actions.sequencer_update_param(
          ownProps.sequencerId,
          param,
          val
        )
      );
    },
    changeInstrumentParam: (param, val) => {
      dispatch(
        actions.instrument_parameter_updated(
          ownProps.componentId,
          param,
          val
        )
      );
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Synkopater);
