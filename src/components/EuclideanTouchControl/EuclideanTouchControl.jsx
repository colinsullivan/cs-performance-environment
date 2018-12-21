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

import { sequencer_update_param } from 'actions';
import EuclideanTouchParameter from 'components/EuclideanTouchControl/EuclideanTouchParameter';
import EuclideanVisualizerRenderer from './EuclideanVisualizerRenderer';

const size = 150;
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  innerNumberContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-24px',
    marginLeft: '-24px'
  },
  outerNumberContainer: {
    display: 'inline-block',
    height: '100%',
    flex: '1 0 auto',
    textAlign: 'left',
    paddingLeft: '1em'
  },
  visualizationCanvasContainer: {
    height: size,
    width: size,
    display: 'inline-block',
    flex: `0 0 ${size}px`,
    position: 'relative'
  },
  visualizationCanvas: {
    height: size,
    width: size,
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
      size,
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
    const {
      euclideanNumHits,
      euclideanTotalNumHits
    } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.visualizationCanvasContainer}>
          <div style={styles.innerNumberContainer}>
            <EuclideanTouchParameter
              value={euclideanNumHits}
              onChange={this.props.changeNumHits}
            />
          </div>
          <canvas style={styles.visualizationCanvas} ref={this.canvasRef}></canvas>
        </div>
        <EuclideanTouchParameter
          value={euclideanTotalNumHits}
          onChange={this.props.changeTotalNumHits}
        />
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
