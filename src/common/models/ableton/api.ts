export interface AbletonSession {
  linkEnabled: boolean;
  isPlaying: boolean;
  tempo: number;
}

export interface AbletonState {
  session: AbletonSession; 
}
