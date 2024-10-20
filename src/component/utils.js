"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutesFromLocalStorage = exports.createRouteInLocalStorage = exports.exportRoutesAsCSV = void 0;
var exportRoutesAsCSV = function (routes) {
    var csvRows = __spreadArray([
        [
            "Route ID",
            "Route Name",
            "Direction",
            "Status",
            "Stop Name",
            "Latitude",
            "Longitude",
        ]
    ], routes.flatMap(function (route) {
        return route.stops.map(function (stop) { return [
            route.routeId,
            route.name,
            route.direction,
            route.status,
            stop.stopName,
            stop.latitude,
            stop.longitude,
        ]; });
    }), true);
    var csvContent = csvRows.map(function (e) { return e.join(","); }).join("\n");
    var blob = new Blob([csvContent], { type: "text/csv" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "routes.csv";
    link.click();
};
exports.exportRoutesAsCSV = exportRoutesAsCSV;
var createRouteInLocalStorage = function (key, routes) {
    localStorage.setItem(key, JSON.stringify(routes));
};
exports.createRouteInLocalStorage = createRouteInLocalStorage;
var getRoutesFromLocalStorage = function (key) {
    var storedRoutes = localStorage.getItem(key);
    return storedRoutes ? JSON.parse(storedRoutes) : [];
};
exports.getRoutesFromLocalStorage = getRoutesFromLocalStorage;
