"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var web_sdk_maps_1 = __importDefault(require("@tomtom-international/web-sdk-maps"));
require("@tomtom-international/web-sdk-maps/dist/maps.css");
var helper_1 = require("./helper");
var MapView = function (_a) {
    var routes = _a.routes;
    var mapElement = (0, react_1.useRef)(null);
    function getRandomColor() {
        var randomColor = Math.floor(Math.random() * 0x888888).toString(16);
        return "#".concat(randomColor.padStart(6, '0'));
    }
    (0, react_1.useEffect)(function () {
        var map = web_sdk_maps_1.default.map({
            key: 'Lylux5YQKHcAq5WHyE4YAVAuha70uFXS',
            container: mapElement.current,
            center: [78.9629, 22.5937],
            zoom: 4,
        });
        map.on('load', function () {
            routes.forEach(function (route) {
                var coordinates = route.stops.map(function (stop) { return [stop.longitude, stop.latitude]; });
                var geoJson = {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: coordinates,
                    },
                    properties: {},
                };
                var color = getRandomColor();
                map.addLayer({
                    id: route.routeId,
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geoJson,
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round',
                    },
                    paint: {
                        'line-color': color,
                        'line-width': 3,
                        'line-dasharray': [2, 2]
                    },
                });
                (0, helper_1.addSignsToRoute)(coordinates, map, route.status);
                if (route.status === 'Inactive') {
                    (0, helper_1.addCrossIconsToRoute)(route.stops, map);
                }
            });
        });
        return function () { return map.remove(); };
    }, [routes]);
    return (0, jsx_runtime_1.jsx)("div", { ref: mapElement, style: { height: '800px', width: '100%' } });
};
exports.default = MapView;
