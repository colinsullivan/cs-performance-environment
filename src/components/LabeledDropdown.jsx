import { createStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      margin: 0,
      display: "inline-block",
    },
    labeledDropdownSelect: {
      fontSize: "12px",
      padding: 0,
    },
    dropdownIcon: {
      width: "12px",
    },
    dropdownInput: {
      width: "1px",
    },
  })
);

//interface MenuOption {

//}

//interface LabeledDropdownProps {
  //label: string,
  //options,
  //value,
  //onClose: () => void,
  //onOpen: () => void,
  //onChange: () => void,
  //open = false,
//}

const noop = ((e) => {}); // eslint-disable-line

const LabeledDropdown = ({
  label = "",
  options,
  value,
  onClose = noop,
  onOpen = noop,
  onChange = noop,
  open = false,
}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      {label !== "" ? <InputLabel>{label}</InputLabel> : null}
      <Select
        classes={{
          root: classes.labeledDropdownSelect,
          icon: classes.dropdownIcon,
          nativeInput: classes.dropdownInput,
        }}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        value={value}
        onChange={onChange}
        autoWidth={false}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LabeledDropdown;
