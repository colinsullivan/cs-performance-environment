import { OctatrackState } from 'common/models/types';
import { createOctatrackState } from 'common/models';
import { AllActionTypes, OCTATRACK_PATTERN_UPDATED } from 'common/actions/types';

export default function octatrack(state: OctatrackState = createOctatrackState(), action : AllActionTypes) : OctatrackState {
  switch (action.type) {
    case OCTATRACK_PATTERN_UPDATED:
      return {
        ...state,
        currentPatternProgramChangeValue: action.payload.programChangeValue
      };
    
    default:
      return state;
  }
}
