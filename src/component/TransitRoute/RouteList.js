"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Route_style_1 = require("./Route.style");
var RouteList = function (_a) {
    var routes = _a.routes, onDelete = _a.onDelete, onUpdate = _a.onUpdate;
    return ((0, jsx_runtime_1.jsxs)(Route_style_1.RouteContainer, { children: [(0, jsx_runtime_1.jsx)(Route_style_1.RouteTitle, { children: "Added Routes" }), routes.length > 0 ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: routes.map(function (route, index) { return ((0, jsx_runtime_1.jsxs)(Route_style_1.RouteItem, { children: [(0, jsx_runtime_1.jsx)(Route_style_1.RouteHeader, { children: route.name }), (0, jsx_runtime_1.jsxs)(Route_style_1.RouteDetails, { children: ["Route ID: ", route.routeId, " | Direction: ", route.direction, " | Status: ", route.status] }), (0, jsx_runtime_1.jsx)(Route_style_1.RouteDetails, { children: "Stops:" }), (0, jsx_runtime_1.jsx)(Route_style_1.RouteStopList, { children: route.stops.map(function (stop, stopIndex) { return ((0, jsx_runtime_1.jsxs)(Route_style_1.RouteStopItem, { children: [stop.stopName, " (Lat: ", stop.latitude, ", Lng: ", stop.longitude, ")"] }, stopIndex)); }) }), (0, jsx_runtime_1.jsx)(Route_style_1.UpdateRouteButton, { onClick: function () { return onUpdate(route.routeId); }, children: "Update" }), (0, jsx_runtime_1.jsx)(Route_style_1.DeleteRouteButton, { onClick: function () { return onDelete(route.routeId); }, children: "Delete" })] }, index)); }) })) : ((0, jsx_runtime_1.jsx)("p", { children: "No routes added yet." }))] }));
};
exports.default = RouteList;
