'use strict';

/* Magic Mirror
 * Module: voicecontrol
 *
 * By Alex Yaknin 
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const spawn = require('child_process').spawn;

module.exports = NodeHelper.create({
    start: function () {
        this.started = false;
        
    },

    socketNotificationReceived: function(notification, payload) {
		if (notification === "CONNECT") {
	this.preRecognition(payload);
			return;
	}

                },


preRecognition :function(config) {
 
        
        this.started = true;
        var self = this;
        // Initilize the keyword spotter
  
 var params1 = ['./modules/voicecontrol/snowboy/kws.py','pi.pmdl','0.4']; //, modelFile1, modelFile2];


       

      
        var kwsProcess1 = spawn('python', params1, { detached: false });


        // Handel messages from python script
        kwsProcess1.stderr.on('data', function (data) {
            var message = data.toString();
            if (message.startsWith('INFO')) {
                
              
	kwsProcess1.kill();





     


        var models = config.models;

        var kwsSensitivity = 0.3;
       
        // Initilize the keyword spotter
        var params = ['./modules/voicecontrol/snowboy/kws-multiple.py']; //, modelFile1, modelFile2];


        models.forEach(function(model) {
            params.push(model.file);
        }, this);

        //var kwsProcess = spawn('python', ['./speech-osx/kws-multiple.py', modelFile1, modelFile2], { detached: false });
        var kwsProcess = spawn('python', params, { detached: false });
        // Handel messages from python script
        kwsProcess.stderr.on('data', function (data) {
            var message = data.toString();
            if (message.startsWith('INFO')) {
		kwsProcess.kill();
	
                var items = message.split(':');
                var index = parseInt(items[2].split(' ')[1]);
                var model = models[index - 1];
 
      
	 self.sendSocketNotification("KEYWORD_SPOTTED", model);
		

		
	

            } else {
               // console.error(message);
            }
        })
        kwsProcess.stdout.on('data', function (data) {
           // console.log(data.toString());
	

        })
    
 setTimeout(function() {kwsProcess.kill();
setTimeout(function(){
  self.sendSocketNotification("AGAIN");

}, 1000);

}, 5000);



} else {
             
            }
        })
        kwsProcess1.stdout.on('data', function (data) {
           // console.log(data.toString());

		
        })


}



  
});
