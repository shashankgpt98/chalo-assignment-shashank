"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCrossIconsToRoute = void 0;
exports.addSignsToRoute = addSignsToRoute;
var web_sdk_maps_1 = __importDefault(require("@tomtom-international/web-sdk-maps"));
function addSignsToRoute(routeCoordinates, map, status) {
    var icon = status === "Active" ? 'src/assets/location-2955.svg' : 'src/assets/inactive.svg';
    routeCoordinates.forEach(function (coordinate) {
        var signElement = createSignElement(icon);
        new web_sdk_maps_1.default.Marker({ element: signElement })
            .setLngLat(coordinate)
            .addTo(map);
    });
}
function createSignElement(icon) {
    var sign = document.createElement("div");
    sign.style.width = "20px";
    sign.style.height = "20px";
    sign.style.backgroundImage = "url(".concat(icon, ")");
    sign.style.backgroundSize = "contain";
    sign.style.backgroundRepeat = "no-repeat";
    return sign;
}
var addCrossIconsToRoute = function (stops, map) {
    var crossIcon = 'src/assets/inactive-svgrepo-com.svg';
    for (var i = 0; i < stops.length - 1; i++) {
        var startStop = stops[i];
        var endStop = stops[i + 1];
        var midLongitude = (parseFloat(startStop.longitude) + parseFloat(endStop.longitude)) / 2;
        var midLatitude = (parseFloat(startStop.latitude) + parseFloat(endStop.latitude)) / 2;
        var markerElement = createMarkerElement(crossIcon);
        new web_sdk_maps_1.default.Marker({ element: markerElement, anchor: 'center' })
            .setLngLat([midLongitude, midLatitude])
            .addTo(map);
    }
};
exports.addCrossIconsToRoute = addCrossIconsToRoute;
var createMarkerElement = function (icon) {
    var markerDiv = document.createElement('div');
    markerDiv.style.backgroundImage = "url(".concat(icon, ")");
    markerDiv.style.width = '25px';
    markerDiv.style.height = '25px';
    markerDiv.style.backgroundSize = 'contain';
    markerDiv.style.backgroundRepeat = 'no-repeat';
    return markerDiv;
};
