export interface Stop {
    stopId: string;
    stopName: string;
    latitude: number;
    longitude: number;
  }
  
  export interface Route {
    routeName: string;
    direction: "UP" | "DOWN";
    routeId: string;
    status: "Active" | "Inactive";
    stops: Stop[];
  }

  export interface TransitRoute {
    routeId: string;
    name: string;
    direction: 'UP' | 'DOWN';
    status: 'Active' | 'Inactive';
    stops: Stop[];
  }
  