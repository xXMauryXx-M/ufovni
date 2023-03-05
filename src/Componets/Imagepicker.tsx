import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React from 'react'
import { View, Text, Image,TouchableOpacity } from 'react-native';

interface props {
    item:any,
    setinfoGeoShot: React.Dispatch<any> ,
    handlePresentBPress:any
}

export const Imagepicker = ({item, setinfoGeoShot, handlePresentBPress}:props) => {
  
    const handleChangeDirection=(item:any)=>{
      // handleDismisBPress()
      setinfoGeoShot(item)
handlePresentBPress()
    
}
  
    return (
    <View>
    <Text style={{color:"white", fontSize:20, fontWeight:"900", marginTop:30, marginLeft:20, marginBottom:5 }} >     asdas</Text>    
    <TouchableOpacity
       onPress={()=>handleChangeDirection(item)}
       style={{alignItems:"center"}} >  
        <Image
          style={{width:200, height:200,resizeMode:"cover"}}
          source={{uri: item.photo }}
        />      
        <Text style={{color:"white",fontSize:20}} >holaa</Text>         
    </TouchableOpacity>
</View>
  )
}
