/**
 * Created by renerodriguez on 4/22/15.
 */


app.controller('PhoneStateCtrl', function($scope, $rootScope, $element, $window){

    //$scope.getWindowOrientation = function () {
    //    //return $window.DeviceOrientationEvent;
    //    $window.addEventListener('deviceorientation', function (eventData) {
    //
    //        // alpha is the compass direction the device is facing in degrees
    //        var dir = eventData.alpha;
    //
    //        // call our orientation event handler
    //        deviceOrientationHandler(dir);
    //    }, false);
    //};
    //
    //$scope.$watch($scope.getWindowOrientation, function (newValue, oldValue) {
    //    $scope.degrees = newValue;
    //    conso
    //}, true);
    //
    //angular.element($window).bind('orientationchange', function () {
    //    $scope.$apply();
    //});

    $scope.getWindowOrientation = function () {

        if ($window.DeviceOrientationEvent) {

            // Listen for the deviceorientation event and handle the raw data
            $window.addEventListener('deviceorientation', function (eventData) {
                // gamma is the left-to-right tilt in degrees, where right is positive
                var tiltLR = eventData.gamma;

                // beta is the front-to-back tilt in degrees, where front is positive
                var tiltFB = eventData.beta;

                // alpha is the compass direction the device is facing in degrees
                var dir = eventData.alpha;

                // call our orientation event handler
                //deviceOrientationHandler(tiltLR, tiltFB, dir);
                return dir;
            }, false);
        } else {
            alert("Not supported on your device or browser.  Sorry.");
        }
    }


    function deviceOrientationHandler(tiltLR, tiltFB, dir) {

        $scope.degrees = dir;

    }

    $scope.$watch($scope.getWindowOrientation, function (newValue, oldValue) {
            $scope.degrees = newValue;
            console.log('$scope.degrees', $scope.degrees);
        }, false);


});
