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
    //        //deviceOrientationHandler(dir);
    //        return dir;
    //    }, false);
    //
    //};
    //
    $scope.$watch($scope.getWindowOrientation, function (newValue, oldValue) {
        $scope.degrees = newValue;
        console.log($scope.degrees);
    }, true);

    //angular.element($window).bind('orientationchange', function () {
    //    $scope.$apply();
    //});

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
            $scope.deviceOrientationHandler(tiltLR, tiltFB, dir);
        }, false);
    } else {
        alert("Not supported on your device or browser.  Sorry.");
    }


    //function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    //
    //    $scope.degrees = dir;
    //
    //    //// Apply the transform to the image
    //    //var face = document.getElementById("cover");
    //    //face.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
    //    //face.style.MozTransform = "rotate(" + tiltLR + "deg)";
    //    //face.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
    //
    //}

    $scope.deviceOrientationHandler = function (tiltLR, tiltFB, dir) {
        return dir;
    }


});
