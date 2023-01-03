import React, { useCallback, useRef } from "react"
import { View ,Image} from "react-native"
import  { Marker } from 'react-native-maps'
import { GeoShot } from './Map';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface propsMarker{
  geo:GeoShot,
  lognpressBoll:boolean,
  nombreUser:FirebaseFirestoreTypes.DocumentData | undefined,
  setinfoGeoShot:any,

}

export const MarkerAvistamiento=({geo,lognpressBoll,nombreUser,setinfoGeoShot}:propsMarker)=>{
  const bottomSheetRef2 = useRef<BottomSheetModal>(null);
  const handlePresentBPress = useCallback(() => {
    if (bottomSheetRef2.current) {
      bottomSheetRef2.current.present();
    }
  }, []);
  const PassInfoToBottomShet=(ele:GeoShot,longpress:boolean)=>{  
  

  
      setinfoGeoShot(ele)
      handlePresentBPress()
   
       
  } 
    
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
  position:"relative",
  width:42,
  height:42,
  tintColor:geo.nombreUser==nombreUser?.nombre? "" : "white",
}}
 source={ geo.nombreUser==nombreUser?.nombre?   require("../assets/beard.png") :null } 
 
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