
import React,{useEffect,useRef,useCallback,useState} from "react"
import { ActivityIndicator, View, Text, StyleSheet, Button, Linking, TouchableOpacity, Alert, Image } from 'react-native';
import { useCameraDevices, Camera} from "react-native-vision-camera"
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
export const ShootCamara = () => {
   let hours = new Date().getHours()
   let minute = new Date().getMinutes()
   let segundos = new Date().getSeconds()   
   let HoraActual=`${hours-3}:${minute}:${segundos}`
   const {inicialPosition,hasLocation}= useLocation()

   const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()
const [urlFirebaseStare, seturlFirebaseStare] = useState("")
const [botonprecionado, setbotonprecionado] = useState(false)
   const cargarNombre=()=>{
     firestore().collection('users').doc(auth().currentUser?.email as any).get()
     .then(documentSnapshot => {
       if (documentSnapshot.exists) {
         setnombreUser (documentSnapshot.data());
       }
     }); 
   }
   let nose= "file://"

     

   const subirGeo=()=>{    
      
    try { 
      firestore().collection("users").doc(auth().currentUser?.email as any ).collection("geoShot").add({
          latitud:inicialPosition.latitude,
          longitud:inicialPosition.longitude,
          photo:urlFirebaseStare,
          nombreUser:nombreUser?.nombre,
          hora:HoraActual
 })   

 Alert.alert("Avistamiento reportado")
    } catch (error) {
      console.log(error)
      console.log("hubo un error")
    }
   
   }



  const devices=useCameraDevices()
  const device= devices.back

  const navigation= useNavigation()
   const comprobar=async()=>{
     const cameraPermission = await Camera.getCameraPermissionStatus()
 //  console.log(cameraPermission)
   }
   const camera = useRef<Camera>(null)
   const sacarPhoto=async()=>{
    setbotonprecionado(true)
   
    try {
      const photo = await camera.current!.takePhoto ({
        enableAutoRedEyeReduction:true,
      })   

     
     
  let cortarUrl=photo.path.substring(40,58)
  

      const reference = storage().ref( `avistamietnosUser/${nombreUser?.nombre}/${cortarUrl}` )
      await reference.putFile(photo.path);
      
      const url = await storage().ref(`avistamietnosUser/${nombreUser?.nombre}/${cortarUrl}`).getDownloadURL()
      seturlFirebaseStare(url)
   

    } catch (error) {
      Alert.alert("hubo un error ")
    }
   
 



  }

     const requestCamaraPermision=useCallback(async()=>{
     const permision=await Camera.requestCameraPermission() 
     if(permision=="denied") await   Linking.openSettings()
   
},[])
useEffect(() => {
  requestCamaraPermision()
  cargarNombre()
  console.log(nombreUser);
 }, [])
 const back=()=>{
  seturlFirebaseStare("")
  setbotonprecionado(!botonprecionado)
 }


 if (device == null) return <ActivityIndicator style={{marginTop:"50%"}}  color={"white"} size={60} />
 if(botonprecionado===true){
  if(urlFirebaseStare =="")
  return <Loading />
 }
  return(
     <View style={{flex:1, backgroundColor:"black"}} >  
    {
      urlFirebaseStare == "" ?  
       <Camera

      ref={camera}
      photo={true}
      style={{width:"100%",height:"100%"}}
      device={device}
      isActive={true}
      preset="photo"
      enableZoomGesture
    
    />
    :

    <View>
    <Image style={{position:"relative", width:640, height:600,alignSelf:"center",resizeMode:"contain"}} source={{uri:  urlFirebaseStare }} />
    </View> 
  
  }
    {
      Camera &&
    <View style={{position:"absolute",alignItems:"center", left:0,right:0,top:80}} >
  <TouchableOpacity onPress={()=>sacarPhoto()} >
  {
  urlFirebaseStare == ""
  &&
  <Icon style={{justifyContent:"flex-end",height:60, width:60 ,marginLeft:20, marginTop:510}} name="ellipse-outline" size={60} color="white" />   
 } 

  </TouchableOpacity>
 
    </View>
    }
  
 <View style={{alignItems:"center",justifyContent:"center", flex:1}} > 
 
 

  <TouchableOpacity  onPress={()=>subirGeo()} style={{ position:"absolute",bottom:-55,left:260}}  >
  <Icon name="checkmark" size={40} color="white" />
  
  
     
    </TouchableOpacity>  
  

  
  
  
  
 



 


    </View>
   
 <TouchableOpacity onPress={()=>back()} style={{backgroundColor:"black", width:250,padding:10}}  >
 <Icon style={{alignItems:"center", marginHorizontal:88}} color={"white"} name="arrow-back-circle-sharp" size={40}  />
  </TouchableOpacity>
    
     </View>
 

  )


}




const Loading=()=> {
return(
  <View style={{flex:1}} >
<ActivityIndicator style={{marginTop:"50%"}}  color={"white"} size={60} />
  <Text style={{color:"white", fontSize:20,fontWeight:"600",alignSelf:"center"}} >Espere un Momento</Text>
  </View>
  
)
}




















// import React,{useEffect} from 'react'
// import { View, Text, TouchableOpacity, Image, Button, ActivityIndicator } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Geolocation from "@react-native-community/geolocation";
import { Location, useLocation } from '../Hooks/useLocation';
import auth from '@react-native-firebase/auth';
import notifee, { AndroidVisibility } from '@notifee/react-native';
// export const ShootCamara = () => {
//   const [tempUri, settempUri] = useState("")
   
//   const takePhoto=()=>{
  
//     launchCamera({
//       mediaType:"mixed",
//     },(resp)=>{
//           if(resp.didCancel) return 
//           if(!resp.assets![0].uri!) return
//           settempUri(resp.assets![0].uri!)
            
//     })


//   }

// // useEffect(()=>{
// // takePhoto()
// // },[])


//   const PhthoGalery=()=>{
//     launchImageLibrary({
//       mediaType:"photo",
//     },(resp)=>{
//           if(resp.didCancel) return 
//           if(!resp.assets![0].uri!) return
//           settempUri(resp.assets![0].uri!)
            
//     })
//   }

//   return (
//     <View style={{flex:1, backgroundColor:"black"}} >

//     <Text style={{color:"white", fontSize:30, fontWeight:"900", alignSelf:"center", marginTop:15}}>UfoVni</Text>

//         <TouchableOpacity onPress={()=>takePhoto()} style={{alignItems:"center", marginTop:"60%", backgroundColor:"#0096f6", borderRadius:20}} >
//           <Text style={{color:"white", fontSize:25, fontWeight:"bold", marginBottom:10, marginTop:1}}  >Captura un Ovni </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={()=>PhthoGalery()} style={{alignItems:"center", marginTop:"60%"}} >
//           <Text >abrir galeria </Text>
//         </TouchableOpacity>
//      {
//       (tempUri) && (
              
//         <Image 
//          source={{uri:tempUri}}
//          style={{
//           marginTop:-260,
//           width:"100%",
//           height:300
//          }}
//          />

       

         
//       )
//      }

// {


// (tempUri) && (
//   <Button 
//      title="Enviar"
//      />
// )

// }
     
//     </View>

  
//   )
// }
