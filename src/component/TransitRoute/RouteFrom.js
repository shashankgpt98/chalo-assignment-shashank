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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var data_1 = require("../../data");
var constant_1 = require("./constant");
var Route_style_1 = require("./Route.style");
var RouteForm = function (_a) {
    var onSubmit = _a.onSubmit, currentRoute = _a.currentRoute;
    var _b = (0, react_1.useState)(""), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)("UP"), direction = _c[0], setDirection = _c[1];
    var _d = (0, react_1.useState)("Active"), status = _d[0], setStatus = _d[1];
    var _e = (0, react_1.useState)([]), stops = _e[0], setStops = _e[1];
    var _f = (0, react_1.useState)(""), selectedStop = _f[0], setSelectedStop = _f[1];
    (0, react_1.useEffect)(function () {
        if (currentRoute) {
            setName(currentRoute.name);
            setDirection(currentRoute.direction);
            setStatus(currentRoute.status);
            setStops(currentRoute.stops);
        }
    }, [currentRoute]);
    var handleStopChange = function (e) {
        var selectedState = e.target.value;
        setSelectedStop(selectedState);
        var stateIndex = e.target.selectedOptions[0].getAttribute('data-custom');
        if (stateIndex) {
            var selected = data_1.indianStates[parseInt(stateIndex)];
            setStops(__spreadArray(__spreadArray([], stops, true), [selected], false));
        }
    };
    var handleStopDelete = function (stopIndex) {
        var updatedStops = stops.filter(function (_, index) { return index !== stopIndex; });
        setStops(updatedStops);
    };
    var handleResetForm = function () {
        setName("");
        setDirection("UP");
        setStatus("Active");
        setStops([]);
        setSelectedStop('');
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var newRoute = {
            routeId: currentRoute ? currentRoute.routeId : Date.now().toString(),
            name: name,
            direction: direction,
            status: status,
            stops: stops,
        };
        onSubmit(newRoute);
        handleResetForm();
    };
    return ((0, jsx_runtime_1.jsxs)(Route_style_1.FormContainer, { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Route_style_1.FormLabel, { children: "Route Name:" }), (0, jsx_runtime_1.jsx)(Route_style_1.FormInput, { value: name, onChange: function (e) { return setName(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Route_style_1.FormLabel, { children: "Direction:" }), (0, jsx_runtime_1.jsx)(Route_style_1.FormSelect, { value: direction, onChange: function (e) { return setDirection(e.target.value); }, children: constant_1.DIRECTIONS.map(function (dir) { return ((0, jsx_runtime_1.jsx)("option", { value: dir.value, children: dir.label }, dir.value)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Route_style_1.FormLabel, { children: "Status:" }), (0, jsx_runtime_1.jsx)(Route_style_1.FormSelect, { value: status, onChange: function (e) { return setStatus(e.target.value); }, children: constant_1.STATUSES.map(function (status) { return ((0, jsx_runtime_1.jsx)("option", { value: status.value, children: status.label }, status.value)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Route_style_1.FormLabel, { children: "Select State:" }), (0, jsx_runtime_1.jsxs)(Route_style_1.FormSelect, { onChange: handleStopChange, value: selectedStop, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a state" }), data_1.indianStates.map(function (state, index) { return ((0, jsx_runtime_1.jsx)("option", { value: state.stopName, "data-custom": index, children: state.stopName }, index)); })] })] }), stops.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Selected Stops:" }), (0, jsx_runtime_1.jsx)(Route_style_1.StopList, { children: stops.map(function (stop, index) { return ((0, jsx_runtime_1.jsxs)(Route_style_1.StopListItem, { children: [(0, jsx_runtime_1.jsxs)("span", { children: [stop.stopName, " (Lat: ", stop.latitude, ", Lng: ", stop.longitude, ")"] }), (0, jsx_runtime_1.jsx)(Route_style_1.StopDeleteButton, { type: "button", onClick: function () { return handleStopDelete(index); }, children: (0, jsx_runtime_1.jsx)("img", { src: "src/assets/red-x-icon.svg", alt: "Delete" }) })] }, index)); }) })] })), (0, jsx_runtime_1.jsx)(Route_style_1.FormButton, { type: "submit", children: "Submit Route" })] }));
};
exports.default = RouteForm;
