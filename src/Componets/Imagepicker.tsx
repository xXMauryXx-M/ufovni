import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React from 'react'
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface props {
    item:any,
    setinfoGeoShot: React.Dispatch<any> ,
    handlePresentBPress: any,
    nombreUser:FirebaseFirestoreTypes.DocumentData | undefined
}

export const Imagepicker = ({item,setinfoGeoShot,handlePresentBPress,nombreUser}:props) => {
  
    const handleChangeDirection=(item:any)=>{
      setinfoGeoShot(item)
      handlePresentBPress()

}
  
    return (
    <View>
    <Text style={{color:"white", fontSize:20, fontWeight:"900", marginTop:30, marginLeft:20, marginBottom:5 }} >     {item?.nombreUser ==nombreUser?.nombre ? "Tu" : item?.nombreUser}</Text>    
    <TouchableOpacity
       onPress={()=>handleChangeDirection(item)}
       style={{alignItems:"center"}} >  
        <Image
          style={{width:200, height:200,resizeMode:"cover"}}
          source={{uri: item.photo }}
        />               
    </TouchableOpacity>
</View>
  )
}
