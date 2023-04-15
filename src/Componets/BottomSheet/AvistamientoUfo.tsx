import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const AvistamientoUfo = ({data ,nombreUser,seguir}:any) => {

 const {width,height} = useWindowDimensions()
  return (
    <BottomSheetView  style={{flex:1}}>         
       <View style={style.contianer} >
       <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}} >
     <Image
        style={{height:60,width:60,}}
        source={require("../../assets/man.png")}  />     
           <Text style={[style.TextInfoSighting,{top:15}]}>Nombre:{data.nombreUser ==nombreUser?.nombre ? "Tu publicacion" : "Ferederico" }</Text>
           <Text  style={[style.TextInfoSighting,{top:35}]}>hora: <Text style={{color:"orange"}} >12:21</Text></Text>
           <Text  style={[style.TextInfoSighting,{top:55}]}>Geolocalizacion:El salvador</Text>
           <Text style={{color:"white", fontSize:20, fontWeight:"bold",position:"absolute",right:0,bottom:35}}>{data.user} <Text style={{fontSize:15}} >{data.hora}</Text> </Text> 
     </View>

            

          <View style={{marginTop:100}} >
              <Image style={style.UfoSightingPhoto} source={{uri:data.photo}} /> 
          </View>    

          <TouchableHighlight style={style.boton} onPress={()=>seguir(data)} >
               <Icon style={{textAlign:"center"}} name='navigate-circle-sharp' size={20} />  
          </TouchableHighlight>   
         
    </View>
    
    </BottomSheetView>
  )
}


const style =StyleSheet.create({

contianer:{
  flex:1,

},
UfoSightingPhoto:{
  width:"90%",
  height:"100%",
  resizeMode:'cover',
  alignSelf:"center",
  borderRadius:10,
},
TextInfoSighting:{
  fontSize:18,
  color:"black",
  fontWeight:"600",
  position:"absolute",
  left:50,
  marginLeft:20

},
boton:{
backgroundColor:"orange",
width:"15%",
borderRadius:10,
padding:10,
position:"absolute",
right:10,
}
})



/* 
       <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}} >
        <Image
         style={{height:100,width:100,}}
         source={require("../../assets/man.png")}  />
         
         <Text style={{fontSize:18,color:"black",fontWeight:"bold",position:"absolute",left:50,top:15,marginLeft:20}} >{infoGeoShot.nombreUser ==nombreUser?.nombre ? "Tu publicacion" : "Ferederico" }</Text>
        
      <Text style={{color:"white", fontSize:20, fontWeight:"bold",position:"absolute",right:0,bottom:35}}>{infoGeoShot.user} <Text style={{fontSize:15}} >{infoGeoShot.hora}</Text>   </Text>
        </View>
         <TouchableOpacity onPress={()=>handleDismissAPress()}>
               <Icon style={{position:"absolute", right:0}}  name='close-outline' size={35}color="white" />
          </TouchableOpacity>
  
     
      <View style={{alignItems:"center"}} >
        <Image style={{width:width/1.2, height:height*0.3}} source={{uri:  infoGeoShot.photo  }}  />  
      </View>
      <View style={{justifyContent:"space-around", flexDirection:"row"}} >
      
      
        <TouchableOpacity  onPress={()=>seguir(infoGeoShot)}  style={{backgroundColor:"#0096f6",borderRadius:10,padding:10, width:170,marginTop:20}} >
            <Text style={{color:"white", fontSize:20, paddingHorizontal:20, fontWeight:"900"}} >Geolocaliza</Text>
        </TouchableOpacity> */