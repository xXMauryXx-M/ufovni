import React, { useMemo,useRef,useCallback ,useState,useEffect} from "react"
import { Text, View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BottomSheetView,BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import  Icon  from "react-native-vector-icons/Ionicons";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import { useLocation } from '../Hooks/useLocation';

export const BottomShettModal=({navigation, infoGeoShot,setinfoGeoShot,lognpressBoll,mapViewRef}:any)=>{
    const [rtData, setrtData] = useState([]) 
    const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()
    const {inicialPosition,hasLocation,getCurrentLocation}= useLocation()
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

  const cargarNombre=()=>{
    firestore().collection('users').doc(auth().currentUser?.email as any).get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        setnombreUser (documentSnapshot.data());
      }
    });
    }
  useEffect(() => {
    loadRTdata()
    cargarNombre()
  }, [])
  
  useEffect(() => {
    handlePresentAPress()
    }, [hasLocation])
   
    const handleChangeDirection=(item:any)=>{
        setinfoGeoShot(item)
     handlePresentBPress()
    
    }
    const BorrarPublicacion=(doc:any)=>{

    //     Alert.alert(
    //       "señor ufologo",
    //       "esta apunto de eliminar completamente el avistamiento de la base de datos, si precionas ok no se borrara y sirviria de analisis  ",
    //       [
    //           {
    //               text:"ok",
    //               onPress:()=>{
    //                 firestore().collection("BaseDeDatosAvistamientos").add({
    //                   hora:doc.hora,
    //                   latitud:doc.latitud,
    //                   longitud:doc.longitud,
    //                   photo:doc.photo
    //                 }).then(()=>{
    //                   try {
    //                     firestore()
    //                     .collection('users').doc(auth().currentUser?.email as any).collection("geoShot")
    //                     .doc(doc.key)
    //                     .delete()
    //                     .then(() => {
                       
    //                       handleDismisBPress()
    //                     }).catch(()=>{
    //                       Alert.alert("hubo un error")
    //                     }) 
    //                   } catch (error) {
    //                     Alert.alert("hubo un error")
    //                   }  
    //                 })
                   
                      
                  
                    
    //               },
    //               style:"cancel"
                  
    //           },
    //           {text:"borrar",  onPress:()=>{
    //             try {
    //               firestore()
    //               .collection('users').doc(auth().currentUser?.email as any).collection("geoShot")
    //               .doc(doc.key)
    //               .delete()
    //               .then(() => {
    //                 Alert.alert("Avistamiento borrado")
    //               }).catch(()=>{
    //                 Alert.alert("hubo un error")
    //               }) 
    //             } catch (error) {
    //               Alert.alert("hubo un error")
    //             }
    //           } }
    //       ]
    //       ,{
    //           //puedes hacer click afuera para cerrarlo 
    //           cancelable:false,
         
      
    //       }
    //   )
       
       
      
      }
      const redireccion=( latitude:any,longitude:any)=>{
        mapViewRef.current?.animateCamera({
          center:{
            latitude,
            longitude
          }
        })
      }

      const seguir=(item:any)=>{
        redireccion(item.latitud,item.longitud)
        handleDismisBPress()
        bottomSheetRef.current?.snapToIndex(0)
      }

    
    const snapPoints = useMemo(() => ["25%", "43", "63%"], []);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const bottomSheetRef2 = useRef<BottomSheetModal>(null);

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


    return(
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
                  <Text style={styles.textReportsUltimos} >   Ultimos Reportes {infoGeoShot.hora } </Text>
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
{/* termina */}
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
  