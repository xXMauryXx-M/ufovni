import React,{useCallback,useRef,useState} from 'react'
import { View } from 'react-native';
import { Map } from '../Componets/Mapa/Map';
import { BottomSheetModal, BottomSheetModalProvider,  } from '@gorhom/bottom-sheet';
import { useFirebaseData } from '../Hooks/useFirebaseData';
import { BottomSheets } from '../Componets/BottomSheet/BottomSheets';
import MapView from 'react-native-maps';

export const UfoHome = () => {
  const mapViewRef=useRef<MapView>() 
  const {Ufosighting,infoUser,setUfosighting}= useFirebaseData()
  const [infoGeoShot, setinfoGeoShot] = useState({})
  const bottomSheetRef2=useRef<BottomSheetModal>(null);

  const PassInfoToBottomShet=(ele:any)=>{  
     setinfoGeoShot(ele)
     handlePresentBPress()
    } 
   const handlePresentBPress = useCallback(() => {
    if (bottomSheetRef2.current) {
      bottomSheetRef2.current.present();
    }
  }, []);
   return (
      <View style={{flex:1}} > 
          <Map
          mapViewRef= {mapViewRef}
          Ufosighting={Ufosighting} 
          setUfosighting={setUfosighting}
          PassInfoToBottomShet={PassInfoToBottomShet}
          infoUser= {infoUser}
          /> 

      <BottomSheetModalProvider >
          <BottomSheets 
              mapViewRef= {mapViewRef}
              handlePresentBPress={handlePresentBPress}
              infoGeoShot={infoGeoShot}
              bottomSheetRef2={bottomSheetRef2}  
          />
      </BottomSheetModalProvider>

      </View>

   )}




   





/* 
//   useEffect(() => {
//     askLocationPermission1()
//    if(LocationStatus=="denied"){
//     Alert.alert(
//     "Hola Ufologo",
//     "para poder mostrar  el mapa es nesesario que aceptes los permisos de geolocalizacion  ",
//     [
//         {
//             text:"cancelar",
//             onPress:()=> Linking.openSettings() ,
//             style:"cancel"
            
//         },
//         {text:"ok",  onPress:()=> Linking.openSettings() }
//     ]
//     ,{
//         //puedes hacer click afuera para cerrarlo 
//         cancelable:false,
//         onDismiss:()=>console.log("onDesmiss")

//     })
// }
//    }, [LocationStatus])
 
  
*/

          /*
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
        */