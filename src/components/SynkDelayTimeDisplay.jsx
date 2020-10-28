import React from "react";
import { connect } from "react-redux";

import NumberDisplay from "components/NumberDisplay";

const SynkDelayTimeDisplay = ({ delaySecs }) => {
  return delaySecs ? <NumberDisplay number={delaySecs} label="second" /> : null;
};

const mapStateToProps = (state, ownProps) => ({
  delaySecs: state.sequencers[ownProps.sequencerId].delaySecs,
});

export default connect(mapStateToProps)(SynkDelayTimeDisplay);
