import React from "react";
import EuclideanVisualizerRenderer from "./EuclideanVisualizerRenderer";

class EuclideanVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.euclideanVisualizerRenderer = null;
  }
  componentDidMount() {
    const { size } = this.props;
    this.euclideanVisualizerRenderer = new EuclideanVisualizerRenderer({
      size,
      canvasEl: this.canvasRef.current
    });
    this.euclideanVisualizerRenderer.render(this.props);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.euclideanNumHits !== this.props.euclideanNumHits ||
      prevProps.euclideanTotalNumHits !== this.props.euclideanTotalNumHits
    ) {
      this.euclideanVisualizerRenderer.render(this.props);
    }
  }
  render() {
    const { size } = this.props;
    const containerStyle = {
      height: size,
      width: size
    };
    return <canvas style={containerStyle} ref={this.canvasRef}></canvas>;
  }
}

export default EuclideanVisualizer;
