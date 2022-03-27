import max from "max-api"

class MaxDispatcher {
  constructor() {
    //super();

    max.addHandlers({
      test: () => {
        console.log("test");
      }
    });
  }

  setStore() {
    console.log("hello");
  }
}

export default MaxDispatcher;
