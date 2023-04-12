import React from 'react'
import{Image} from "react-native"
import { Marker } from 'react-native-maps'
import { infoUserTypes } from '../../Screen/UfoHome';

import { useFirebaseData } from '../../Hooks/useFirebaseData';


interface propsToMarkers{
   geo:any,
   handlePresentBPress:any
   infoUser?:infoUserTypes
   setinfoUfo?:any
}

export const Markers = ({geo,handlePresentBPress, infoUser,setinfoUfo }:propsToMarkers) => {  
   const {setUfosighting}=useFirebaseData()

   const PassInfoToBottomShet=(ele:any)=>{
    setinfoUfo(ele)
    handlePresentBPress()

  }
   
//PassInfoToBottomShet(geo)
  return (  
<Marker
  onPress={()=>PassInfoToBottomShet(geo)}        
 
       coordinate={{
          latitude:geo.latitud,
          longitude:geo.longitud
       }}
       key={geo.key}
     > 

 



<Image 
style={{
      position:"relative",
      width:42,
      height:42,
      tintColor:geo.nombreUser==infoUser?.nombre? "" : "#0096f6",
    }}
    source={ geo.nombreUser==infoUser?.nombre?  require("../../assets/beard.png") :  require("../../assets/ufo.png")  } />


 
  </Marker>
  )
}
