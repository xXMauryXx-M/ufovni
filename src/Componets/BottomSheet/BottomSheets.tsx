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


     

        </>
    )
}