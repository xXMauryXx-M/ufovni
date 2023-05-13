import { BottomSheetModal, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import React,{useRef,useMemo, useCallback,useEffect,useState} from "react"
import { View, Text } from 'react-native';
import { AvistamientoUfo } from "./AvistamientoUfo"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";
import { FlatlistPhoto } from './FlatlistPhoto';
import { useFocusEffect } from '@react-navigation/native';
import { BottomsAction } from './BottomsAction';
import { useLocation } from '../../Hooks/useLocation';
import { UfosightingProps } from '../Mapa/Map';
import { useFirebaseData } from '../../Hooks/useFirebaseData';
import firestore from '@react-native-firebase/firestore';
import distance from '@turf/distance';

interface infoToBottomSheetProps{
  mapViewRef:any,
  handlePresentBPress:any,
  infoGeoShot:any, 
  bottomSheetRef2:any,


}
export interface infoUserTypes{
  contraseña:String 
  correo:String,
  nombre:String,
  photoPerfil:String
}


export const BottomSheets=({     mapViewRef,handlePresentBPress, infoGeoShot, bottomSheetRef2}:infoToBottomSheetProps)=>{
  const snapPoints=useMemo(() => ["10%","26%"], []);
  const snapPoint2=useMemo(() => ["30%","60%"], []);  
  const [filteredArray, setfilteredArray] = useState<UfosightingProps[]>([])  
  const {Ufosighting,infoUser,setUfosighting} =useFirebaseData()
  const bottomSheetRef3=useRef<BottomSheetModal>(null)
  const bottomSheetref4=useRef<BottomSheetModal> (null)
  const bottomSheetRef =useRef<BottomSheetModal>(null);   
  const {hasLocation,inicialPosition}= useLocation()
  const [avistamientosCercanos, setAvistamientosCercanos] = useState([]);
  const [arrayNear, setarrayNear] = useState([])
  const [leng, setleng] = useState<number>()

  const handlePresentAPress = useCallback(() => {
    if (bottomSheetRef.current) {
     bottomSheetRef.current.present();
    }
  }, []);
  useEffect(() => {
    handlePresentAPress()
    }, [hasLocation])
    useEffect(()  => {
       loadFIlterRtData()
    }, [])
  
const handleDeismis4=useCallback(()=>{
  if(bottomSheetref4.current){
    bottomSheetref4.current.dismiss()
  }
   },[])

const handleDismisBPress = useCallback(() => {
    if (bottomSheetRef2.current) {
      bottomSheetRef2.current.dismiss();
    }
  }, []);

const redireccion=( latitude:any,longitude:any)=>{
    mapViewRef.current?.animateCamera({
      center:{
        latitude,longitude
      }
    })
  }

const handlePresent4 = () => {
  if(bottomSheetref4.current){
    bottomSheetref4.current.present()
  }
   }
   
   function distancia(lat1:number, lon1:number, lat2:number, lon2:number) {
    const radioTierra = 6371; // Radio de la Tierra en kilómetros
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c;
    return distancia;
  }




const loadFIlterRtData=()=>{
      const suscriber=  firestore().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
    
      const avistamientosCercanos:any = [];
      const avistamientoNear:any=[]
        querySnapshot.forEach(querySnapshot=>{
          const latitude=querySnapshot.data().latitud
          const longitude=querySnapshot.data().longitud
      
        

          const dis=distancia(inicialPosition.latitude,inicialPosition.longitude,latitude,longitude)

            
          if (dis > 5) {
            avistamientosCercanos.push({
              ...querySnapshot.data(),
              key:querySnapshot.id
            });
          }else{
            avistamientoNear.push({
              ...querySnapshot.data(),
              key:querySnapshot.id
            })
          }
        })
        setfilteredArray(avistamientosCercanos)
        setarrayNear(avistamientoNear)

    
      })
    return()=> suscriber()
}
const seguir=(item:any)=>{
  redireccion(item.latitud,item.longitud)
}

    return(
        <>
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
                      near={arrayNear}
                      handlePresent4={handlePresent4}
                      bottomSheetRef={bottomSheetRef}
                      bottomSheetRef3={bottomSheetRef3}
                      bottomSheetRef2={bottomSheetRef2}
                      Ufosighting={Ufosighting}
                      infoUser={infoUser}
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
                        setUfosighting={setUfosighting}
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
           infoGeoShot={infoGeoShot}
           infoUser={infoUser}
           seguir={seguir}
        />
         </BottomSheetModal>
  

     

        </>
    )
}