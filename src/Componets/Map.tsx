import React, {useRef,useState,useMemo,useCallback,useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Image, View, TouchableOpacity, Text, Button, ActivityIndicator,  Alert, TouchableWithoutFeedback } from 'react-native';
import { mapStyle } from '../Styles/Mpa';
import { BottomSheetView,BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useLocation } from '../Hooks/useLocation';
import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import distance from '@turf/distance';
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { useSelector } from 'react-redux';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MarkerAvistamiento } from './MarkerAvistamiento';
import { BottomShettModal } from './BottomShettModal';

 export  interface GeoShot{
  hora:string,
  latitud:number,
  longitud:number,
  nombreUser:string,
  photo:string,
  key:number
}

 export const Map = () => {
  const theme = useSelector((state:any)=>state.Theme)
  const mapViewRef=useRef<MapView>()
  const [rtData, setrtData] = useState([]) 
  const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()
  const [PhotoPerfil, setPhotoPerfil] = useState<FirebaseFirestoreTypes.DocumentData>()
  const [infoUsers, setinfoUsers] = useState()  
  let site= "file://"
  const {inicialPosition,hasLocation,getCurrentLocation}= useLocation()
  const navigation= useNavigation<any>()
  let nose= "file://"

  const [infoGeoShot, setinfoGeoShot] = useState<any>({})
  const [lognpressBoll, setlognpressBoll] = useState(false)

  const [horaactual, sethoraactual] = useState("")
   // Button Sheet
  const snapPoints = useMemo(() => ["25%", "43", "63%"], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);


const [showCompass, setshowCompass] = useState(true)
//funciones button shet -navegation screen




// const handleDismisBPress = useCallback(() => {
//   if (bottomSheetRef2.current) {
//     bottomSheetRef2.current.dismiss();
//   }
// }, []);



async function onDisplayNotification(ele:any) {

  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound:"hallow", // dispotivios con android 8.0
    visibility:AndroidVisibility.PUBLIC, //se vera en la pantalla de bloqueo
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title:'<p style="color: white" fontWeight:"bold"><b>Ovni Cerca</span></p></b></p> 🛸',
    
    //ovni cerca a menos de 200 metros 
    body: `⚠️ Hay un ovni a menos de 200 metros⚠️ . `,
    android:   
    {
      importance: AndroidImportance.HIGH,
      channelId,
      color: '#0096f6',
      
      smallIcon: "ic_launcher_round",
      largeIcon:site.concat(ele.photo),
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

useEffect(() => {
  return notifee.onForegroundEvent (async({ type, detail }) => {
    const { notification, pressAction } = detail;
    switch (type) {
      case EventType.DISMISSED:
        await notifee.cancelNotification(notification?.id);
      break;
      case EventType.PRESS:

      break;
    }
  });
}, []);

//probar parte de precionar una notificacion en foregund 

   const cargarUserPhoto=()=>{
  firestore().collectionGroup("users").onSnapshot(querySnapshot=>{
    const maz:any=[]
    querySnapshot.forEach(documentSnapshot=>{
        maz.push({
            ...documentSnapshot.data(),
            key:documentSnapshot.id
        })
    })



    setPhotoPerfil(maz)
    
})
  }
  const MapearDatosPhoto=()=>{
  PhotoPerfil?.map((el:any)=>(
setinfoUsers(el.photoPerfil)
  ))
  }

 useEffect(()  => {
   
    cargarUserPhoto()
    MapearDatosPhoto()  
  }, [])
  
  
 

   const obtenerCorrd=()=>{
     rtData.map((ele:any)=>{ 
       let from = [inicialPosition.latitude, inicialPosition.longitude]
       let to = [ele.latitud, ele.longitud]
       let distances = distance(from, to, {units:"kilometers"});
       let aproximar= distances.toFixed(0);
    if( parseInt(aproximar)==0 ){
    if(ele.nombreUser==nombreUser?.nombre){
    return
   
   }else{
     onDisplayNotification(ele)
   }
  // onDisplayNotification(ele)

  }
 })}
 
 //funciones 
 const calcularNuevosReportes=()=>{
  let hours = new Date().getHours()
  let  minute = new Date().getMinutes()
  let  segundos = new Date().getSeconds()
   
  let HoraActual=`${hours-3}:${minute}:${segundos}`
 let cortar2primros= HoraActual.substring(0,2)
 sethoraactual(cortar2primros)
 
 }

 useEffect(() => {
  calcularNuevosReportes()
  loadRTdata()
 },[])

 useEffect(() => {
   obtenerCorrd()
 }, [rtData])
 



  const  handleUserLoac=async()=>{
  const {latitude, longitude}= await getCurrentLocation()
  redireccion(latitude,longitude)
 }
 const redireccion=( latitude:any,longitude:any)=>{
  mapViewRef.current?.animateCamera({
    center:{
      latitude,
      longitude
    }
  })
}
const onlongPreciondo=()=>{
  setlognpressBoll(true)
  setshowCompass(!showCompass)
}

const cancelarLongPress=()=>{
  setlognpressBoll(!lognpressBoll)
  setshowCompass(!showCompass)
}
const  loadRTdata=()=>{
  const suscriber=  firestore().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
      const maz:any=[]
      querySnapshot.forEach(documentSnapshot=>{
          maz.push({
              ...documentSnapshot.data(),
              key:documentSnapshot.id
          })
      })



      setrtData(maz)
     
      
    
      
  })
  return ()=>suscriber()
}

 if( !hasLocation ) {
  return <LoadingScreen />
 }
 const latitudeDelta = 360 / Math.pow(2, 18);
  const longitudeDelta = 360 / Math.pow(2, 18);

  return(
  <View style={{flex:1}} >
  <MapView.Animated
    onLongPress={()=>onlongPreciondo()}
    ref={(el:any)=>mapViewRef.current=el!}
    showsCompass={true}    
    userInterfaceStyle='dark'   
    zoomEnabled
    userLocationUpdateInterval={10000}
    showsUserLocation={showCompass}
    pitchEnabled
    zoomTapEnabled
    renderToHardwareTextureAndroid
    zoomControlEnabled={false}    
    customMapStyle={mapStyle  }
    style={{flex:1}}
    initialRegion={{
          latitude:inicialPosition.latitude ,
          longitude:inicialPosition.longitude,
          latitudeDelta,
          longitudeDelta
        }}
      >
    
        {  
        rtData.map((geo:GeoShot)=>  (
              <MarkerAvistamiento 
                key={geo.key}
                geo={geo}
                lognpressBoll={lognpressBoll}   
                nombreUser={nombreUser}
                setinfoGeoShot={setinfoGeoShot}
             
                />
          ))
        }

 </MapView.Animated>    

{
        lognpressBoll !==false ?
        <TouchableOpacity 
        onPress={()=>cancelarLongPress()} 
        style={{position:"absolute",top:10, right:10 }}
        >          
        <Icon name='close-circle-sharp'size={45} color={"#0096f6"}/>            
      </TouchableOpacity> 

      : <TouchableOpacity 
      activeOpacity={0.8}
      onPress={()=>handleUserLoac()} 
      style={styles.compass}
      >          
      <Icon name='compass'size={45} color={"white"}   />            
      </TouchableOpacity> 



}

      <TouchableOpacity 
          onPress={()=> navigation.openDrawer()} 
          style={{position:"absolute",top:10 }}
        >          
          <Icon name='menu-outline'size={50} color={theme.colors.border}/>            
      </TouchableOpacity> 
   

      <BottomShettModal 
      navigation={navigation} 
      infoGeoShot={infoGeoShot} 
      setinfoGeoShot={setinfoGeoShot}
      lognpressBoll={lognpressBoll} 
      mapViewRef={mapViewRef} />
    
  </View>

  

)

}


const styles = StyleSheet.create({

  compass:{
    position:"absolute",
    top:6,
    right:8,
    backgroundColor:"#0096f6",
    borderRadius:10 
  }
  

});

  export const LoadingScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:"black"
            
            
        }}>
            <ActivityIndicator 
                size={ 50 }
                color="white"
            />
  
    <Text style={{color:"white", fontSize:20, fontWeight:"600"}} >Porfavor Espere ...</Text> 
  
        </View>
    )
  }


