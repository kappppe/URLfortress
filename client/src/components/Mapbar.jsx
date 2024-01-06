import React, { useEffect } from "react";

function Mapbar() {
  useEffect(() => {
    function initMap() {
      // Initial map with a generic location
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 55.6078, lng: 12.9982 },
        zoom: 4,
      });
    }

    // Check if the Google Maps API script has already been added
    if (!window.google || !window.google.maps) {
      // Load the Google Maps API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIfZP-bCxWS4x3Dz-TKbAb39sRPqHl8sk&callback=initMap`;
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
    } else if (!window.initMap) {
      // If the API is already loaded, but initMap is not defined, call initMap directly
      initMap();
    }
  }, []); // The empty dependency array ensures that the effect runs only once

  return <div id="map" style={{ height: "400px", width: "400px" }}></div>;
}

export default Mapbar;

