export interface Stop {
  stopId: string;
  stopName: string;
  latitude: number;
  longitude: number;
}

export interface TransitRoute {
  routeId: string;
  name: string;
  direction: 'UP' | 'DOWN';
  status: 'Active' | 'Inactive';
  stops: Stop[];
}
