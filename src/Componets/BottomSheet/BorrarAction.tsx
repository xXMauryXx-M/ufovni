import React from "react"
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




export const BorrarAction=({infoGeoShot,handleDismisBPress}:any)=>{

    const BorrarPublicacion=(doc:any)=>{

        Alert.alert(
          "señor ufologo",
          "esta apunto de eliminar completamente el avistamiento de la base de datos, si precionas ok no se borrara y sirviria de analisis  ",
          [
              {
                  text:"ok",
                  onPress:()=>{
                    firestore().collection("BaseDeDatosAvistamientos").add({
                      hora:doc.hora,
                      latitud:doc.latitud,
                      longitud:doc.longitud,
                      photo:doc.photo
                    }).then(()=>{
                      try {
                        firestore()
                        .collection('users').doc(auth().currentUser?.email as any).collection("geoShot")
                        .doc(doc.key)
                        .delete()
                        .then(() => {
                       
                          handleDismisBPress()
                        }).catch(()=>{
                          Alert.alert("hubo un error")
                        }) 
                      } catch (error) {
                        Alert.alert("hubo un error")
                      }  
                    })
                   
                      
                  
                    
                  },
                  style:"cancel"
                  
              },
              {text:"borrar",  onPress:()=>{
                try {
                  firestore()
                  .collection('users').doc(auth().currentUser?.email as any).collection("geoShot")
                  .doc(doc.key)
                  .delete()
                  .then(() => {
                    Alert.alert("Avistamiento borrado")
                  }).catch(()=>{
                    Alert.alert("hubo un error")
                  }) 
                } catch (error) {
                  Alert.alert("hubo un error")
                }
              } }
          ]
          ,{
              //puedes hacer click afuera para cerrarlo 
              cancelable:false,
         
      
          }
      )
       
       
      
      }

    return (
<BottomSheetView  focusHook={useFocusEffect} style={{flex:1}}> 

<Text style={{fontSize:17, color:"white" ,fontWeight:"600", marginLeft:20}} >Desea Borrar esta Publicacion <Icon name='trash-sharp' color={"white"} size={20} /> </Text>
  <TouchableOpacity  onPress={()=>BorrarPublicacion(infoGeoShot)}  style={{backgroundColor:"red",borderRadius:10,padding:10, width:120, marginTop:20,alignSelf:"center"}} >
      <Text style={{color:"white", fontSize:20, paddingHorizontal:20, fontWeight:"900"}} >Borrar</Text>
  </TouchableOpacity>
  <Text style={{color:"white", fontSize:20, fontWeight:"bold",alignSelf:"center"}}>{infoGeoShot.user} <Text style={{fontSize:15}} >{infoGeoShot.hora}</Text>   </Text>
<View style={{alignItems:"center"}} >
  <Image style={{width:300, height:260}} source={{uri:  infoGeoShot.photo  }}  />  
</View>

</BottomSheetView>

        )
}
