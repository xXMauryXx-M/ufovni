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

interface GeoShot{
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
  const [horaactual, sethoraactual] = useState("")
   // Button Sheet
  const snapPoints = useMemo(() => ["25%", "43", "63%"], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef2 = useRef<BottomSheetModal>(null);
const [lognpressBoll, setlognpressBoll] = useState(false)
const [showCompass, setshowCompass] = useState(true)
//funciones button shet -navegation screen
const handlePresentAPress = useCallback(() => {
  if (bottomSheetRef.current) {
    bottomSheetRef.current.present();
  }
}, []);
const ShowReport = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(2);
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
const handleDismissAPress = useCallback(() => {
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
  const cargarNombre=()=>{
  firestore().collection('users').doc(auth().currentUser?.email as any).get()
  .then(documentSnapshot => {
    if (documentSnapshot.exists) {
      setnombreUser (documentSnapshot.data());
    }
  });
  }
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


 useEffect(()  => {
    loadRTdata()
    cargarNombre()
    cargarUserPhoto()
    MapearDatosPhoto()  
  }, [])
  
  
  useEffect(() => {
    handlePresentAPress()
    }, [hasLocation])

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
 },[])

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

const handleChangeDirection=(item:any)=>{
    setinfoGeoShot(item)
 handlePresentBPress()

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
const onlongPreciondo=()=>{
  setlognpressBoll(true)
  setshowCompass(!showCompass)
}

const cancelarLongPress=()=>{
  setlognpressBoll(!lognpressBoll)
  setshowCompass(!showCompass)
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
  // onLongPress={()=>Alert.alert("longpress222")}
  ref={(el:any)=>mapViewRef.current=el!}
  showsCompass={true}
// onMapReady={()=>{
//   mapViewRef.current?.setCamera(

//     {
//     zoom:12,
//     duration:4000
    
    
//   }



//   )

// }}
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


<Marker

  onPress={()=>PassInfoToBottomShet(geo,lognpressBoll)}             
       coordinate={{
          latitude:geo.latitud,
          longitude:geo.longitud
       }}
       key={geo.key}
     > 
     {/* <TouchableOpacity onLongPress={()=>Alert.alert("ejucuion")} >
     <Text style={{position:"absolute",fontSize:0}} >hola</Text>
     </TouchableOpacity> */}



{lognpressBoll ?  
<Image
style={{
  position:"relative",
  width:42,
  height:42,
  tintColor:geo.nombreUser==nombreUser?.nombre? "" : "white",
}}
 source={ geo.nombreUser==nombreUser?.nombre?   require("../assets/beard.png") :null } 
 
 />


:

<Image 
style={{
      position:"relative",
      width:42,
      height:42,
      tintColor:geo.nombreUser==nombreUser?.nombre? "" : "white",
    }}
    source={ geo.nombreUser==nombreUser?.nombre?  require("../assets/beard.png") :  require("../assets/ufo.png")  } />


}


    
  </Marker>

 

      
        )
       )
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

:   <TouchableOpacity 
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
          <Icon name='menu-outline'size={50} color={theme.colors.border}/>            
      </TouchableOpacity> 
   

    


    <BottomSheetModalProvider>
        <BottomSheetModal
             style={{flex:1}}
             index={0}
             ref={bottomSheetRef}
             snapPoints={snapPoints}
             backgroundStyle={{backgroundColor:"black"}}
             handleIndicatorStyle={{backgroundColor:"white"}}
             enablePanDownToClose={false}
      >
          <BottomSheetView focusHook={useFocusEffect} style={{flex:1}}>
                  <Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>   Hola {nombreUser?.nombre}!  </Text>               
                  <View style={styles.buttonContainer} >      
                          <TouchableOpacity onPress={()=>navigation.navigate("ShootCamara")}  style={{backgroundColor:"#0096f6",borderRadius:10,padding:10, width:120}} >
                            <Text style={{color:"white", fontSize:20, paddingHorizontal:10, fontWeight:"900"}} >Capturar</Text>
                          </TouchableOpacity>
                      
                          <TouchableOpacity  onPress={()=>navigation.openDrawer()} style={{backgroundColor:"#7A7575",borderRadius:10, padding:10, width:120}} >
                            <Text style={{color:"white", fontSize:20, paddingHorizontal:14,fontWeight:"900"}} >Cuenta</Text>
                          </TouchableOpacity>

                        <TouchableOpacity onPress={()=>ShowReport()}  style={{backgroundColor:"#DE1C14",borderRadius:10, padding:10, width:120}}  >
                            <Text style={{color:"white", fontSize:20, paddingHorizontal:3,fontWeight:"900"}}  >Resportes</Text>
                        </TouchableOpacity>
                  </View>
                  <Text style={styles.textReportsUltimos} >   Ultimos Reportesss {infoGeoShot.hora } </Text>
          </BottomSheetView>
     
          <BottomSheetFlatList
             horizontal
             showsHorizontalScrollIndicator
             ItemSeparatorComponent={()=>{
             return(<View style={{paddingHorizontal:4}} /> )}}
             data={rtData}
             renderItem={({item}:any)=>{
           
              return(
               <View>
                    <Text style={{color:"white", fontSize:20, fontWeight:"900", marginTop:30, marginLeft:20, marginBottom:5 }} >     {item?.nombreUser ==nombreUser?.nombre ? "Tu" : item?.nombreUser}</Text>    
                    <TouchableOpacity 
                       onPress={()=>handleChangeDirection(item)}
                       style={{alignItems:"center"}} >  
                        <Image
                          style={{width:190, height:190,resizeMode:"cover"}}
                          source={{uri: item.photo }}
                        />               
                    </TouchableOpacity>
                </View>
              )
             }}
             > 
          </BottomSheetFlatList> 
         </BottomSheetModal>

{lognpressBoll? 

<BottomSheetModal
style={{flex:1}}
index={1}
ref={bottomSheetRef2}
snapPoints={snapPoints}
backgroundStyle={{backgroundColor:"black"}}
handleIndicatorStyle={{backgroundColor:"white"}}
>
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

</BottomSheetModal>



 : 


<BottomSheetModal
style={{flex:1}}
index={1}
ref={bottomSheetRef2}
snapPoints={snapPoints}
backgroundStyle={{backgroundColor:"black"}}
handleIndicatorStyle={{backgroundColor:"white"}}
>
<BottomSheetView  focusHook={useFocusEffect} style={{flex:1}}>         
<View>
   
    <TouchableOpacity onPress={()=>handleDismissAPress()}>
       <Icon style={{position:"absolute", right:0}}  name='close-outline' size={35}color="white" />
    </TouchableOpacity>
</View>
<Text style={{color:"white", marginLeft:20}} >{infoGeoShot.nombreUser ==nombreUser?.nombre ? "Tu publicacion" : "No es tu poblicacion" }</Text>
 <Text style={{color:"white", fontSize:20, fontWeight:"bold",alignSelf:"center"}}>{infoGeoShot.user} <Text style={{fontSize:15}} >{infoGeoShot.hora}</Text>   </Text>
<View style={{alignItems:"center"}} >
  <Image style={{width:300, height:260}} source={{uri:  infoGeoShot.photo  }}  />  
</View>
<View style={{justifyContent:"space-around", flexDirection:"row", marginTop:"10%"}} >


  <TouchableOpacity  onPress={()=>seguir(infoGeoShot)}  style={{backgroundColor:"#0096f6",borderRadius:10,padding:10, width:120}} >
      <Text style={{color:"white", fontSize:20, paddingHorizontal:20, fontWeight:"900"}} >Seguir</Text>
  </TouchableOpacity>
</View>
</BottomSheetView>

</BottomSheetModal>






}
         
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
  buttonContainer:{
    justifyContent:"space-around",
    flexDirection:"row",
   marginTop:"10%"

  },
  botonActions:{

  },
  textReportsUltimos:{
    color:"white",
     fontSize:20,
      fontWeight:"900",
       marginTop:30,
        marginLeft:10,
         marginBottom:5
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


