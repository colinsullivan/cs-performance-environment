import { KeyTonic, KeyQuality } from "common/models/scale";

export interface KeyMenuOption {
  label: string;
  value: string;
  tonic: KeyTonic;
  quality: KeyQuality;
}

export interface KeyMenuOptionLookup {
  [k: string]: KeyMenuOption
}
