import MapboxGL from "@rnmapbox/maps";
import React from "react"
import { View,Text } from "react-native"

export const MapBoxs=()=>{
    MapboxGL.setAccessToken('pk.eyJ1IjoibWF1cnljIiwiYSI6ImNsOTF3dThtOTBwaHAzbnRnZGx1OXhhb3cifQ.zsZAWaLXMtNT8Ix4DsMYxA');

    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
<Text style={{color:"white"}} >hola mundo</Text>
<View style={{width:300,height:300}} >
<MapboxGL.MapView
style={{flex:1}}
styleURL={"mapbox://styles/mauryc/cl98i8ra8003714o6ipeuyo27"}

>

</MapboxGL.MapView>
</View>
    
        </View>
    )
}