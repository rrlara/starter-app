/**
 * Created by renerodriguez on 4/22/15.
 */

var app = angular.module('LeapSpot');

app.controller('MapCtrl', ['$scope', function($scope, $window){

    if (map != undefined) { map.remove(); }

    console.log($window);


        var map = L.map('map', {
            invalidateSize: true
        }).setView([47.6033068, -122.3077322], 10);
        L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(map);


    L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container);

    map.invalidateSize();

    var mapation = map.getContainer();
    console.log(mapation);


}]);
