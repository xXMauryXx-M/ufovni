import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import React,{useRef,useMemo, useCallback,useEffect} from "react"
import { View, Text } from 'react-native';
import { AvistamientoUfo } from "./AvistamientoUfo"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";
import { FlatlistPhoto } from './FlatlistPhoto';
import { useFocusEffect } from '@react-navigation/native';
import { BottomsAction } from './BottomsAction';
import { useLocation, Location } from '../../Hooks/useLocation';
import { UfosightingProps } from '../Mapa/Map';
import { infoUserTypes } from '../../Screen/UfoHome';
import { useFirebaseData } from '../../Hooks/useFirebaseData';

interface infoToBottomSheetProps{
    filteredArray: UfosightingProps[],
    inicialPosition:Location,
    getaAllUfoSightings:any,
    seguir: (item: any) => void
    gg:any,
    bottomSheetRefa:any,
bottomSheetRef2:any
bottomSheetRef3:any
bottomSheetref4:any
handlePresent4:any 
handleDeismis4:any 
handlePresentBPress:any
handleDismisBPress:any
snapPoints:any
snapPoint2:any

}



export const BottomSheets=({filteredArray,inicialPosition,getaAllUfoSightings,seguir,gg,bottomSheetRefa,bottomSheetRef2,bottomSheetRef3,bottomSheetref4,handlePresent4,handleDeismis4,handlePresentBPress,handleDismisBPress,snapPoints,snapPoint2}:infoToBottomSheetProps)=>{
const {Ufosighting,infoUser,setUfosighting} =useFirebaseData()

console.log(Ufosighting)
   const {getCurrentLocation,hasLocation}= useLocation()
 
   useEffect(() => {
     getaAllUfoSightings()
   }, [Ufosighting])
//  useEffect(() => {
//     filteredArray()
//  }, [])


  
   useEffect(() => {
    gg()
}, [hasLocation])




    return(
        <>


         <BottomSheetModal
              style={{flex:1}}
              ref={bottomSheetRefa}
              snapPoints={snapPoints}
              backgroundStyle={{backgroundColor:"white"}}
              handleIndicatorStyle={{backgroundColor:"black"}}
              enablePanDownToClose={false}
             >
               <BottomSheetView focusHook={useFocusEffect} style={{flex:1}}>
               <BottomsAction
               handlePresent4={handlePresent4}
               bottomSheetRef={bottomSheetRefa}
               bottomSheetRef3={bottomSheetRef3}
               bottomSheetRef2={bottomSheetRef2}
               infoGeoShot={Ufosighting}
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
           setinfoGeoShot={setUfosighting}
           handlePresentBPress={handlePresentBPress}
           inicialPosition ={inicialPosition}
       
     />
   )
  }}
 >
          </BottomSheetFlatList>
               <Text style={{color:"black",fontSize:25,position:"absolute",top:0,marginHorizontal:10}} >Avistamientos Lejos de ti</Text>
           <View  style={{position:"absolute",top:0,right:0}} >
              <Icon name='close-outline' size={20} onPress={()=>handleDismisBPress()}  />
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
          handleDismissAPress={handleDismisBPress()}
          infoGeoShot={Ufosighting}
          nombreUser={infoUser}
          seguir={seguir}
       />
        </BottomSheetModal>

     

        </>
    )
}