type HandlerFunc = (...any) => void;
const maxApi = {
  addHandlers: (handlers: Record<string, HandlerFunc>) => {
    return;
  },
  setDict: async (name: string, data: Record<string, any>) => {
    return;
  },
  outlet: async (message: string) => {
    return;
  }
};

export default maxApi;
