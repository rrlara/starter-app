var app = angular.module('LeapSpot', ['ngMaterial', 'ngMdIcons', 'angularParse']);

app.directive("imageResize", [
  "$parse", function($parse) {
    return {
      link: function(scope, elm, attrs) {
        var imagePercent;
        imagePercent = $parse(attrs.imagePercent)(scope);
        elm.bind("load", function(e) {
          elm.unbind("load"); //Hack to ensure load is called only once
          var canvas, ctx, neededHeight, neededWidth;
          neededHeight = elm[0].naturalHeight * imagePercent / 100;
          neededWidth = elm[0].naturalWidth * imagePercent / 100;
          canvas = document.createElement("canvas");
          canvas.width = neededWidth;
          canvas.height = neededHeight;
          ctx = canvas.getContext("2d");
          ctx.drawImage(elm[0], 0, 0, neededWidth, neededHeight);
          elm.attr('src', canvas.toDataURL("image/jpeg"));
        });
      }
    };
  }
]);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog','$mdMedia', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdMedia){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.closeLeftNav = function(menuId) {
    $mdSidenav(menuId).close();
  };

 	$scope.menu = [
    {
      link : '',
      title: 'washingtondc',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'HawaiiTrip',
      icon: 'dashboard'
    },
      {
      link : '',
      title: 'MomentsForReals',
      icon: 'group'
    },
    {
      link : '',
      title: 'trueHeading',
      icon: 'message'
    },
      {
        link : '',
        title: 'Moment',
        icon: 'message'
      }
  ];

  $scope.expandImage = $mdMedia('min-width: 600px');


  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"><md-item-content flex class="inset"><img src="{{imageClicked[0].attributes.imageFile._url}}" alt="" height="600"></md-item-content></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      //$scope.alert = clickedItem.name + ' clicked!';
    });
  };
  
  //$scope.showAdd = function(ev) {
  //  $mdDialog.show({
  //    controller: DialogController,
  //    template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
  //    targetEvent: ev,
  //  })
  //  .then(function(answer) {
  //    $scope.alert = 'You said the information was "' + answer + '".';
  //  }, function() {
  //    $scope.alert = 'You cancelled the dialog.';
  //  });
  //};
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: 'DialogController',
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <img src="{{Image}}" alt="" height="475"></md-content></md-dialog>',
      targetEvent: ev
    })
        .then(function(answer) {
          $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
  };


}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

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


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
      .accentPalette('orange', {
        'default': '200' // use shade 200 for default, and keep all other shades the same
      });
});