import React from 'react'
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { useState } from 'react';



 export const OnBoardingItems = ({item}:any,width:any) => {
 
   
    
  return (
    <View style={[styles.container,{width:352}]} >
      <Image source={item.img}  style={[styles.image,{ width:372, resizeMode:"contain"}]} />
   
   <View style={{height:80}} >
   <Text style={styles.desc} >{item.desc}</Text>
   </View>
    
  

    </View>
  )
}

const styles = StyleSheet.create({
    
    container:{
flex:1,
justifyContent:"center",
alignItems:"center"
    },

    image:{
       width:260,
       height:260,
        justifyContent:"center",
     
    },

    desc:{
        fontWeight:"bold",
        textAlign:"center",
      
        fontSize:20,
        
    }

});