import React from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => createStyles({
    formControl: {
      margin: theme.spacing.unit,
      display: "inline-block"
    },
}));

const LabeledDropdown = ({ label, options, value, onClose=null, onOpen=null, onChange=null, open=null }) => {
  const classes = useStyles();
  return (
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          value={value}
          onChange={onChange}
        >
          {options.map(option => (
            <MenuItem value={option.value} key={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default LabeledDropdown;
