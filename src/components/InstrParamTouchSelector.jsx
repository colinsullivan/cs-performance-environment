/**
 *  @file       InstrParamTouchSelector.jsx
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
import { instrument_parameter_updated } from 'common/actions';

const InstrParamTouchSelector = ({changeInstrumentParam, ...props}) => (
  <ParamTouchSelector
    onChange={changeInstrumentParam}
    {...props}
  />
);

function mapStateToProps (state, ownProps) {
  return {
    value: state.components[ownProps.componentId].parameters[ownProps.param]
  };
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    changeInstrumentParam: (val) => {
      dispatch(
        instrument_parameter_updated(
          ownProps.componentId,
          ownProps.param,
          val
        )
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrParamTouchSelector);
