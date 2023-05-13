import React,{useEffect,useRef,useState} from "react"
import { ActivityIndicator, View, Text,  TouchableOpacity, Alert, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useCameraDevices,  Camera} from "react-native-vision-camera"
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UseHours } from '../Hooks/UseHour';
import auth from '@react-native-firebase/auth';
import { useLocation } from "../Hooks/useLocation";
import { useSelector } from 'react-redux';

export const ShootCamara = () => {
  const isFOcused= useIsFocused()
  const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()
  const [urlFirebaseStore, seturlFirebaseStore] = useState("")
  const [botonprecionado, setbotonprecionado] = useState(false)
  const devices=useCameraDevices()
  const device= devices.back
  const {formattedTime}=UseHours()
  const {inicialPosition}= useLocation()
  const {width,height} =useWindowDimensions()
  const camera = useRef<Camera>(null)
  const {photoPerfil}=  useSelector((state:any)=>state.form)
  useEffect(() => {
    LoadInfoUser()
     }, [])
const LoadInfoUser=()=>{
     firestore().collection('users').doc(auth().currentUser?.email as any).get()
     .then(documentSnapshot => {
       if (documentSnapshot.exists) {
         setnombreUser (documentSnapshot.data());
       }
     }); 
   }
const uploadUfoSingting=()=>{      
    try { 
      firestore().
      collection("users").
      doc(auth().currentUser?.email as any )
      .collection("geoShot")
      .add({
          latitud:inicialPosition.latitude,
          longitud:inicialPosition.longitude,
          photo:urlFirebaseStore,
          nombreUser:nombreUser?.nombre,
          hora:formattedTime,
          photoPerfil:photoPerfil
 }).then(()=>{
 Alert.alert("subido con exito")
 })

    } catch (error) {
   Alert.alert(error as any)
    }
   
   }

const sacarPhoto=async()=>{
    setbotonprecionado(true)
    try {
      const photo = await camera.current!.takePhoto ({
        enableAutoRedEyeReduction:true,
        flash:"off"
        

      })   

      let cortarUrl=photo.path.substring(40,58)
      const reference = storage().ref( `avistamietnosUser/${nombreUser?.nombre}/${cortarUrl}` )
      await reference.putFile(photo.path);
      
      const url = await storage().ref(`avistamietnosUser/${nombreUser?.nombre}/${cortarUrl}`).getDownloadURL()
     console.log(url)
      seturlFirebaseStore(url)
    } catch (error:any) {
      Alert.alert(error)
    
    }
  }
const back=()=>{
  seturlFirebaseStore("")
  setbotonprecionado(!botonprecionado)
 }
 if (device == null) return <ActivityIndicator style={{marginTop:"50%"}}  color={"white"} size={60} />
 if(botonprecionado===true){
  if(urlFirebaseStore =="")
  return <Loading />
 }


  return(
     <View style={style.contianer} >  
    {
      //if Url is empty,we are going to show camara,other wise the Image
          urlFirebaseStore == "" 
          ?  
            <Camera
            ref={camera}
            photo={true}
            style={style.DimisionCamara}
            device={device}
            isActive={isFOcused}
            preset="photo"
            enableZoomGesture 
            zoom={128}      
          />
        :
         <Image
          style={[style.image,{ width:width *4,height:height *0.8,}]}
          source={{uri:urlFirebaseStore}} 
         />
     
  }
    {
      //if camara is avilable and urlFirebaseStore is empty , that want to say is before caputure camara
      Camera &&
      <View style={{position:"absolute",alignItems:"center", left:0,right:0,top:80}} >
         <TouchableOpacity onPress={()=>sacarPhoto()} >
    {
    urlFirebaseStore == ""
    &&
   
    <View style={{flex:1}} >
          <Icon style={{marginTop:height/1.4}} name="ellipse-outline" size={60} color="white" />   
     
    </View>
    
  } 
    </TouchableOpacity>
      </View>
           
    }


{/*  botones de aceptar la foto o no*/}

 <View style={style.containerCheckMark} > 
       <TouchableOpacity onPress={()=>uploadUfoSingting()} style={style.checkmark}  >
          <Icon name="checkmark" size={40} color="black" />   
        </TouchableOpacity>  
  </View>
      
    <TouchableOpacity onPress={()=>back()} style={style.arrowBack}  >
    <Icon style={{alignItems:"center", marginHorizontal:88}} color={"black"} name="arrow-back-circle-sharp" size={40}  />
      </TouchableOpacity>
        
</View>
  )
}
const Loading=()=> {
return(
  <View style={{flex:1}} >
<ActivityIndicator style={{marginTop:"50%"}}  color={"black"} size={60} />
  <Text style={{color:"black", fontSize:20,fontWeight:"600",alignSelf:"center"}} >Espere un Momento</Text>
  </View>
  
)
}


const style=StyleSheet.create({
  contianer:{
    flex:1,
    backgroundColor:"white",
    
  },
  image:{
    position:"relative",
   
    alignSelf:"center",
    resizeMode:"contain"
  },
  DimisionCamara:{
    width:"100%",
    height:"100%"
  },
  CaputureIcon:{
    justifyContent:"flex-end",
    color:"white",
    height:60,
     width:60 
     ,marginLeft:20, 
     marginTop:510
  },
  checkmark:{
    position:"absolute",
    bottom:-55,
    left:260
  },
  containerCheckMark:{
    alignItems:"center",
    justifyContent:"center",
     flex:1
  },
  arrowBack:{
    backgroundColor:"white", 
    width:250,
    padding:10
  },
  ContainerCpatureIcon:{
    position:"absolute",alignItems:"center", left:0,right:0,top:80
  }
})

 
/*//      const requestCamaraPermision=useCallback(async()=>{
//      const permision=await Camera.requestCameraPermission() 
//       if(permision=="denied") await   Linking.openSettings()
//    setpermissionsCamara(permision)
// },[]) */