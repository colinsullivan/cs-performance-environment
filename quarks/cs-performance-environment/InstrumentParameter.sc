/**
 *  @file       InstrumentParameter.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

/**
 *  @class        InstrumentParameter
 *
 *  @classdesc    Parameter for an instrument, takes state from StateStore.
 */
InstrumentParameter : Object {
  var store, // the StateStore
    statePath, // the dot.path to the state to bind to
    statePathArray,
    numberEditor, // the NumberEditor (or subclass) instance
    componentId, // the component to which this parameter is connected
    parameterId, // the id of this parameter
    inputDebouncer;

  *new {
    arg params;
    ^super.new.init(params);
  }

  getStateFromStore {
    var state = store.getState();

    statePathArray.do({
      arg key;
      state = state[key.asSymbol()];
    });

    ^state;
  }

  init {
    arg params;

    store = params['store'];
    statePath = params['statePath'];
    statePathArray = statePath.split($.);
    numberEditor = params['numberEditor'];
    componentId = params['componentId'];
    parameterId = params['parameterId'];
    inputDebouncer = ValueDebouncer.new((
      debounceDuration: 1.0
    ));
    
    store.subscribe({
      var state = this.getStateFromStore();
      if (state != numberEditor.value, {
        numberEditor.set(this.getStateFromStore());
      });
    });

  }
}
