/**
 *  @class        PerformanceComponentFactory
 *
 *  @classdesc    Watches state store for new components and creates them.
 **/
PerformanceComponentFactory : Object {
  classvar <>instance;
  // reference to our state store
  var store,
    bufManager,
    // our list of components (PerformanceComponent instances / subclasses)
    components;

  *new {
    ^super.new.init();
  }

  *getInstance {
    if (this.instance == nil, {
      this.instance = PerformanceComponentFactory.new();
    });
    ^this.instance;
  }

  setStore {
    arg theStore;
    store = theStore;
    this.handleStateChange();
    store.subscribe({
      this.handleStateChange();
    });
  }

  setBufManager {
    arg theBufManager;
    bufManager = theBufManager;
  }

  init {
    components = IdentityDictionary.new();
  }

  handleStateChange {
    var state = store.getState();
    
    if ((state.components != nil), {
      // for each sequencer in state
      state.components.keysValuesDo({
        arg componentId, componentState;
        var componentClass = componentState['type'].asSymbol().asClass();

        // if it doesn't exist in our list
        if (components[componentId] == nil, {
          // instantiate it
          components[componentId] = componentClass.new((
            store: store,
            componentId: componentId,
            bufManager: bufManager
          ));
        });

      });
    });
  }
}
