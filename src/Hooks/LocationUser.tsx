import Geolocation from "@react-native-community/geolocation"
import react from "react"
import { useState } from 'react';


 export const handleUserLocation=(setcoordenadas:any)=>{
    Geolocation.getCurrentPosition(({coords})=>setcoordenadas({latitude:coords.latitude, longitude:coords.longitude})
  )
  
 

}

