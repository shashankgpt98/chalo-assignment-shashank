export const exportRoutesAsCSV = (routes) => {
  const csvRows = [
    [
      "Route ID",
      "Route Name",
      "Direction",
      "Status",
      "Stop Name",
      "Latitude",
      "Longitude",
    ],
    ...routes.flatMap((route) =>
      route.stops.map((stop) => [
        route.routeId,
        route.name,
        route.direction,
        route.status,
        stop.stopName,
        stop.latitude,
        stop.longitude,
      ])
    ),
  ];
  const csvContent = csvRows.map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "routes.csv";
  link.click();
};

export const createRouteInLocalStorage = (key: string, routes) => {
  localStorage.setItem(key, JSON.stringify(routes));
};

export const getRoutesFromLocalStorage = (key: string) => {
  const storedRoutes = localStorage.getItem(key);
  return storedRoutes ? JSON.parse(storedRoutes) : [];
};