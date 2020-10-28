import React from 'react';
import pluralize from 'pluralize';
import styled from 'styled-components';

const NumberDisplayContainer = styled.div`
  color: #999;
`;

const NumberDisplay = ({ number, label="" }) => {
  return (
    <NumberDisplayContainer>{Math.floor(number * 100) / 100} {pluralize(label, number)}</NumberDisplayContainer>
  );
};

export default NumberDisplay;
