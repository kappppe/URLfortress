import React, { useEffect } from "react";

function Mapbar() {
  useEffect(() => {
    function initMap() {
      // Initial map with a generic location
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 55.6078, lng: 12.9982 },
        zoom: 20,
      });
    }

    // Check if the Google Maps API script has already been added
    if (!window.google || !window.google.maps) {
      // Load the Google Maps API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUJpYWOqCM9EwE6vjP4wReHNt6wqX7yps&callback=initMap`;
      script.async = true;

      // Set a global callback function for when the script is loaded
      window.initMap = initMap;

      document.body.appendChild(script);

      // Cleanup function to remove the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
        // Remove the global callback function
        delete window.initMap;
      };
    } else {
      // If the API is already loaded, call initMap directly
      initMap();
    }
  }, []); // The empty dependency array ensures that the effect runs only once

  return <div id="map" style={{ height: "400px", width: "400px" }}></div>;
}

export default Mapbar;

// import React, { useEffect } from "react";

// function Mapbar() {
//   useEffect(() => {
//     let map;

//     function initMap() {
//       // Initial map with a generic location
//       map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 0, lng: 0 },
//         zoom: 2,
//       });
//     }

//     // Check if the Google Maps API script has already been added
//     if (!window.google || !window.google.maps) {
//       // Load the Google Maps API script
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUJpYWOqCM9EwE6vjP4wReHNt6wqX7yps&callback=initMap`;
//       script.async = true;
//       document.body.appendChild(script);

//       // Cleanup function to remove the script when the component is unmounted
//       return () => {
//         document.body.removeChild(script);
//       };
//     } else {
//       // If the API is already loaded, call initMap directly
//       initMap();
//     }
//   }, []); // The empty dependency array ensures that the effect runs only once

//   return <div id="map" style={{ height: "400px", width: "400px" }}></div>;
// }

// export default Mapbar;
