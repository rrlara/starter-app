/**
 * Created by renerodriguez on 4/22/15.
 */

var app = angular.module('LeapSpot');

app.controller('MapCtrl', ['$scope','$rootScope', function($scope, $rootScope, $window){

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

    var sightingReports = $rootScope.imageClicked;

    var markers = new L.featureGroup({});


    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    for(var i = 0, il = sightingReports.length; i < il; i++) {

        //attributes
        var currentSighting = sightingReports[i];
        var comment = currentSighting.attributes.comment;
//            var scientificName = currentSighting.attributes.scientificName;
//            var kingdom = currentSighting.attributes.type;
        var timestamp = currentSighting.createdAt;
        var image = currentSighting.attributes.imageFile._url;

        var altitude = (currentSighting.attributes.altitude)*3.28084;

        //geometry
        var latitude = currentSighting.attributes.latitude;
        var longitude = currentSighting.attributes.longitude;

        var truHeading = currentSighting.attributes.trueHeading;

        if (!truHeading) {
            truHeading = "0"
        }

        //create a marker based on baseline data attributes
        var marker = null;
        // MIT-licensed code by Benjamin Becquet
        // https://github.com/bbecquet/Leaflet.PolylineDecorator
        L.RotatedMarker = L.Marker.extend({
            options: { angle: truHeading },
            _setPos: function(pos) {
                L.Marker.prototype._setPos.call(this, pos);
                if (L.DomUtil.TRANSFORM) {
                    // use the CSS transform rule if available
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.angle + 'deg)';
                } else if (L.Browser.ie) {
                    // fallback for IE6, IE7, IE8
                    var rad = this.options.angle * L.LatLng.DEG_TO_RAD,
                        costheta = Math.cos(rad),
                        sintheta = Math.sin(rad);
                    this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
                    costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
                }
            }
        });
        L.rotatedMarker = function(pos, options) {
            return new L.RotatedMarker(pos, options);
        };

        marker = L.rotatedMarker(new L.LatLng(latitude, longitude), {
            icon: L.icon({
                iconUrl: 'css/img/view@2x.png',
                iconSize: [30, 30],
            })

        });

        //var image = '<A class="imageResearchPartner" HREF="' + image + '" TARGET="NEW"><img width="100%" height="" class="imageThumbnail" src="' + image + '" /></A>';

//
//            //for defining the html inside the pop up
//        marker.bindPopup(image + "<br/>" + comment + "<br/>" + timestamp + "<br/>" + altitude + "<br/>" + longitude + "," + latitude);
//
        //add marker to marker group
        markers.addLayer(marker);

//            mapObject.addLayer(marker);

        map.setView(new L.LatLng(latitude, longitude), 12);
    }

    map.addLayer(markers);

    //map.fitBounds(markers);

}]);
