import tt from "@tomtom-international/web-sdk-maps";

export function addSignsToRoute(routeCoordinates, map, status) {
  const icon = status === "Active" ? 'src/assets/location-2955.svg' : 'src/assets/inactive.svg'
  routeCoordinates.forEach((coordinate) => {
    const signElement = createSignElement(icon);
    new tt.Marker({ element: signElement })
      .setLngLat(coordinate)
      .addTo(map);
  });
}

function createSignElement(icon): HTMLElement {
  const sign = document.createElement("div");
  sign.style.width = "20px";
  sign.style.height = "20px";
  sign.style.backgroundImage = `url(${icon})`;
  sign.style.backgroundSize = "contain";
  sign.style.backgroundRepeat = "no-repeat";

  return sign;
}

export const addCrossIconsToRoute = (stops, map) => {
  const crossIcon = 'src/assets/inactive-svgrepo-com.svg';

  for (let i = 0; i < stops.length - 1; i++) {
    const startStop = stops[i];
    const endStop = stops[i + 1];

    const midLongitude = (parseFloat(startStop.longitude) + parseFloat(endStop.longitude)) / 2;
    const midLatitude = (parseFloat(startStop.latitude) + parseFloat(endStop.latitude)) / 2;

    const markerElement = createMarkerElement(crossIcon);
    new tt.Marker({ element: markerElement, anchor: 'center' })
      .setLngLat([midLongitude, midLatitude])
      .addTo(map);
  }
};

const createMarkerElement = (icon) => {
  const markerDiv = document.createElement('div');
  markerDiv.style.backgroundImage = `url(${icon})`;
  markerDiv.style.width = '25px';
  markerDiv.style.height = '25px';
  markerDiv.style.backgroundSize = 'contain';
  markerDiv.style.backgroundRepeat = 'no-repeat';
  return markerDiv;
};
