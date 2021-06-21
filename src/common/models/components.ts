import { create_synk_delay_component } from "common/models";
// TODO: Rename these "instruments"
export const createInitialComponentsState = () => ({
  synkopaterA: create_synk_delay_component("synkopaterA", 28, 2),
  synkopaterB: create_synk_delay_component("synkopaterB", 32, 2),
});
