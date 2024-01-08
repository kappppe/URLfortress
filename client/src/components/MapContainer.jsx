import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapContainer = ({ center }) => {
  const defaultProps = {
    zoom: 10,
  };

  const handleApiLoaded = (map, maps) => {
    // Use map and maps objects
    // You can perform any additional logic here after the Google Maps API is loaded
  };

  // Check if the center coordinates are defined before rendering the map

  // NEEDS FIXING, if coordinates == "N/A" --> error
  if (!center || !center.lat || !center.long) {
    return <p></p>;
  }
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return (
    <div style={{
      height: "42vh",
      width: "28%",
      position: "fixed",
      border: "8px solid currentColor",
      borderRadius: "8px",
      top: "40vh",
      right: "18vh"
      }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        // defaultCenter={{ lat: center.lat, lng: center.long }}
        center={{ lat: center.lat, lng: center.long }}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={center.lat}
          lng={center.long}
          text=""
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
