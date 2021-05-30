/**
 *  @file       EuclideanTouchParameter.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/
import TouchPanParameter from "components/TouchPanParameter";

const EuclideanTouchParameter = (props) => {
  const { onChange, value, onPanEnd, min, max } = props;

  const constrainValue = (newVal) => {
    if (min) {
      newVal = Math.max(min, newVal);
    }

    if (max) {
      newVal = Math.min(max, newVal);
    }

    return newVal;
  };

  const handleTouchParamUp = () => onChange(constrainValue(value - 1));
  const handleTouchParamDown = () => onChange(constrainValue(value + 1));

  return (
    <TouchPanParameter
      tickUp={handleTouchParamUp}
      tickDown={handleTouchParamDown}
      panEnd={onPanEnd}
      labelText={value}
    />
  );
};

export default EuclideanTouchParameter;
