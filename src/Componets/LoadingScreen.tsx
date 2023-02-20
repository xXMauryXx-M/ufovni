import React from "react"
import {View,ActivityIndicator,Text} from "react-native"
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