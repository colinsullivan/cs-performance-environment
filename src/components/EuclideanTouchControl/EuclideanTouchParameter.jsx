/**
 *  @file       EuclideanTouchParameter.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from "react";

import TouchPanParameter from "components/TouchPanParameter";

const styles = {
  containerStyle: {},
  numberContainer: {
    height: "48px",
    width: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const EuclideanTouchParameter = props => {
  const { onChange, value, onPanEnd } = props;

  const handleTouchParamUp = () => onChange(Math.max(0, value - 1));

  const handleTouchParamDown = () => onChange(value + 1);

  return (
    <div style={styles.containerStyle}>
      <TouchPanParameter
        tickUp={handleTouchParamUp}
        tickDown={handleTouchParamDown}
        panEnd={onPanEnd}
      >
        <div style={styles.numberContainer}>
          <span>{value}</span>
        </div>
      </TouchPanParameter>
    </div>
  );
};

export default EuclideanTouchParameter;
