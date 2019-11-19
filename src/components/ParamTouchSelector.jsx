import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as _ from "lodash";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { turquoiseTransparentColor, getRGBAString } from "constants/colors";
import TouchPanParameter from "components/TouchPanParameter";

import useLocalValue from "hooks/useLocalValue";

const useStyles = makeStyles((theme) => createStyles({
    button: {
      marginTop: theme.spacing.unit * 2
    },
    formControl: {
      margin: theme.spacing.unit,
      display: "inline-block"
    },
    touchAreaContainer: {
      backgroundColor: getRGBAString(turquoiseTransparentColor),
      display: "inline-block"
    }
}));

/**
 *  @class        ParamTouchSelector
 *
 *  @classdesc    Implements a specific touch menu interaction for a single
 *  parameter.  The component is composed of a dropdown as well as a
 *  TouchPanParameter region.  When selecting from the dropdown, the value is
 *  propagated to the parent immediately but while using the TouchPanParameter,
 *  the value is only sent once the pan gesture stops.
 **/
const ParamTouchSelector = function (props) {
  const { param, options, value, onChange } = props;

  const classes = useStyles(props);

  // Whether the select is open
  const [open, setOpen] = useState(false);

  // A local copy of the value state, changes during panning before
  // propagating choice upwards.
  const [localValue, setLocalValue] = useLocalValue(value);

  /**
   *  A helper method to find the index of the current value in our list
   *  of options.
   **/
  const getCurrentValueIndex = () =>
    _.findIndex(options, opt => opt.value === localValue);

  /**
   *  When the dropdown menu is closed.
   **/
  const handleMenuClosed = () => setOpen(false);

  /**
   *  When the dropdown menu is opened.
   **/
  const handleMenuOpened = () => setOpen(true);

  /**
   *  When option is selected directly from the dropdown menu.
   **/
  const handleMenuSelected = event => onChange(event.target.value);

  /**
   *  When panning stops on the TouchPanParameter, close the dropdown menu and
   *  propagate the current value to parent component (actually sets the value).
   **/
  const handlePanEnd = () => {
    setOpen(false);
    onChange(localValue);
  };

  // While panning, the local value is changed, the value isn't set until
  // panning guesture stops.
  const handleTouchParamUp = () => {
    const currentIndex = getCurrentValueIndex();
    const newIndex = Math.max(currentIndex - 1, 0);
    setLocalValue(options[newIndex].value);
  };

  const handleTouchParamDown = () => {
    const currentIndex = getCurrentValueIndex();
    const newIndex = Math.min(options.length - 1, currentIndex + 1);
    setLocalValue(options[newIndex].value);
  };

  return (
    <div>
      <div className={classes.touchAreaContainer}>
        <TouchPanParameter
          panStart={handleMenuOpened}
          tickUp={handleTouchParamUp}
          tickDown={handleTouchParamDown}
          panEnd={handlePanEnd}
        />
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel>{param}</InputLabel>
        <Select
          open={open}
          onClose={handleMenuClosed}
          onOpen={handleMenuOpened}
          value={localValue}
          onChange={handleMenuSelected}
        >
          {options.map(option => (
            <MenuItem value={option.value} key={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ParamTouchSelector;
