/**
 *  @file       EuclideanTouchControl.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React, { useMemo } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { sequencer_update_param } from "common/actions";
import { sequencersSelector } from "common/selectors";
import EuclideanTouchParameter from "components/EuclideanTouchControl/EuclideanTouchParameter";
import EuclideanVisualizer from "./EuclideanVisualizer";

import useLocalValue from "hooks/useLocalValue";

const containerStyles = {
    display: "flex",
    alignItems: "center",
  };

const size = 150;
const styles = {
  container: {
    ...containerStyles
  },
  containerDisabled: {
    ...containerStyles,
    pointerEvents: "none",
    opacity: 0.2
  },
  innerNumberContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-24px",
    marginLeft: "-24px",
  },
  outerNumberContainer: {
    display: "inline-block",
    height: "100%",
    flex: "1 0 auto",
    textAlign: "left",
    paddingLeft: "1em",
  },
  visualizationCanvasContainer: {
    height: size,
    width: size,
    display: "inline-block",
    flex: `0 0 ${size}px`,
    position: "relative",
  },
};

const createEuclideanTouchControlSelector = (sequencerId, isSecond) =>
  createSelector(sequencersSelector, (sequencers) => {
    const {
      [sequencerId]: {
        euclideanNumHits,
        euclideanTotalNumHits,
        secondEuclieanNumHits,
        secondEuclieanTotalNumHits,
        euclidBounceEnabled
      },
    } = sequencers;
    return isSecond
      ? {
          euclideanNumHits: secondEuclieanNumHits,
          euclideanTotalNumHits: secondEuclieanTotalNumHits,
          euclidBounceEnabled
        }
      : {
          euclideanNumHits,
          euclideanTotalNumHits,
          euclidBounceEnabled
        };
  });

const EuclideanTouchControl = (props) => {
  const { sequencerId, isSecond=false } = props;

  const dispatch = useDispatch();

  const euclideanTouchControlSelector = useMemo(
    () => createEuclideanTouchControlSelector(sequencerId, isSecond),
    [sequencerId]
  );

  const { euclideanNumHits, euclideanTotalNumHits, euclidBounceEnabled } = useSelector(
    euclideanTouchControlSelector
  );

  const isDisabled = isSecond && !euclidBounceEnabled;

  const changeNumHits = (val) =>
    dispatch(sequencer_update_param(sequencerId, isSecond ? "secondEuclieanNumHits" : "euclideanNumHits", val));
  const changeTotalNumHits = (val) =>
    dispatch(sequencer_update_param(sequencerId, isSecond ? "secondEuclieanTotalNumHits" : "euclideanTotalNumHits", val));

  const [localNumHits, setLocalNumHits] = useLocalValue(euclideanNumHits);
  const [localTotalNumHits, setLocalTotalNumHits] = useLocalValue(
    euclideanTotalNumHits
  );

  return (
    <div style={isDisabled ? styles.containerDisabled : styles.container}>
      <div style={styles.visualizationCanvasContainer}>
        <div style={styles.innerNumberContainer}>
          <EuclideanTouchParameter
            min={1}
            max={euclideanTotalNumHits}
            value={localNumHits}
            onChange={setLocalNumHits}
            onPanEnd={() => changeNumHits(localNumHits)}
          />
        </div>
        <EuclideanVisualizer
          size={size}
          euclideanTotalNumHits={localTotalNumHits}
          euclideanNumHits={localNumHits}
        />
      </div>
      <EuclideanTouchParameter
        value={localTotalNumHits}
        min={euclideanNumHits}
        onChange={setLocalTotalNumHits}
        onPanEnd={() => changeTotalNumHits(localTotalNumHits)}
      />
    </div>
  );
};

export default EuclideanTouchControl;
