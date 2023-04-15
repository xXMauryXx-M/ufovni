import React from 'react'
import{Image} from "react-native"
import { Marker } from 'react-native-maps'
export const Markers = ({ geos  ,handlePresentBPress,
  infoUser ,
  }:any) => {
 
    
 
  return (
   
 <Marker
  onPress={()=>handlePresentBPress(geos)}             
       coordinate={{
          latitude:geos.latitud,
          longitude:geos.longitud
       }}
       key={geos.key}
     > 


<Image 
style={{
      position:"relative",
      width:42,
      height:42,
      tintColor:geos.nombreUser==infoUser?.nombre? "" : "black",
    }}
    source={ geos.nombreUser==infoUser?.nombre?  require("../../assets/beard.png") :  require("../../assets/ufo.png")  } />

 
  </Marker>
  )
}
