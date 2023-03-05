import React, {useRef,useState,useMemo,useCallback,useEffect } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { mapStyle } from '../../Styles/Mpa';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {  useFocusEffect, useNavigation } from '@react-navigation/native';
import { useLocation } from '../../Hooks/useLocation';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import distance from '@turf/distance';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';

import { BottomsAction } from '../BottomSheet/BottomsAction';
import { AvistamientoUfo } from '../BottomSheet/AvistamientoUfo';
import { Imagepicker } from '../BottomSheet/Imagepicker';
import { Markers } from './Markers';
// import { LoadingScreen } from '../helpers/LoadingScreen';
interface GeoShot{
  hora:string,
  latitud:number,
  longitud:number,
  nombreUser:string,
  photo:string,
  key:number
}
 export const Map = () => {
   let site= "file://"
   const mapViewRef=useRef<MapView>()
   const [rtData, setrtData] = useState([]) 
   const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()  
   const {inicialPosition,hasLocation,getCurrentLocation}= useLocation()
   const navigation= useNavigation<any>()
   const [infoGeoShot, setinfoGeoShot] = useState<any>({})
   // Button Sheet
   const snapPoints = useMemo(() => ["25%", "43", "63%"], []);
   const bottomSheetRef = useRef<BottomSheetModal>(null);
   const bottomSheetRef2 = useRef<BottomSheetModal>(null);
   const bottomSheetRef3=useRef<BottomSheetModal>(null)
   const [lognpressBoll, setlognpressBoll] = useState(false)
   const [showCompass, setshowCompass] = useState(true)
  
   //funciones button shet -navegation screen
const handlePresentAPress = useCallback(() => {
    if (bottomSheetRef.current) {
    bottomSheetRef.current.present();
   }
  }, []);
const handlePresentBPress = useCallback(() => {
  if (bottomSheetRef2.current) {
    bottomSheetRef2.current.present();
  }
}, []);
const handleDismisBPress = useCallback(() => {
  if (bottomSheetRef2.current) {
    bottomSheetRef2.current.dismiss();
  }
}, []);
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
  handlePresentAPress()
  }, [hasLocation])

  useEffect(()  => {
    loadRTdata()   
  }, [])

    useEffect(() => {
       cargarNombre() 
   }, [])

  const cargarNombre=()=>{
    firestore().collection('users').doc(auth().currentUser?.email as any).get()
    .then(documentSnapshot => {
      if(documentSnapshot.exists) {
        setnombreUser (documentSnapshot.data());
      }
    });
  }

const loadRTdata=()=>{
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
    //manda la notificacion de ovni cerca 
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
 useEffect(() => {
   obtenerCorrd()
 }, [rtData])
 
 const PassInfoToBottomShet=(ele:GeoShot,longpress:boolean)=>{  

if(longpress) {
  if(ele.nombreUser==nombreUser?.nombre){
    setinfoGeoShot(ele)
    handlePresentBPress()
  }else{
    return
  }
}else{
  setinfoGeoShot(ele)
  handlePresentBPress()
}
 } 
const seguir=(item:any)=>{
  redireccion(item.latitud,item.longitud)
  handleDismisBPress()
  bottomSheetRef.current?.snapToIndex(0)
}
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

 if( !hasLocation ) {
  return <Text>carga</Text>
 }
const latitudeDelta = 360 / Math.pow(2, 18);
const longitudeDelta = 360 / Math.pow(2, 18);
  return(
  <View style={{flex:1}} >  
    <MapView.Animated
      onLongPress={()=>onlongPreciondo()}
      ref={(el:any)=>mapViewRef.current=el!}
      showsCompass={false}
      showsScale={false}
      minZoomLevel={15}
      maxZoomLevel={15}
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
            <Markers
               PassInfoToBottomShet={PassInfoToBottomShet}
               geo={geo}
               lognpressBoll={lognpressBoll}
               nombreUser={nombreUser}
            /> 
     ))}
    </MapView.Animated>    
      {
        lognpressBoll !==false ?
        <TouchableOpacity        
        onPress={()=>cancelarLongPress()} 
        style={{position:"absolute",top:10, right:10 }}
      >          
        <Icon name='close-circle-sharp'size={45} color={"#0096f6"}/>            
        </TouchableOpacity>         
        :
        <TouchableOpacity 
      activeOpacity={0.8}
      onPress={()=>handleUserLoac()} 
      style={styles.compass}
      >          
      <Icon name='compass'size={45} color={"white"}   />            
        </TouchableOpacity> 
      }
        <TouchableOpacity      
          onPress={()=>  navigation.openDrawer()} 
          style={{position:"absolute",top:10 }}
        >          
          <Icon name='menu-outline'size={50} color={"white"}/>            
        </TouchableOpacity> 
  
      <BottomSheetModalProvider>
        <BottomSheetModal
             style={{flex:1}}
             ref={bottomSheetRef}
             snapPoints={snapPoints}
             backgroundStyle={{backgroundColor:"black"}}
             handleIndicatorStyle={{backgroundColor:"white"}}
             enablePanDownToClose={false}
             detached={true}
             enableOverDrag={false}
             
            >
              <BottomSheetView focusHook={useFocusEffect} style={{flex:1}}>
              <BottomsAction 
              bottomSheetRef={bottomSheetRef}
              bottomSheetRef3={bottomSheetRef3}
              bottomSheetRef2={bottomSheetRef2}
              infoGeoShot={infoGeoShot}
              />  
            

              </BottomSheetView>
               
          <BottomSheetFlatList
              enableFooterMarginAdjustment
              horizontal={true}
              key={Math.random()}
              showsHorizontalScrollIndicator
              ItemSeparatorComponent={()=>{return(<View style={{paddingHorizontal:4}} />)}}
              data={rtData}
              renderItem={({item}:any)=>{           
              return(
                 <Imagepicker
                   item={item}
                   setinfoGeoShot={setinfoGeoShot}
                   handlePresentBPress={handlePresentBPress}
                 /> 
              )
             }}
             > 
          </BottomSheetFlatList> 
         </BottomSheetModal>
{/* 
     {lognpressBoll? 
        <BottomSheetModal
          style={{flex:1}}
          index={1}
          ref={bottomSheetRef3}
          snapPoints={snapPoints}
          backgroundStyle={{backgroundColor:"black"}}
          handleIndicatorStyle={{backgroundColor:"white"}}>
           <BorrarAction 
              infoGeoShot={infoGeoShot}
              handleDismisBPress={handleDismisBPress}
          /> 
    </BottomSheetModal>
      : */}
       <BottomSheetModal
          style={{flex:1}}
          index={1}
          ref={bottomSheetRef2}
          snapPoints={snapPoints}
          backgroundStyle={{backgroundColor:"black"}}
          handleIndicatorStyle={{backgroundColor:"white"}}
       >
       <AvistamientoUfo
         handleDismissAPress={handleDismisBPress()}
         infoGeoShot={infoGeoShot}
         nombreUser={nombreUser}
         seguir={seguir}
      />  
       </BottomSheetModal>
 
      </BottomSheetModalProvider>
  </View>
)
}
const styles = StyleSheet.create({
    
  container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",   
  },

  imageUFO:{
    position:"relative",
    width:42,
    backgroundcolor:"red",
    height:42,
    tintColor:"white",

  },
  compass:{
    position:"absolute",
    top:6,
    right:8,
    backgroundColor:"#0096f6",
    borderRadius:10 
  },

});
