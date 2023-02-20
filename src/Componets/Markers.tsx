import React from 'react'
import{Image} from "react-native"
import { Marker } from 'react-native-maps'

export const Markers = ({PassInfoToBottomShet,geo,lognpressBoll,nombreUser}:any) => {
  return (
   
<Marker
  onPress={()=>PassInfoToBottomShet(geo,lognpressBoll)}             
       coordinate={{
          latitude:geo.latitud,
          longitude:geo.longitud
       }}
       key={geo.key}
     > 
{lognpressBoll ?  
<Image
style={{
  position:"absolute",
  width:42,
  height:42,
  tintColor:geo.nombreUser==nombreUser?.nombre? "" : "white",
}}
 source={ geo.nombreUser==nombreUser?.nombre &&  require("../assets/beard.png")  } 
 
 />


:

<Image 
style={{
      position:"relative",
      width:42,
      height:42,
      tintColor:geo.nombreUser==nombreUser?.nombre? "" : "white",
    }}
    source={ geo.nombreUser==nombreUser?.nombre?  require("../assets/beard.png") :  require("../assets/ufo.png")  } />


}   
  </Marker>
  )
}
