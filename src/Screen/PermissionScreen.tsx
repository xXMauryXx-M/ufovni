import React, { useContext,useEffect } from 'react'
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { check,PERMISSIONS ,PermissionStatus,request} from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { askLocationPermission } from '../Store/Permision/PermisionSlide';
import { askLocationPermission1, checkLocationPermission } from '../Store/Permision/thunks';
import { useNavigation } from '@react-navigation/native';


export const PermissionScreen = () => {
const {LocationStatus}=  useSelector((state:any)=>state.permision)
   const dispatch= useDispatch<any>()

 const navigation= useNavigation<any>()
  
 
   

  return (
    <View style={styles.container}  >  
        <Text>
            permissionScreen
        </Text>

 {(
    LocationStatus==="blocked" || LocationStatus=="denied" ?
    
    <View>
        <Text>mostrar modal que diga que la app </Text>
    </View>
    
    : 

    <View>
    <Text>ahora quitamos la modal </Text>
</View>
 )} 
  
        <Button
        title='permiso'
        onPress={()=> dispatch( askLocationPermission1())}
        />






        <Text>
            {JSON.stringify(LocationStatus)}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});
