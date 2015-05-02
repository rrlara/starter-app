/**
 * Created by renerodriguez on 4/22/15.
 */

//var app = angular.module('leapspot');
Parse.initialize('f978idlmBlmLY2CnQwovpPtQaFwvALWhDlf6RE53', 'yFJzzjG5oasySFmbNPumsxCaUofcolddTUIDQAKK');

app.controller('ContentCtrl', function($scope, $rootScope, $mdSidenav, $mdBottomSheet, $mdDialog, parsePersistence, parseQuery){

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.addToImageClicked = function (item){
        $rootScope.imageClicked = [];
        $rootScope.imageClicked.push(item);
        //console.log("imageClicked", $rootScope.imageClicked);
    }

    $rootScope.data = {
        items: [],
        total: 0
    }

    $scope.loadingMoments = false;

    // retrieve a list of 1000 items from server and the total number of items
    $scope.find = function() {

        $scope.loadingMoments = true;

        var query = parseQuery.new('HawaiiTrip');

        query.limit(1000);
        query.descending("createAt");

        parseQuery.find(query)
            .then(function(results) {
                $scope.loadingMoments = false;
                    $scope.data.items = results;
                //console.log(results);
                // nested promise :)
            }, function(error) {
                $scope.loadingMoments = false;
                    alert(JSON.stringify(error));
            });

    }
    function initialLoadOfMoments(){
        $scope.find();
    }
    initialLoadOfMoments();

    $rootScope.getTable = function(className) {

        //$rootScope.data = {
        //    items: [],
        //    total: 0
        //}

        $scope.loadingMoments = true;

        var query = parseQuery.new(className);

        query.limit(1000);
        query.descending("createAt");

        parseQuery.find(query)
            .then(function(results) {
                $scope.loadingMoments = false;
                $scope.data.items = results;
            }, function(error) {
                $scope.loadingMoments = false;
                alert(JSON.stringify(error));
            });


    };



    $rootScope.getLatLngs = function (item){

        $rootScope.clickedItem = item.attributes;

    }


    $scope.todos = [
        {
            face : './img/profile.jpg',
            what: 'Brunch this weekend?',
            who: 'Rene Rodriguez',
            when: '3:08PM',
            notes: "GIS-Developer/Film-maker"
        }]



    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('This is an alert title')
                .content('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };



});
