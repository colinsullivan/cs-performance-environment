import {
  INSTRUMENT_PARAMETER_UPDATED,
  SYNKOPATER_SAVE_PRESET,
  SYNKOPATER_LOAD_PRESET,
  SYNKOPATER_UPDATE_PRESET,
  SYNKOPATER_DELETE_PRESET,
  OCTATRACK_PATTERN_UPDATED,
  SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK,
} from "common/actions/types";
import {
  applyPresetToSynkopaterComponent,
  findPresetForOctatrackPattern,
} from "common/models";
// TODO: Rename these "instruments"
const components = (state = {}, action) => {
  switch (action.type) {
    case INSTRUMENT_PARAMETER_UPDATED:
      const payload = action.payload;
      const instr = state[payload.componentId];
      if (instr.parameters[payload.parameterId] !== payload.newValue) {
        return {
          ...state,
          ...{
            [payload.componentId]: {
              ...instr,
              ...{
                parameters: {
                  ...instr.parameters,
                  ...{
                    [payload.parameterId]: payload.newValue,
                  },
                },
              },
            },
          },
        };
      } else {
        return state;
      }

    case SYNKOPATER_SAVE_PRESET: {
      const { componentId, preset } = action.payload;
      const component = state[componentId];
      return {
        ...state,
        [componentId]: {
          ...component,
          currentPresetId: preset.id,
          presets: component.presets.concat([preset]),
        },
      };
    }

    case SYNKOPATER_LOAD_PRESET: {
      const { componentId, preset } = action.payload;
      const component = {
        ...applyPresetToSynkopaterComponent(state[componentId], preset),
        currentPresetId: preset.id,
      };

      return {
        ...state,
        [componentId]: component,
      };
    }

    case SYNKOPATER_UPDATE_PRESET: {
      const { componentId, updatedPreset } = action.payload;
      const component = state[componentId];
      return {
        ...state,
        [componentId]: {
          ...component,
          presets: component.presets.map((p) => {
            if (p.id === updatedPreset.id) {
              return updatedPreset;
            }
            return p;
          }),
        },
      };
    }

    case SYNKOPATER_DELETE_PRESET: {
      const { componentId, presetId } = action.payload;
      const component = state[componentId];
      return {
        ...state,
        [componentId]: {
          ...component,
          presets: component.presets.filter((p) => p.id !== presetId),
        },
      };
    }

    case OCTATRACK_PATTERN_UPDATED: {
      let newState = state;
      const { programChangeValue } = action.payload;
      for (const componentId of Object.keys(state)) {
        const component = state[componentId];

        const presetForPattern = findPresetForOctatrackPattern(
          programChangeValue,
          component
        );
        if (presetForPattern && component.followOctatrackPattern) {
          newState = {
            ...newState,
            [componentId]: {
              ...applyPresetToSynkopaterComponent(component, presetForPattern),
              currentPresetId: presetForPattern.id,
            },
          };
        }
      }
      return newState;
    }
    case SYNKOPATER_TOGGLE_FOLLOW_OCTATRACK: {
      const { componentId } = action.payload;
      return {
        ...state,
        [componentId]: {
          ...state[componentId],
          followOctatrackPattern: !state[componentId].followOctatrackPattern,
        },
      };
    }

    default:
      return state;
  }
};

export default components;
