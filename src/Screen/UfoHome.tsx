import React,{useCallback, useEffect,useMemo,useRef,useState} from 'react'
import { View, Linking, Alert, TouchableOpacity } from 'react-native';
import { Map, UfosightingProps } from '../Componets/Mapa/Map';
import { useSelector } from 'react-redux';
import { askLocationPermission1 } from '../Store/Permision/thunks';
import firestore from '@react-native-firebase/firestore';
import { useLocation } from '../Hooks/useLocation';
import distance from '@turf/distance';
import { BottomSheets } from '../Componets/BottomSheet/BottomSheets';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { useFocusEffect } from '@react-navigation/native';
import { BottomsAction } from '../Componets/BottomSheet/BottomsAction';
import { FlatlistPhoto } from '../Componets/BottomSheet/FlatlistPhoto';
import { Text } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { AvistamientoUfo } from '../Componets/BottomSheet/AvistamientoUfo';
import auth from '@react-native-firebase/auth';

 export interface infoUserTypes{
  contraseña:String 
  correo:String,
  nombre:String,
  photoPerfil:String
}
export const UfoHome = () => {
  const [filteredArray, setfilteredArray] = useState<UfosightingProps[]>([])  
  const {inicialPosition,hasLocation}= useLocation()
  const {LocationStatus}=  useSelector((state:any)=>state.permision)
  const [nombreUser, setnombreUser] = useState([])
  const [rtData, setrtData] = useState([])
  const [infoGeoShot, setinfoGeoShot] = useState({})
  const handlePresentAPress = useCallback(() => {
  if (bottomSheetRef.current) {
  bottomSheetRef.current.present();
 }
}, []);
  useEffect(() => {
    askLocationPermission1()
   if(LocationStatus=="denied"){
    Alert.alert(
    "Hola Ufologo",
    "para poder mostrar  el mapa es nesesario que aceptes los permisos de geolocalizacion  ",
    [
        {
            text:"cancelar",
            onPress:()=> Linking.openSettings() ,
            style:"cancel"
            
        },
        {text:"ok",  onPress:()=> Linking.openSettings() }
    ]
    ,{
        //puedes hacer click afuera para cerrarlo 
        cancelable:false,
        onDismiss:()=>console.log("onDesmiss")

    })
}
   }, [LocationStatus])
   useEffect(()  => {
    loadFIlterRtData()
  }, [])
// const getaAllUfoSightings=()=>{
//           Ufosighting.map((ele:any)=>{
//             let from = [inicialPosition.latitude, inicialPosition.longitude]
//             let to = [ele.latitud, ele.longitud]
//             let distances = distance(from, to, {units:"kilometers"});
//             let aproximar= distances.toFixed(0);
//          if( parseInt(aproximar)==0 ){
//          if(ele.nombreUser==infoUser?.nombre){
//          return
    
//         }else{
//          //  onDisplayNotification(ele)
//         }
//        // onDisplayNotification(ele)
    
//       }
//       })}



const cargarNombre=()=>{
  firestore().collection('users').doc(auth().currentUser?.email as any).get()
  .then(documentSnapshot => {
    if(documentSnapshot.exists) {
      setnombreUser (documentSnapshot.data() as any);
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




const loadFIlterRtData=()=>{
        const suscriber=  firestore().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
        const arrayFilter:any=[]
          querySnapshot.forEach(querySnapshot=>{
            const latitude=querySnapshot.data().latitud
            const longitude=querySnapshot.data().longitud
        
            let from = [inicialPosition.latitude, inicialPosition.longitude]
       
            let to = [latitude, longitude]
            let distances = distance(from, to, {units:"kilometers"});
            let aproximar= distances.toFixed(0);
     
              if(parseInt(aproximar)!==0||parseInt(aproximar)<0 ){
                arrayFilter.push({
                  ...querySnapshot.data(),
                  key:querySnapshot.id
                 })
              }else{
                return null
              }
       
     
          })
          setfilteredArray(arrayFilter)
        })
      return()=> suscriber()
}
const redireccion=( latitude:any,longitude:any)=>{
   //export bad way 
    // mapViewRef.current?.animateCamera({
    //  center:{
    //    latitude,
    //    longitude
    //  })
    console.log("click")
}
const seguir=(item:any)=>{
   redireccion(item.latitud,item.longitud)
 
}
const snapPoints=useMemo(() => ["10%","26%"], []);
const snapPoint2=useMemo(() => ["30%","60%"], []);
const bottomSheetRef =useRef<BottomSheetModal>(null);  
const bottomSheetRef2=useRef<BottomSheetModal>(null);
const bottomSheetref4=useRef<BottomSheetModal> (null)
const bottomSheetRef3=useRef<BottomSheetModal>(null)
const  PassInfoToBottomShet=(ele:any)=>{  

 

    setinfoGeoShot(ele)
    handlePresentBPress()
  
   } 
  

const handlePresent4 = () => {
  if(bottomSheetref4.current){
    bottomSheetref4.current.present()
  }
   }
const handleDeismis4=useCallback(()=>{
  if(bottomSheetref4.current){
    bottomSheetref4.current.dismiss()
  }
   },[])

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

  useEffect(() => {
   handlePresentAPress()
 }, [])


   return (
<View style={{flex:1}} > 
    <Map
     handlePresentBPress={handlePresentBPress}
     rtdata={rtData} 
     setrtData={setrtData}
     PassInfoToBottomShet={PassInfoToBottomShet}
     nombreUser= {nombreUser}
     />

  
  <BottomSheetModalProvider  >
   

  <BottomSheetModal
              style={{flex:1}}
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              backgroundStyle={{backgroundColor:"white"}}
              handleIndicatorStyle={{backgroundColor:"black"}}
              enablePanDownToClose={false}
             >
               <BottomSheetView focusHook={useFocusEffect} style={{flex:1}}>
               <BottomsAction
               handlePresent4={handlePresent4}
               bottomSheetRef={bottomSheetRef}
               bottomSheetRef3={bottomSheetRef3}
               bottomSheetRef2={bottomSheetRef2}
               infoGeoShot={rtData}
                infoUser={nombreUser}
               />


               </BottomSheetView>



          </BottomSheetModal>

          <BottomSheetModal
              style={{flex:1}}
              ref={bottomSheetref4}
              snapPoints={["50%"]}
              backgroundStyle={{backgroundColor:"white"}}
              handleIndicatorStyle={{backgroundColor:"black"}}
              enablePanDownToClose={false}
              enableOverDrag={false}
             >

     <BottomSheetFlatList
     enableFooterMarginAdjustment
     horizontal={true}
     key={Math.random()}
     showsHorizontalScrollIndicator
     ItemSeparatorComponent={()=>{return(<View style={{paddingHorizontal:4}} />)}}
     data={filteredArray}
     renderItem={({item}:any)=>{
      return(
         <FlatlistPhoto
           item={item}
           handleDeismis4={handleDeismis4}
           setinfoGeoShot={setrtData}
           handlePresentBPress={handlePresentBPress}
           inicialPosition ={inicialPosition}
       
     />
   )
  }}
 >
          </BottomSheetFlatList>
               <Text style={{color:"black",fontSize:25,position:"absolute",top:0,marginHorizontal:10}} >Avistamientos Lejos de ti</Text>
           <View  style={{position:"absolute",top:0,right:0}} >
            <TouchableOpacity onPress={()=>handleDeismis4()} >
              <Icon name='close-outline' size={20} /> 
           
            </TouchableOpacity>
           </View>
           
          </BottomSheetModal>



        <BottomSheetModal
           style={{flex:1}}
           ref={bottomSheetRef2}
           snapPoints={snapPoint2}
           backgroundStyle={{backgroundColor:"white"}}
           handleIndicatorStyle={{backgroundColor:"black"}}
        >
        <AvistamientoUfo
          // handleDismissAPress={handleDismisBPress()}
          infoGeoShot={rtData}
          nombreUser={nombreUser}
          seguir={seguir}
       />
        </BottomSheetModal>
  </BottomSheetModalProvider>
</View>

    )
  }

          {/*
        TODO:
        notas del proyecto
        *  cuando el usuario saque una foto esta function sera la que corra para crear el marcador no se usara set cordenasas si no que se procedera a subir a firebase y despues se resivira para ponerla en el mapa con la informacion de firebaseel has location puedes poner un activiti inidcator pero no le veo muhco la utilidad
         <Circle 
          center={{latitude:-33.42570000 , longitude:-70.686130000}}
          radius={1000}
          fillColor="red"
          zIndex={999}
          strokeColor="blue"
          strokeWidth={4}
          lineJoin="round"
        />

         async function checkNotificationPermission() {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
  console.log("autorizacion denegada")
    }
    }


      //elevar a la app 
// useEffect(() => {
//   return notifee.onForegroundEvent (async({ type, detail }) => {
//     const { notification, pressAction } = detail;
//     switch (type) {
//       case EventType.DISMISSED:
//         await notifee.cancelNotification(notification?.id!);
//       break;
//       case EventType.PRESS:

//       break;
//     }
//   });
// }, []);
        */}