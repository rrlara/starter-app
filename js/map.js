/**
 * Created by renerodriguez on 4/22/15.
 */

var app = angular.module('LeapSpot');

app.controller('MapCtrl', ['$scope','$rootScope', function($scope, $rootScope){

    var map = null;

    function initialize() {
        var myLatlng = new google.maps.LatLng(47.6033068, -122.3077322);
        var mapOptions = {
            zoom: 10,
            center: myLatlng,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

    }

    if (!map){
        initialize();
    }


    var circle ={
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'blue',
        fillOpacity: 1,
        scale: 4.5,
        strokeColor: 'white',
        strokeWeight: 1
    };

    var sightingReports = $rootScope.data.items;

    for(var i = 0, il = sightingReports.length; i < il; i++) {

        var currentSighting = sightingReports[i];

        //geometry
        var latitude = currentSighting.attributes.latitude;
        var longitude = currentSighting.attributes.longitude;

        var latLng = new google.maps.LatLng(latitude, longitude);
        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: latLng,
            icon: circle,
            map: map
        });

    }

    google.maps.event.addListener(marker, 'click', function() {
        //map.setZoom(8);
        //map.setCenter(marker.getPosition());
        console.log("clicked on marker");
    });


    marker.setMap(map);





//    if (map != undefined) { map.remove(); }
//
//    var map = L.map('map', {
//        invalidateSize: true
//        //zoomControl:false
//    }).setView([47.6033068, -122.3077322], 10);
//    var basemapUrl = 'http://{s}.tiles.mapbox.com/v3/spatialdev.map-4o51gab2/{z}/{x}/{y}.png';
//    basemapLayer = L.tileLayer(basemapUrl,{
//        detectRetina: true
//    });
//    basemapLayer.addTo(map);
//
//
//    L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container);
//
//    map.invalidateSize();
//
//    var sightingReports = $rootScope.activeMomentMaker;
//
//    if ($rootScope.activeMomentMaker){
//        redraw();
//    }
//
//    function redraw(){
//        var markers = new L.featureGroup({});
//
//        //for(var i = 0, il = sightingReports.length; i < il; i++) {
//
//            //attributes
//            var currentSighting = sightingReports;
//            var comment = currentSighting.attributes.comment;
////            var scientificName = currentSighting.attributes.scientificName;
////            var kingdom = currentSighting.attributes.type;
//            var timestamp = currentSighting.createdAt;
//            var image = currentSighting.attributes.imageFile._url;
//
//            var altitude = (currentSighting.attributes.altitude)*3.28084;
//
//            //geometry
//            var latitude = currentSighting.attributes.latitude;
//            var longitude = currentSighting.attributes.longitude;
//
//            var truHeading = currentSighting.attributes.trueHeading;
//
//            if (!truHeading) {
//                truHeading = "0"
//            }
//
//            //create a marker based on baseline data attributes
//            var marker = null;
//            // MIT-licensed code by Benjamin Becquet
//            // https://github.com/bbecquet/Leaflet.PolylineDecorator
//            L.RotatedMarker = L.Marker.extend({
//                options: { angle: truHeading },
//                _setPos: function(pos) {
//                    L.Marker.prototype._setPos.call(this, pos);
//                    if (L.DomUtil.TRANSFORM) {
//                        // use the CSS transform rule if available
//                        this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.angle + 'deg)';
//                    } else if (L.Browser.ie) {
//                        // fallback for IE6, IE7, IE8
//                        var rad = this.options.angle * L.LatLng.DEG_TO_RAD,
//                            costheta = Math.cos(rad),
//                            sintheta = Math.sin(rad);
//                        this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
//                        costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
//                    }
//                }
//            });
//            L.rotatedMarker = function(pos, options) {
//                return new L.RotatedMarker(pos, options);
//            };
//
//            marker = L.rotatedMarker(new L.LatLng(latitude, longitude), {
//                icon: L.icon({
//                    iconUrl: 'css/img/marker-copy.png',
//                    iconSize: [114, 114],
//                })
//
//            });
//
//            //var image = '<A class="imageResearchPartner" HREF="' + image + '" TARGET="NEW"><img width="100%" height="" class="imageThumbnail" src="' + image + '" /></A>';
//
////
////            //for defining the html inside the pop up
////        marker.bindPopup(image + "<br/>" + comment + "<br/>" + timestamp + "<br/>" + altitude + "<br/>" + longitude + "," + latitude);
////
//            //add marker to marker group
//            markers.addLayer(marker);
//
////            mapObject.addLayer(marker);
//
//            map.setView(new L.LatLng(latitude, longitude), 14);
//        map.addLayer(markers);
//        }

}]);
