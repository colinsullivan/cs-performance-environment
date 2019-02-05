# Colin's Music Performance Environment
This is the top-level codebase for my performative music tools.  In this repository:

* An Electron app
    * acts as a central state server
    * spawns a SuperCollider process
    * dispatches state changes down to the replica state store in SuperCollider
    * serves a touch-screen GUI on a HTTP endpoint
* A SuperCollider quark containing various instruments that either take input directly from a MIDI controller or react to state changes in the store

This environment pairs with an Ableton Live project to handle routing and currently makes use of a development build of SuperCollider to get Ableton Link synchronization.

## Dependencies
Notable dependencies:

* [cs-supercollider-lib](https://github.com/colinsullivan/cs-supercollider-lib): Some of the SuperCollider instruments themselves, intended for use in other projects (such as embedded in installations).
* [supercollider-redux](https://github.com/colinsullivan/supercollider-redux): This framework enables the replica state store in SuperCollider.
* [Create React App](https://github.com/facebookincubator/create-react-app) and [Electron](https://electronjs.org/).

## Example
Here's how it is all fitting together at this time:

![routing diagram](https://raw.githubusercontent.com/colinsullivan/cs-performance-environment/master/docs/routing_overview.png "routing diagram")

## More
[blog post](https://colin-sullivan.net/main/2019/performance-environment)
[video demo 2019/02](https://vimeo.com/315357104)
