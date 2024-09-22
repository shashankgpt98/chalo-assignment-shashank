import tt, { LngLatLike } from "@tomtom-international/web-sdk-maps";

const arrowIcon = "src/assets/down-arrow-svgrepo-com.svg"; // Path to your arrow icon

function calculateBearing(start: [number, number], end: [number, number]) {
  const [lng1, lat1] = start;
  const [lng2, lat2] = end;

  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const deltaLng = toRadians(lng2 - lng1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const x = Math.sin(deltaLng) * Math.cos(lat2Rad);
  const y =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLng);

  const bearing = toDegrees(Math.atan2(x, y));
  return (bearing + 360) % 360; // Ensure bearing is between 0 and 360
}

export function addArrowsToRoute(routeCoordinates, map, dir) {
  const arrowIcon =
    dir === "DOWN" ? "src/assets/down-arrow-svgrepo-com.svg" : ""; // Path to your arrow icon
  const arrowSpacing = 100; // Distance between arrows in meters

  for (let i = 0; i < routeCoordinates.length - 1; i++) {
    const start = routeCoordinates[i];
    const end = routeCoordinates[i + 1];
    const bearing = calculateBearing(start, end);

    // console.log("bearing ",bearing);

    // const distance = tt.geoDistance(start, end); // Calculate distance between points

    // Calculate number of arrows needed
    const numArrows = 3;

    for (let j = 1; j < numArrows; j++) {
      const fraction = j / numArrows;

      const arrowPosition = [
        Number(start[0]) + (Number(end[0]) - Number(start[0])) * fraction,
        Number(start[1]) + (Number(end[1]) - Number(start[1])) * fraction,
      ];

      // Add marker for arrow
            new tt.Marker({ element: createArrowElement(bearing) })
                .setLngLat(arrowPosition as LngLatLike)
                .addTo(map);
    }
  }
}

function createArrowElement(bearing: number): HTMLElement {
    const arrow = document.createElement("div");
    
    arrow.style.width = "41px";
    arrow.style.height = "40px";
    arrow.style.backgroundImage = "url(src/assets/down-arrow-svgrepo-com.svg)";
    arrow.style.backgroundSize = "contain";
    arrow.style.backgroundRepeat = "no-repeat";
    arrow.style.transformOrigin = "center center";
  
    // Initially set the transform
    arrow.style.transform = `rotateZ(120deg)`;
  
    // Reapply the transform after a short delay
    // setTimeout(() => {
    //  arrow.style.transform = `translate(-50%, -100%) rotateZ(${bearing}deg)`;
    // }, 0);
  
    console.log("Arrow ", arrow);
    
    return arrow;
  }
  

// function createArrowElement(arrowIcon) {
//     const element = document.createElement('div');
//     element.style.backgroundImage = `url(${arrowIcon})`;
//     element.style.width = '15px'; // Adjust size
//     element.style.height = '15px';
//     element.style.backgroundSize = 'contain';
//     element.style.transform = 'rotate(120deg)'; // Adjust rotation if needed
//     return element;
// }



export function addSignsToRoute(routeCoordinates, map, color, status) {
   const icon =  status === "Active"? 'src/assets/location-2955.svg':'src/assets/inactive.svg'
    routeCoordinates.forEach((coordinate) => {
        const signElement = createSignElement(icon);
        new tt.Marker({ element: signElement })
            .setLngLat(coordinate)
            .addTo(map);
    });
}
// src/assets/location-2955.svg

function createSignElement(icon): HTMLElement {
    const sign = document.createElement("div");
    sign.style.width = "20px"; // Adjust size as needed
    sign.style.height = "20px";
    sign.style.backgroundImage = `url(${icon})`; // Path to your sign icon
    sign.style.backgroundSize = "contain";
    sign.style.backgroundRepeat = "no-repeat";

    return sign;
}

// function createSignElement(color: string): HTMLElement {
//     const sign = document.createElement("div");
//     sign.style.width = "10px"; // Adjust size as needed
//     sign.style.height = "10px";
//     sign.style.borderRadius = "50%"; // Make it circular
//     sign.style.backgroundColor = color; // Set the background color
//     // sign.style.border = `2px solid ${color}`; // Optional: Add a white border

//     return sign;
// }

export const addCrossIconsToRoute = (stops, map) => {
    const crossIcon = 'src/assets/inactive-svgrepo-com.svg'; // Replace with your cross icon path
    
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
    markerDiv.style.width = '25px'; // Adjust size
    markerDiv.style.height = '25px'; // Adjust size
    markerDiv.style.backgroundSize = 'contain';
    markerDiv.style.backgroundRepeat = 'no-repeat';
    return markerDiv;
  };
