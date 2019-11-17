/**
 *  @file       LinkClockController.sc
 *
 *	@desc       A ClockController using a LinkClock, hopefully available
 *  at SuperCollider 3.11 to sync with AbletonLink nodes on a LAN.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

/**
 *  @class        LinkClockController
 *
 *  @classdesc    Just wraps a LinkClock, assuming if we are using Link then
 *  tempo, etc. is being controlled elsewhere.
 */
LinkClockController : Object {
  var <>clock;
    //store;

  *new {
    arg params;

    ^super.new().init(params);
  }

  init {
    arg params;

    clock = LinkClock();
  }
  beats {
    ^clock.beats;
  }
}

