/**
 * Created by renerodriguez on 4/22/15.
 */

//var app = angular.module('leapspot');

app.controller('DialogController', function($scope, $rootScope, $mdSidenav, $mdBottomSheet, $mdDialog, parsePersistence, parseQuery){




    console.log("imageClicked", $rootScope.imageClicked);

    $scope.Image = $rootScope.imageClicked[0].attributes.imageFile._url;





});
