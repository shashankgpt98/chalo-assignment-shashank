"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var RouteFrom_1 = __importDefault(require("./component/TransitRoute/RouteFrom"));
require("@tomtom-international/web-sdk-maps/dist/maps.css");
var RouteList_1 = __importDefault(require("./component/TransitRoute/RouteList"));
var utils_1 = require("./component/utils");
var styled_components_1 = require("styled-components");
var MapView_1 = __importDefault(require("./component/MapView/MapView"));
var ExportButton = styled_components_1.styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  font-size: 16px;\n  cursor: ", ";\n  margin: 20px 10px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  background-color: ", ";\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  font-size: 16px;\n  cursor: ", ";\n  margin: 20px 10px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), function (props) { return (props.disabled ? "#ccc" : "#007bff"); }, function (props) { return (props.disabled ? "not-allowed" : "pointer"); }, function (props) { return (props.disabled ? "#ccc" : "#0056b3"); });
var FileInput = styled_components_1.styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 20px 0;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  font-size: 14px;\n"], ["\n  margin: 20px 0;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  font-size: 14px;\n"])));
var BottomMargin = styled_components_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: 16px;\n"], ["\n  margin-bottom: 16px;\n"])));
var App = function () {
    var _a = (0, react_1.useState)([]), routes = _a[0], setRoutes = _a[1];
    var _b = (0, react_1.useState)(undefined), currentRoute = _b[0], setCurrentRoute = _b[1];
    var formRef = (0, react_1.useRef)(null);
    var STORAGE_KEY = "transitRoutes";
    (0, react_1.useEffect)(function () {
        var storedRoutes = (0, utils_1.getRoutesFromLocalStorage)(STORAGE_KEY);
        if (storedRoutes.length > 0) {
            setRoutes(storedRoutes);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        (0, utils_1.createRouteInLocalStorage)(STORAGE_KEY, routes);
    }, [routes]);
    var handleDelete = function (routeId) {
        setRoutes(routes.filter(function (route) { return route.routeId !== routeId; }));
    };
    var handleUpdate = function (routeId) {
        var routeToUpdate = routes.find(function (route) { return route.routeId === routeId; });
        if (routeToUpdate) {
            setCurrentRoute(routeToUpdate);
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    };
    var addRoute = function (newRoute) {
        setRoutes(function (prevState) {
            var newState = structuredClone(prevState);
            var existingRouteIndex = newState.findIndex(function (route) { return route.routeId === newRoute.routeId; });
            if (existingRouteIndex !== -1) {
                newState[existingRouteIndex] = newRoute;
            }
            else {
                newState.push(newRoute);
            }
            return newState;
        });
    };
    var handleBatchUploadCSV = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onload = function () {
            var text = reader.result;
            var lines = text.split("\n");
            var newRoutes = [];
            lines.slice(1).forEach(function (line) {
                var _a = line.split(","), routeId = _a[0], name = _a[1], direction = _a[2], status = _a[3], stopName = _a[4], latitude = _a[5], longitude = _a[6];
                if (routeId) {
                    var route = newRoutes.find(function (route) { return route.routeId === routeId; });
                    if (!route) {
                        route = { routeId: routeId, name: name, direction: direction, status: status, stops: [] };
                        newRoutes.push(route);
                    }
                    route.stops.push({ stopName: stopName, latitude: latitude, longitude: longitude });
                }
            });
            setRoutes(__spreadArray(__spreadArray([], routes, true), newRoutes, true));
        };
        reader.readAsText(file);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Public Transit Route Repository" }), (0, jsx_runtime_1.jsx)(ExportButton, { disabled: routes.length === 0, onClick: function () { return (0, utils_1.exportRoutesAsCSV)(routes); }, children: "Export as CSV" }), (0, jsx_runtime_1.jsx)(FileInput, { type: "file", accept: ".csv", onChange: handleBatchUploadCSV }), (0, jsx_runtime_1.jsx)("div", { ref: formRef, children: (0, jsx_runtime_1.jsx)(RouteFrom_1.default, { onSubmit: addRoute, currentRoute: currentRoute }) }), (0, jsx_runtime_1.jsx)(BottomMargin, { children: (0, jsx_runtime_1.jsx)(RouteList_1.default, { routes: routes, onDelete: handleDelete, onUpdate: handleUpdate }) }), (0, jsx_runtime_1.jsx)(MapView_1.default, { routes: routes })] }));
};
exports.default = App;
var templateObject_1, templateObject_2, templateObject_3;
