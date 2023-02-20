import React,{useEffect} from 'react'
import { View, Linking, Alert } from 'react-native';
import { Map } from '../Componets/Map';
import { useSelector } from 'react-redux';
import { askLocationPermission1 } from '../Store/Permision/thunks';
export const UfoHome = () => {
  const {LocationStatus}=  useSelector((state:any)=>state.permision)
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
  
   return (
        <View style={{flex:1}} >     
            <Map/> 
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