/**
 *  @file       EuclideanTouchControl.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from 'react';
import { connect } from 'react-redux';

import { sequencer_update_param } from './actions';
import EuclideanVisualizerRenderer from './EuclideanVisualizerRenderer';

const size = 240;
const styles = {
  container: {
    height: size,
    width: size,
    margin: 'auto'
  }
};

class EuclideanTouchControl extends React.Component {
  constructor (props) {
    super(props);

    this.canvasRef = React.createRef();
    
    this.euclideanVisualizerRenderer = null;

  }
  componentDidMount () {
    this.euclideanVisualizerRenderer = new EuclideanVisualizerRenderer({
      height: styles.container.height,
      width: styles.container.width,
      canvasEl: this.canvasRef.current
    });
    this.euclideanVisualizerRenderer.render(this.props);
  }
  componentDidUpdate (prevProps) {
    if (prevProps.euclideanNumHits !== this.props.euclideanNumHits
    || prevProps.euclideanTotalNumHits !== this.props.euclideanTotalNumHits) {
      this.euclideanVisualizerRenderer.render(this.props);
    }
  }
  render() {
    return (
      <div style={styles.container}>
        <canvas ref={this.canvasRef}></canvas>
      </div>
    );
  }
};
function mapStateToProps (state, ownProps) {
  const {
    sequencers: {
      [ownProps.sequencerId]: {
        euclideanNumHits,
        euclideanTotalNumHits
      }
    }
  } = state;
  return {
    euclideanNumHits,
    euclideanTotalNumHits
  };
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    changeNumHits: (val) => {
      dispatch(sequencer_update_param(
          ownProps.sequencerId,
          'euclideanNumHits',
          val
      ));
    },
    changeTotalNumHits: (val) => {
      dispatch(sequencer_update_param(
          ownProps.sequencerId,
          'euclideanTotalNumHits',
          val
      ));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EuclideanTouchControl);
