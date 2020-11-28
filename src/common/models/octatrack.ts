import { OctatrackState } from './types';

export const createOctatrackState = () : OctatrackState => ({
  currentPatternProgramChangeValue: null
});

export const getPatternValue = (state: OctatrackState) => state.currentPatternProgramChangeValue;
