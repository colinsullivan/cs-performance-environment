/**
 *  @file       LaunchControlXLDispatcher.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import MidiControllerDispatcher from './MidiControllerDispatcher';

class LaunchControlXLDispatcher extends MidiControllerDispatcher {
  getInputPortName () {
    return 'Launch Control XL';
  }
  initMappings () {
    return {
      0: {
        13: 'knu1', 14: 'knu2', 15: 'knu3', 16: 'knu4', 17: 'knu5', 18: 'knu6', 19: 'knu7', 20: 'knu8',
        29: 'knm1', 30: 'knm2', 31: 'knm3', 32: 'knm4', 33: 'knm5', 34: 'knm6', 35: 'knm7', 36: 'knm8',
        49: 'knl1', 50: 'knl2', 51: 'knl5', 52: 'knl4', 55: 'knl5', 54: 'knl6', 55: 'knl7', 56: 'knl8',
        77: 'sl1', 78: 'sl2', 79: 'sl3', 80: 'sl4', 81: 'sl5', 82: 'sl6', 83: 'sl7', 84: 'sl8'
      }
      
    }
  }
}

export default LaunchControlXLDispatcher;
