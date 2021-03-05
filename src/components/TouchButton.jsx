import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";

const size = 36;
const styles = () => ({
  button: {
    margin: 0,
    padding: 0,
    //height: size,
    //width: size,
  },
  label: {
    height: size,
    width: size
  }
});

const ButtonContainer = styled.div`
  display: inline-block;
`;

const LabelContainer = styled.div`
  font-size: 18px;
  > label {
    margin: 0;
    padding: 0 12px 0 2px;
  }
`;

const TouchButton = ({ icon, onClick, classes, labelUnder = null }) => (
    <IconButton onClick={onClick} className={classes.button} variant="outlined">
      {icon}
      {labelUnder ? (
        <LabelContainer>
          <label>{labelUnder}</label>
        </LabelContainer>
      ) : null}
    </IconButton>
);

export default withStyles(styles)(TouchButton);
