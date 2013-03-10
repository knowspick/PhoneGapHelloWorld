
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.getElementById("geoBut").addEventListener('click', this.getGeoLoc, false);
		document.getElementById("scanBut").addEventListener('click', this.scan, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	
	getGeoLoc: function () {
		var element = document.getElementById('geolocationtxt');
		element.innerHTML = 'Getting location';
		navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onGeoError);
	},
	
	// onSuccess Geolocation
    //
    onGeoSuccess: function (position) {
        var element = document.getElementById('geolocationtxt');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
    },

    // onError Callback receives a PositionError object
    //
    onGeoError: function (error) {
		var element = document.getElementById('geolocationtxt');
		element.innerHTML = 'Error';	
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    },
	
	scan: function() {
        console.log('scanning');
        try {
            window.plugins.barcodeScanner.scan(function(args) {
                var str = "Scanner result: \n" +
                    "text: " + args.text + "\n" +
                    "format: " + args.format + "\n" +
                    "cancelled: " + args.cancelled + "\n";
                /*
                if (args.format == "QR_CODE") {
                    window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                }
                */
                document.getElementById("info").innerHTML = str;
        });
        } catch (ex) {
            document.getElementById("info").innerHTML = "err: " + ex.message;
        }
    }
	
};
