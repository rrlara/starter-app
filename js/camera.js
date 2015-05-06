/**
 * Created by renerodriguez on 4/22/15.
 */


app.controller('CameraCtrl', function($scope, $rootScope, $mdDialog, $timeout){


    $scope.thumbnail = {
        dataUrl: 'adsfas'
    };
    $scope.fileReaderSupported = window.FileReader != null;
    $scope.photoChanged = function(files){
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
            template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <img height="200" width="250" ng-src="' + $scope.thumbnail.dataUrl + '"/><form name="userForm"> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
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
            $mdDialog.hide(answer);
        };
    };


});
