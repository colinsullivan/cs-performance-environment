import { useState, useEffect } from "react";


/**
 *  Implements an interface to have a local copy of a value that is updated
 *  whenever value comes in from props but can be set independently, useful
 *  for UI controls that can be modified before propagating their value up to
 *  the parent.
 **/
export default function useLocalValue (value) {
  const [localValue, setLocalValue] = useState(value);

  /**
   *  Updates the local value in case it is different than the value sent
   *  from the parent.
   **/
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return [localValue, setLocalValue];
}
