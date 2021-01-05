import React from 'react'
import GoogleMapReact from 'google-map-react'

export const MapContainer = () => {
  
  return (
     <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
          <LocationPin
          lat='41.3851'
          lng='2.1734'
          text="example"
        />
      </GoogleMapReact>
  )
}

​