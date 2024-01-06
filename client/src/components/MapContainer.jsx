import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapContainer = ({ center }) => {
  const defaultProps = {
    zoom: 11,
  };

  const handleApiLoaded = (map, maps) => {
    // Use map and maps objects
    // You can perform any additional logic here after the Google Maps API is loaded
  };

  // Check if the center coordinates are defined before rendering the map
  if (!center || !center.lat || !center.long) {
    return <p>Loading map...</p>;
  }

  return (
    <div style={{ height: "50vh", width: "40%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCIfZP-bCxWS4x3Dz-TKbAb39sRPqHl8sk" }}
        // defaultCenter={{ lat: center.lat, lng: center.long }}
        center={{ lat: center.lat, lng: center.long }}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={center.lat}
          lng={center.long}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;

//   const handleApiLoaded = (map, maps) => {
//     // Use map and maps objects
//     // You can perform any additional logic here after the Google Maps API is loaded
//   };

//   return (
//     <div style={{ height: "50vh", width: "40%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyBUJpYWOqCM9EwE6vjP4wReHNt6wqX7yps" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//       >
//         <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
//       </GoogleMapReact>
//     </div>
//   );
// };

// export default SimpleMap;
