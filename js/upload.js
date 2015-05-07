/**
 * Created by renerodriguez on 4/22/15.
 */


app.controller('UploadCtrl', function($scope, $rootScope, $mdDialog, $timeout){

    $rootScope.activeLocation = "false";

    $scope.comment = '';
    $scope.imageFile = {};

    var image = $rootScope.thumbnail.dataUrl;

    //$scope.imageFile = image.replace(/data:image\/jpeg;base64,/, "");


    $scope.hide = function() {
        $mdDialog.hide();

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function() {
        uploadData($scope.comment, $mdDialog);
        //$mdDialog.hide(answer);
        console.log($scope.comment);

    };


    function uploadData (comment, closeDialog){

        var userDataEntry = {};
            //create photo 1 as a parse file
            var parseFile1 = null;
            if ($scope.imageFile) {
                //parseFile1 = new Parse.File("photo.jpg", $scope.imageFile);
                parseFile1 = new Parse.File("photo.jpg", {base64: image}, "image/jpg");
            }



            userDataEntry.altitude = '';
            userDataEntry.latitude = ($rootScope.latitude).toString();
            userDataEntry.longitude = ($rootScope.longitude).toString();
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

                $rootScope.activeLocation = "false";
                closeDialog.hide();
            },
            error: function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }



});
