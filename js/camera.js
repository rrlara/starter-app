/**
 * Created by renerodriguez on 4/22/15.
 */


app.controller('CameraCtrl', function($scope, $rootScope, $mdDialog, $timeout){


    $scope.thumbnail = {
        dataUrl: 'adsfas'
    };

    $scope.comment = {};
    $scope.imageFile = {};

    $scope.fileReaderSupported = window.FileReader != null;
    $scope.photoChanged = function(files){
        console.log(files);

        $scope.imageFile = files[0];

        if (files != null) {
            var file = files[0];

            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                $timeout(function() {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $timeout(function(){
                            $scope.thumbnail.dataUrl = e.target.result;
                            $scope.showCameraPreview();
                        });
                    }
                });
            }
        }
    };


    $scope.showCameraPreview = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding">' +
            '<img id="myImg" height="200" width="200" image-resize image-percent="10"  ng-src="' + $scope.thumbnail.dataUrl + '"/>' +
            '<form name="userForm"> <md-input-container flex> <label>Biography</label> <textarea ng-model="comment" columns="1" md-maxlength="150"></textarea> ' +
            '</md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> ' +
            '<md-button ng-click="cancel()"> Cancel </md-button> ' +
            '<md-button ng-click="answer()" class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: ev
        })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();

        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            uploadData($scope.comment, $mdDialog);
            //$mdDialog.hide(answer);
            console.log($scope.comment);

        };
    };

    function uploadData (comment, closeDialog){

        var userDataEntry = {};
            //create photo 1 as a parse file
            var parseFile1 = null;
            if ($scope.imageFile) {
                parseFile1 = new Parse.File("photo.jpg", $scope.imageFile);
            }



            userDataEntry.altitude = '';
            userDataEntry.latitude = ($scope.latitude).toString();
            userDataEntry.longitude = ($scope.longitude).toString();
            userDataEntry.comment = comment;
            userDataEntry.imageFile = parseFile1;
            userDataEntry.trueHeading = '';
            userDataEntry.thumbnail = parseFile1;

        saveToParse(userDataEntry, closeDialog);
    }

    function saveToParse(obj,closeDialog){
        var GameScore = Parse.Object.extend("washingtondc");
        var gameScore = new GameScore();

        gameScore.set("altitude", obj.altitude);
        gameScore.set("latitude", obj.latitude);
        gameScore.set("longitude", obj.longitude);
        gameScore.set("comment", obj.comment);
        gameScore.set("imageFile", obj.imageFile);
        gameScore.set("trueHeading", obj.trueHeading);
        gameScore.set("thumbnail", obj.thumbnail);

        gameScore.save(null, {
            success: function(gameScore) {
                // Execute any logic that should take place after the object is saved.
                //alert('New object created with objectId: ' + gameScore.id);

                closeDialog.hide();
            },
            error: function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }

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

        $scope.latitude = crd.latitude;
        $scope.longitude = crd.longitude;

    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);



});
