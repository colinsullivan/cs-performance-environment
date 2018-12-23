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

import ParamTouchSelector from 'components/ParamTouchSelector';
import { sequencer_update_param } from 'common/actions';

const SequencerParamTouchSelector = ({changeSequencerParam, ...props}) => (
  <ParamTouchSelector
    onChange={changeSequencerParam}
    {...props}
  />
);

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
)(SequencerParamTouchSelector);

