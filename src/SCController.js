/**
 *  @file       SCController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import sc from 'supercolliderjs';

const EXTERNAL_SC = process.env.EXTERNAL_SC;

class SCController {
  boot() {
    
    return new Promise((resolve, reject) => {
      if (EXTERNAL_SC) {
        resolve();
      } else {
        console.log("Booting SuperCollider...");
        var sclangInstance = null;
        var sclangOptions = {
          debug: process.env.NODE_ENV == "development"
        };
        return sc.lang.boot(sclangOptions).then((sclang) => {
          console.log("sclang booted.");
          return sclang.interpret(`
MIDIClient.init;
API.mountDuplexOSC();
s.options.inDevice = "JackRouter";
s.options.outDevice = "JackRouter";

   s.waitForBoot({
      var performanceEnvironment;
      performanceEnvironment = CSPerformanceEnvironment.new();
   });
          `).then(resolve);
          

        }).catch((err) => {
          console.log("ERROR while booting SC");
          console.log("err");
          console.log(err);
        });
      }
      
    });
  }
}

export default SCController;
