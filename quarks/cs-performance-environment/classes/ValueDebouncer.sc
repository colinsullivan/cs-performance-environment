/**
 *  @file       ValueDebouncer.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

ValueDebouncer : Object {
  var value,
    lastChangeTime,
    debounceDuration;
  *new {
    arg params;
    ^super.new.init(params);
  }
  init {
    arg params;
    debounceDuration = params['debounceDuration'];
  }
  value_ {
    arg inValue;
    value = inValue;
    lastChangeTime = Date.getDate().rawSeconds;
  }
  debounce {
    arg debounceAction;
    var durationSinceLastChange = Date.getDate().rawSeconds - lastChangeTime;
    {
      if (durationSinceLastChange > debounceDuration, {
        debounceAction.value();
      });
    }.defer(debounceDuration);
  }
}
