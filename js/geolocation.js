/**
 * Created by renerodriguez on 4/22/15.
 */


app.controller('GeoLocationCtrl', function($scope, $rootScope, $mdDialog, $timeout){

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');

        $rootScope.latitude = crd.latitude;
        $rootScope.longitude = crd.longitude;

        $rootScope.activeLocation = "true";

    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);



});
