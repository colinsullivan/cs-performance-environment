import {createInitialComponentsState} from "./components";
import {createCrowDevice} from "./crow";
import createInitialHoldMenus from "./menus/menus";
import {createInitialSequencersState} from "./sequencers";

export const createInitialState = () => ({
  sequencers: createInitialSequencersState(),
  components: createInitialComponentsState(),
  holdMenus: createInitialHoldMenus(),
  crow: [
    createCrowDevice('0x003600473538510b34393631', 'A', "synkopaterA"),
    createCrowDevice('0x0019003f3538510c34393631', 'B', "synkopaterB"),
    //createCrowDevice('0x005000283238510d36353235', 'C')
  ]
});
