

# Public Transit Route Repository Web Application
This project is a web-based Public Transit Route Repository application developed using React. Users can create, manage, and visualize transit routes on an interactive map. Routes can be exported and imported via CSV, and all data is saved locally in the browser's Local Storage.


## Features

- **Add Transit Routes**: Users can add new routes with multiple stops, specifying names, direction, status, and coordinates for each stop.
- **Update and Delete Routes**: Existing routes can be updated or deleted.
- **CSV Export and Import**: Routes can be exported to CSV format and imported via CSV files.
- **Local Storage**: The routes are stored locally in the browser's local storage, allowing persistence across refreshes.
- **Map Visualization**: Each route and its stops are displayed on a map for easy visualization.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [CSV Structure](#csv-structure)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)

  ## Getting Started

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You should have Node.js(v20.12.2) installed. You can download it from [nodejs.org](https://nodejs.org).
- **npm** Package manager will install project dependencies(10.5.0).

## Installation

1. **Clone the repository**:

    ``` js
    git clone https://github.com/shashankgpt98/chalo-assignment-shashank.git
    cd chalo-assignment-shashank
    ```

3. **Install dependencies**:

    ```js
    npm install
    ```
4. **Start the development server**:

    ```js
   npm run dev
    ```
This will start the React application locally. Open http://localhost:{PORT} in your browser to view it.

## Usage

### Adding a Route

1. Open the application and use the form provided to add a new transit route.
2. Enter the following information:
   - **Route Name**
   - **Direction** (UP/DOWN)
   - **Status** (Active/Inactive)
   - **Stop Information** 
3. The route will be added to the list and visualized on the map.

### Inactive Route Icon
- For routes marked as **Inactive**, an **Inactive Icon** will be displayed between the route details. This helps in easily identifying routes that are not currently active.
- A **red location icon** will be displayed on both the **start** and **end** corners of the route on the map. This highlights the first and last stops of the route for active it will be blue.

### Visualizing Routes on the Map
- You need to select at least **two routes** to visualize them on the map. This ensures that the map can provide a meaningful display of the routes and their connections.

  
### Updating a Route

1. Click the update button next to any route in the list.
2. The form will pre-fill with the route's data. Edit the necessary fields.
3. Submit the form, and the route will be updated.

### Deleting a Route

To remove a route from the repository:

1. Click the delete button next to the corresponding route.
2. The route will be removed from both the list and the map.

### Exporting Routes as CSV

- Click the **Export as CSV** button to download a CSV file containing all the current routes and stops.

### Importing Routes via CSV

- Click the **Choose File** button to upload a CSV file.
- The file will be parsed and the routes added to the list and map.

### Map Visualization

All routes and their stops are displayed on an interactive map using the **TomTom SDK**. The map allows users to see the geographical layout of each route and the stops it covers.

## CSV Structure

The CSV file should follow this structure for proper import:

```csv
Route ID, Route Name, Direction,Status,Stop Name,Latitude,Longitude
1,Route 1,UP,Active,Stop A,28.4595,77.0266
1,Route 1,UP,Active,Stop B,12.9716,77.5946
2,Route 2,DOWN,Inactive,Stop C,17.4065,78.4772
2,Route 2,DOWN,Inactive,Stop D,28.4595,77.0266
```
### Explanation of Columns:

- **Route ID**: Unique identifier for the route.
- **Route Name**: Name of the transit route.
- **Direction**: The route's direction (either `UP` or `DOWN`).
- **Status**: The route's status (`Active` or `Inactive`).
- **Stop Name**: Name of each stop on the route.
- **Latitude**: Latitude of the stop's location.
- **Longitude**: Longitude of the stop's location.

## Technologies Used

- **React**: Frontend JavaScript library for building the user interface.
- **Styled-components**: For styling React components using CSS in JavaScript.
- **TomTom SDK**: Map and location visualization library.
- **Local Storage**: Browser-based storage to save route data between page reloads.
- **CSV Parsing**: For reading and writing route data in CSV format.

## Folder Structure
```
/src
 ├── /components
 │    ├── /TransitRoute
 │    │    ├── RouteForm.tsx      # Form for adding and editing routes
 │    │    ├── RouteList.tsx      # List component displaying all routes
 │    └── /MapView
 │         ├── MapView.tsx        # Map component for visualizing routes
 ├── /utils
 │    ├── utils.ts                # Utility functions (CSV handling, local storage management)
 ├── App.tsx                      # Main application file
 └── types.ts                     # TypeScript types for routes and stops
```

   
