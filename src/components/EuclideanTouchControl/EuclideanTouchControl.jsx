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

const size = 150;
const styles = {
  container: {
    display: "flex",
    alignItems: "center"
  },
  innerNumberContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-24px",
    marginLeft: "-24px"
  },
  outerNumberContainer: {
    display: "inline-block",
    height: "100%",
    flex: "1 0 auto",
    textAlign: "left",
    paddingLeft: "1em"
  },
  visualizationCanvasContainer: {
    height: size,
    width: size,
    display: "inline-block",
    flex: `0 0 ${size}px`,
    position: "relative"
  }
};

const createEuclideanTouchControlSelector = sequencerId =>
  createSelector(sequencersSelector, sequencers => {
    const {
      [sequencerId]: { euclideanNumHits, euclideanTotalNumHits }
    } = sequencers;
    return {
      euclideanNumHits,
      euclideanTotalNumHits
    };
  });

const EuclideanTouchControl = props => {
  const { sequencerId } = props;

  const dispatch = useDispatch();

  const euclideanTouchControlSelector = useMemo(
    () => createEuclideanTouchControlSelector(sequencerId),
    [sequencerId]
  );

  const { euclideanNumHits, euclideanTotalNumHits } = useSelector(
    euclideanTouchControlSelector
  );

  const changeNumHits = val =>
    dispatch(sequencer_update_param(sequencerId, "euclideanNumHits", val));
  const changeTotalNumHits = val =>
    dispatch(sequencer_update_param(sequencerId, "euclideanTotalNumHits", val));

  const [localNumHits, setLocalNumHits] = useLocalValue(euclideanNumHits);
  const [localTotalNumHits, setLocalTotalNumHits] = useLocalValue(euclideanTotalNumHits);

  return (
    <div style={styles.container}>
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
