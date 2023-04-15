import React,{useRef,useState} from "react"
import {View,Text, StyleSheet,TouchableOpacity} from "react-native"
import MapView from "react-native-maps"
import  Icon  from "react-native-vector-icons/Ionicons"
import { useLocation } from "../../Hooks/useLocation"
import { mapStyle } from "../../MapStyle/Mpa"
import { Markers } from "./Markers"
export interface UfosightingProps {
   hora:string,
   latitud:number,
   longitud:number,
   nombreUser:string,
   photo:string,
   key:number
 }

export const Map=({handlePresentBPress,data,setdata,Ufosighting,infoUser}:any)=>{

  const [showCompass,setshowCompass] = useState(true)
  const {inicialPosition,getCurrentLocation}= useLocation()
  const mapViewRef=useRef<MapView>() 

  const  handleUserLocation=async()=>{
  const {latitude, longitude}= await getCurrentLocation()
       redirection(latitude,longitude)
     }
     const redirection=(latitude:number,longitude:number)=>{
       mapViewRef.current?.animateCamera({
         center:{
           latitude,
           longitude
         }
       })
      }


         

 return(
<View style={{flex:1}} >
     <MapView
     key={Math.random()*123}
      ref={(el:any)=>mapViewRef.current=el!}
       rotateEnabled
        maxZoomLevel={18}
       showsCompass={false}
       showsScale={false}      
       userLocationUpdateInterval={10000}
       showsUserLocation={showCompass}
       pitchEnabled
       renderToHardwareTextureAndroid
       zoomControlEnabled={false}
       customMapStyle={mapStyle}
       style={{flex:1}}
       initialRegion={{
             latitude:inicialPosition.latitude ,
             longitude:inicialPosition.longitude,
             longitudeDelta:0,
             latitudeDelta:0             
           }}
     >

       {
         Ufosighting.map((geos:UfosightingProps)=>  (
             <Markers  
                 geos={geos}    
                 handlePresentBPress={handlePresentBPress}
                 infoUser={infoUser!}  
                 setdata={setdata}      
                                                              
                />
      ))}
     </MapView>
       
         <TouchableOpacity
       activeOpacity={0.8}
       onPress={()=>handleUserLocation()}
       style={style.compass}
       >
       <Icon name='compass'size={45} color={"white"}   />
         </TouchableOpacity>
      
</View>
  )
   


}


const style=StyleSheet.create({
  contianer:{
    flex:1
  },
  
    compass:{
           position:"absolute",
           top:6,
           right:8,
           backgroundColor:"#0096f6",
           borderRadius:10
         },
  
})



















// import React, {useRef,useState,useMemo,useCallback,useEffect } from 'react'
// import MapView from 'react-native-maps'
// import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// import { mapStyle } from '../../MapStyle/Mpa';
// import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {  useFocusEffect, useNavigation } from '@react-navigation/native';
// import { useLocation } from '../../Hooks/useLocation';
// import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import distance from '@turf/distance';
// import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
// import { BottomsAction } from '../BottomSheet/BottomsAction';
// import { AvistamientoUfo } from '../BottomSheet/AvistamientoUfo';
// import { Markers } from './Markers';
// import { FlatlistPhoto } from '../BottomSheet/FlatlistPhoto';
import { infoUserTypes } from '../../Screen/UfoHome';
import { useFirebaseData } from '../../Hooks/useFirebaseData';

// interface GeoShot{
//   hora:string,
//   latitud:number,
//   longitud:number,
//   nombreUser:string,
//   photo:string,
//   key:number
// }
//  export const Map = () => {
//   // const [handleDeismis4,handlePresent4,handleDismisBPress,handlePresentBPress]=bottomSheetFunction
//   const bottomSheetRef2=useRef<BottomSheetModal>(null);
//   const bottomSheetref4=useRef<BottomSheetModal> (null)
//   const bottomSheetRef3=useRef<BottomSheetModal>(null)
//   const snapPoints=useMemo(() => ["10%","26%"], []);
//   const snapPoint2=useMemo(() => ["30%","60%"], []);

//    const bottomSheetRef=useRef<BottomSheetModal>(null);
//    const mapViewRef=useRef<MapView>()
//    const [rtData, setrtData] = useState([])
//    const [FilterrtData, setFilterrtData] = useState([])
//    const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()
//    const {inicialPosition,hasLocation,getCurrentLocation}= useLocation()
//    const navigation= useNavigation<any>()
//    const [infoGeoShot, setinfoGeoShot] = useState<any>({})
//    let site= "file://"
//    const [lognpressBoll,setlognpressBoll] = useState(false)
//    const [showCompass,setshowCompass] = useState(true)


//   const handlePresent4 = useCallback(() => {
//     if (bottomSheetRef.current) {
//         bottomSheetref4.current?.present()
//      }
//     }, []);
   
//      const handleDeismis4=useCallback(()=>{
//       if(bottomSheetref4.current){
//         bottomSheetref4.current.dismiss()
//       }
//     },[])
  
//      const handlePresentBPress = useCallback(() => {
//     if (bottomSheetRef2.current) {
//       bottomSheetRef2.current.present();
//     }
//   }, []);
//     const handleDismisBPress = useCallback(() => {
//     if (bottomSheetRef2.current) {
//       bottomSheetRef2.current.dismiss();
//     }
//   }, []);
  

// const handleLowerSnap=()=>{
//   if (bottomSheetRef.current) {

//   }
// }
//  const handlePresentAPress = useCallback(() => {
//   if (bottomSheetRef.current) {
//   bottomSheetRef.current.present();
//  }
// }, []);
// async function onDisplayNotification(ele:any) {

//   // Request permissions (required for iOS)
//   await notifee.requestPermission()

//   // Create a channel (required for Android)
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     sound:"hallow", // dispotivios con android 8.0
//     visibility:AndroidVisibility.PUBLIC, //se vera en la pantalla de bloqueo
//     importance: AndroidImportance.HIGH,
//   });

//   // Display a notification
//   await notifee.displayNotification({
//     title:'<p style="color: white" fontWeight:"bold"><b>Ovni Cerca</span></p></b></p> 🛸',

//     //ovni cerca a menos de 200 metros
//     body: `⚠️ Hay un ovni a menos de 200 metros⚠️ . `,
//     android:
//     {
//       importance: AndroidImportance.HIGH,
//       channelId,
//       color: '#0096f6',

//       smallIcon: "ic_launcher_round",
//       largeIcon:site.concat(ele.photo),
//       // pressAction is needed if you want the notification to open the app when pressed
//       pressAction: {
//         id: 'default',
//       },
//     },
//   });
// }
// useEffect(() => {
//   handlePresentAPress()
//   }, [hasLocation])
//   useEffect(()  => {
//     LoadInfoUser()
//     loadRTdata()
//   }, [])
//   useEffect(() => {
//     getaAllUfoSightings()
//   }, [rtData])
// useEffect(() => {
//   loadFIlterRtData()
// }, [])
// const LoadInfoUser=()=>{
//     firestore().collection('users').doc(auth().currentUser?.email as any).get()
//     .then(documentSnapshot => {
//       if(documentSnapshot.exists) {
//         setnombreUser (documentSnapshot.data());
//       }
//     });
//   }
// const loadRTdata=()=>{
//     const suscriber=  firestore().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
//         const maz:any=[]
//         querySnapshot.forEach(documentSnapshot=>{
//             maz.push({
//                 ...documentSnapshot.data(),
//                 key:documentSnapshot.id
//             })
//         })



//         setrtData(maz)




//     })
//     return ()=>suscriber()
// }
// const loadFIlterRtData=()=>{
//   const suscriber=  firestore().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
//   const arrayFilter:any=[]
//     querySnapshot.forEach(querySnapshot=>{
//       const latitude=querySnapshot.data().latitud
//       const longitude=querySnapshot.data().longitud
   
//       let from = [inicialPosition.latitude, inicialPosition.longitude]
  
//       let to = [latitude, longitude]
//       let distances = distance(from, to, {units:"kilometers"});
//       let aproximar= distances.toFixed(0);

//         if(parseInt(aproximar)!==0||parseInt(aproximar)<0 ){
//           arrayFilter.push({
//             ...querySnapshot.data(),
//             key:querySnapshot.id
//            })
//         }else{
//           return null
//         }
  

//     })
//     setFilterrtData(arrayFilter)
//   })
// return()=> suscriber()
// }
//  //access all UFO sightings and if it is nearby send a notification
// const getaAllUfoSightings=()=>{
//      rtData.map((ele:any)=>{
//        let from = [inicialPosition.latitude, inicialPosition.longitude]
//        let to = [ele.latitud, ele.longitud]
//        let distances = distance(from, to, {units:"kilometers"});
//        let aproximar= distances.toFixed(0);
//     if( parseInt(aproximar)==0 ){
//     if(ele.nombreUser==nombreUser?.nombre){
//     return

//    }else{
//     //  onDisplayNotification(ele)
//    }
//   // onDisplayNotification(ele)

//   }
//  })}
//  //funciones

//  const PassInfoToBottomShet=(ele:GeoShot,longpress:boolean)=>{

// if(longpress) {
//   if(ele.nombreUser==nombreUser?.nombre){
//     setinfoGeoShot(ele)
//     handlePresentBPress()
//   }else{
//     return
//   }
// }else{
//   setinfoGeoShot(ele)
//   handlePresentBPress()
// }
//  }
// const seguir=(item:any)=>{
//   redireccion(item.latitud,item.longitud)
// handleLowerSnap()
// }
// const  handleUserLoac=async()=>{
//   const {latitude, longitude}= await getCurrentLocation()
//   redireccion(latitude,longitude)
//  }
// const redireccion=( latitude:any,longitude:any)=>{
//   mapViewRef.current?.animateCamera({
//     center:{
//       latitude,
//       longitude
//     }
//   })

// }
// const onlongPreciondo=()=>{
//   setlognpressBoll(true)
//   setshowCompass(!showCompass)
// }
// const cancelarLongPress=()=>{
//   setlognpressBoll(!lognpressBoll)
//   setshowCompass(!showCompass)
// }

//  if( !hasLocation ) {
//   return <Text>cargando ... </Text>
//  }
// const latitudeDelta = 360 / Math.pow(2, 18);
// const longitudeDelta = 360 / Math.pow(2, 18);
//   return(
//   <View style={{flex:1}} >
//     <MapView
//       onLongPress={()=>onlongPreciondo()}
//       ref={(el:any)=>mapViewRef.current=el!}
//        rotateEnabled
//       showsCompass={false}
//       showsScale={false}
//        minZoomLevel={13}
//       userLocationUpdateInterval={10000}
//       showsUserLocation={showCompass}
//       pitchEnabled
//       renderToHardwareTextureAndroid
//       zoomControlEnabled={false}
//       customMapStyle={mapStyle  }
//       style={{flex:1}}
//       initialRegion={{
//             latitude:inicialPosition.latitude ,
//             longitude:inicialPosition.longitude,
//             latitudeDelta,
//             longitudeDelta
//           }}
//     >

//       {

//        rtData.map((geo:GeoShot)=>  (
//             <Markers
//                PassInfoToBottomShet={PassInfoToBottomShet}
//                geo={geo}
//                lognpressBoll={lognpressBoll}
//                nombreUser={nombreUser}
//             />
//      ))}
//     </MapView>
//       {
//         lognpressBoll !==false ?
//         <TouchableOpacity
//         onPress={()=>cancelarLongPress()}
//         style={{position:"absolute",top:10, right:10 }}
//       >
//         <Icon name='close-circle-sharp'size={45} color={"#0096f6"}/>
//         </TouchableOpacity>
//         :
//         <TouchableOpacity
//       activeOpacity={0.8}
//       onPress={()=>handleUserLoac()}
//       style={styles.compass}
//       >
//       <Icon name='compass'size={45} color={"white"}   />
//         </TouchableOpacity>
//       }


//       <BottomSheetModalProvider>
//         <BottomSheetModal
//              style={{flex:1}}
//              ref={bottomSheetRef}
//              snapPoints={snapPoints}
//              backgroundStyle={{backgroundColor:"white"}}
//              handleIndicatorStyle={{backgroundColor:"black"}}
//              enablePanDownToClose={false}
//             >
//               <BottomSheetView focusHook={useFocusEffect} style={{flex:1}}>
//               <BottomsAction
//               handlePresent4={handlePresent4}
//               bottomSheetRef={bottomSheetRef}
//               bottomSheetRef3={bottomSheetRef3}
//               bottomSheetRef2={bottomSheetRef2}
//               infoGeoShot={infoGeoShot}
//                infoUser={nombreUser}
//               />


//               </BottomSheetView>



//          </BottomSheetModal>

//          <BottomSheetModal
//              style={{flex:1}}
//              ref={bottomSheetref4}
//              snapPoints={["50%"]}
//              backgroundStyle={{backgroundColor:"white"}}
//              handleIndicatorStyle={{backgroundColor:"black"}}
//              enablePanDownToClose={false}
//              enableOverDrag={false}
//             >

//     <BottomSheetFlatList
//     enableFooterMarginAdjustment
//     horizontal={true}
//     key={Math.random()}
//     showsHorizontalScrollIndicator
//     ItemSeparatorComponent={()=>{return(<View style={{paddingHorizontal:4}} />)}}
//     data={FilterrtData}
//     renderItem={({item}:any)=>{
//      return(
//         <FlatlistPhoto
//           item={item}
//           handleDeismis4={handleDeismis4}
//           setinfoGeoShot={setinfoGeoShot}
//           handlePresentBPress={handlePresentBPress}
//           inicialPosition ={inicialPosition}
       
//     />
//   )
//  }}
// >
//          </BottomSheetFlatList>
//               <Text style={{color:"black",fontSize:25,position:"absolute",top:0,marginHorizontal:10}} >Avistamientos Lejos de ti</Text>
//               <TouchableOpacity  style={{position:"absolute",right:0,top:0}} onPress={() => handleDeismis4()}>
//                   <Icon name='close-outline' color={"red"} size={40} />
//               </TouchableOpacity>
//          </BottomSheetModal>



//        <BottomSheetModal
//           style={{flex:1}}
//           ref={bottomSheetRef2}
//           snapPoints={snapPoint2}
//           backgroundStyle={{backgroundColor:"white"}}
//           handleIndicatorStyle={{backgroundColor:"black"}}
//        >
//        <AvistamientoUfo
//          handleDismissAPress={handleDismisBPress()}
//          infoGeoShot={infoGeoShot}
//          nombreUser={nombreUser}
//          seguir={seguir}
//       />
//        </BottomSheetModal>

//       </BottomSheetModalProvider>
//   </View>
// )
// }
// const styles = StyleSheet.create({

//   container:{
//       flex:1,
//       justifyContent:"center",
//       alignItems:"center",
//   },

//   imageUFO:{
//     position:"relative",
//     width:42,
//     backgroundcolor:"red",
//     height:42,
//     tintColor:"white",

//   },
//   compass:{
//     position:"absolute",
//     top:6,
//     right:8,
//     backgroundColor:"#0096f6",
//     borderRadius:10
//   },

// });
