import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";

const size = 48;
const styles = () => ({
  button: {
    margin: 0,
    padding: 0,
  },
  label: {
    height: size,
    width: size
  }
});

const LabelContainer = styled.div`
  font-size: 18px;
  > label {
    margin: 0;
    padding: 0 12px 0 2px;
  }
`;

const TouchButton = ({ icon, onClick, classes, labelText = null }) => (
    <IconButton onTouchEnd={onClick} className={classes.button} variant="outlined">
      {icon}
      {labelText ? (
        <LabelContainer>
          <label>{labelText}</label>
        </LabelContainer>
      ) : null}
    </IconButton>
);

export default withStyles(styles)(TouchButton);
