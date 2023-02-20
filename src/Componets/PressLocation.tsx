import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const PressLocation = ({handleDismissAPress,infoGeoShot,nombreUser,seguir}:any) => {
  return (
    <BottomSheetView  focusHook={useFocusEffect} style={{flex:1}}>         
    <View>
       
        <TouchableOpacity onPress={()=>handleDismissAPress()}>
           <Icon style={{position:"absolute", right:0}}  name='close-outline' size={35}color="white" />
        </TouchableOpacity>
    </View>
    <Text style={{color:"white", marginLeft:20}} >{infoGeoShot.nombreUser ==nombreUser?.nombre ? "Tu publicacion" : "No es tu poblicacion" }</Text>
     <Text style={{color:"white", fontSize:20, fontWeight:"bold",alignSelf:"center"}}>{infoGeoShot.user} <Text style={{fontSize:15}} >{infoGeoShot.hora}</Text>   </Text>
    <View style={{alignItems:"center"}} >
      <Image style={{width:300, height:260}} source={{uri:  infoGeoShot.photo  }}  />  
    </View>
    <View style={{justifyContent:"space-around", flexDirection:"row", marginTop:"10%"}} >
    
    
      <TouchableOpacity  onPress={()=>seguir(infoGeoShot)}  style={{backgroundColor:"#0096f6",borderRadius:10,padding:10, width:120}} >
          <Text style={{color:"white", fontSize:20, paddingHorizontal:20, fontWeight:"900"}} >Seguir</Text>
      </TouchableOpacity>
    </View>
    </BottomSheetView>
  )
}
