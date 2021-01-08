import * as React from "react";
import PropTypes from "prop-types";
import { useGoogleMaps } from "react-hook-google-maps";

export const MyMap = props => {
	const points = { lat: props.lat, lng: props.lon };
	const { ref, map, google } = useGoogleMaps("AIzaSyA-uwvOzp76L6-v-HSF0NwJ7JsYOcrhU-o", {
		center: points,
		zoom: 20
		// mapTypeId: "satellite"
	});

	if (map) {
		// execute when map object is ready
		new google.maps.Marker({ position: points, map });
	}
	// console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
	// console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
	return <div ref={ref} style={{ width: 800, height: 400 }} />;
};

MyMap.propTypes = {
	lat: PropTypes.any,
	lon: PropTypes.any
};
