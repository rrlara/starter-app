/**
 * Created by renerodriguez on 4/22/15.
 */


app.controller('CameraCtrl', function($scope, $rootScope, $mdDialog, $timeout){


    $rootScope.thumbnail = {
        dataUrl: 'adsfas'
    };

    //$scope.comment = {};
    //$scope.imageFile = {};

    $scope.fileReaderSupported = window.FileReader != null;
    $scope.photoChanged = function(files){
        //console.log(files);

        //$scope.imageFile = files[0];

        if (files != null) {
            var file = files[0];

            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                $timeout(function() {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $timeout(function(){
                            $rootScope.thumbnail.dataUrl = e.target.result;
                            $scope.showCameraPreview();

                            //$scope.imageFile = e;
                        });
                    }
                });
            }
        }
    };


    $scope.showCameraPreview = function(ev) {
        $mdDialog.show({
            controller: '',
            template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding">' +
            '<img id="myImg" height="200" width="200" image-resize image-percent="50"  ng-src="' + $rootScope.thumbnail.dataUrl + '"/>' +
            '<form name="userForm"> <md-input-container flex> <label>Biography</label> <textarea ng-model="comment" columns="1" md-maxlength="150"></textarea> ' +
            '</md-input-container> </form> </md-content> <div class="md-actions" layout="row" ng-controller="UploadCtrl"> <span flex></span> ' +
            '<md-button ng-click="cancel()"> Cancel </md-button> ' +
            '<md-button ng-click="answer()" ng-disabled={{activeLocation}} class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: ev,
            onComplete: getImage
        })
            .then(function() {
                console.log("then mdDialog");
            }, function() {
                console.log("function mdDialog");
            });
    };

    function getImage(){
        var imageDoc = document.getElementById('myImg');
        $rootScope.imageFile = imageDoc.src;

        $rootScope.comment = $rootScope.comment;
    }




});
