import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ lat, lng, text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

// const AnyReactComponent = ({ text }) => (
//   <div className="pin">
//     <div className="pulse">
//       <div></div>
//     </div>
//     {text}
//   </div>
// );

// const AnyReactComponent = ({ text }) => (
//   <div
//     style={{
//       width: "30px",
//       height: "30px",
//       borderRadius: "50% 50% 50% 0",
//       background: "#89849b",
//       position: "absolute",
//       transform: "rotate(-45deg)",
//       left: "50%",
//       top: "50%",
//       margin: "-20px 0 0 -20px",
//       animationName: "bounce",
//       animationFillMode: "both",
//       animationDuration: "1s",
//     }}
//   >
//     <div
//       style={{
//         content: "''",
//         width: "14px",
//         height: "14px",
//         margin: "8px 0 0 8px",
//         background: "#2F2F2F",
//         position: "absolute",
//         borderRadius: "50%",
//       }}
//     ></div>
//     <div
//       style={{
//         background: "rgba(0,0,0,0.2)",
//         borderRadius: "50%",
//         height: "14px",
//         width: "14px",
//         position: "absolute",
//         left: "50%",
//         top: "50%",
//         margin: "11px 0 0 -12px",
//         transform: "rotateX(55deg)",
//         zIndex: "-2",
//       }}
//     >
//       <div
//         style={{
//           content: "''",
//           borderRadius: "50%",
//           height: "40px",
//           width: "40px",
//           position: "absolute",
//           margin: "-13px 0 0 -13px",
//           animation: "pulsate 1s ease-out",
//           animationIterationCount: "infinite",
//           opacity: "0.0",
//           boxShadow: "0 0 1px 2px #89849b",
//           animationDelay: "1.1s",
//         }}
//       ></div>
//     </div>
//     {text}
//   </div>
// );

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

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const combinedStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  return (
    <div style={{ height: "50vh", width: "40%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        // center={{ lat: 59.95, lng: 30.33 }}
        center={{ lat: center.lat, lng: center.long }}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        options={{
          styles: combinedStyles,
        }}
        // draggable={false}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={center.lat}
          lng={center.long}
          text={"My Marker"}
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
