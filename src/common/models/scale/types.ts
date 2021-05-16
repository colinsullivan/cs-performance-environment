export type KeyTonic = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type KeyQuality = "major" | "minor";

export interface Key {
  tonic: KeyTonic;
  quality: KeyQuality;
}

export type ScaleNotes = string[];

export interface ScaleState {
  key: Key | null;
  scale: ScaleNotes
}
