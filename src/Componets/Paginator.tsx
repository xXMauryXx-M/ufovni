import { View, Text, StyleSheet, useWindowDimensions, Animated } from 'react-native';
import React from 'react'

export const Paginator=({data,scrollx}:any)=> {
    const {width}= useWindowDimensions()
  return (
    <View style={{flexDirection:"row", height:64, alignItems:"center", justifyContent:"center"}} >
        {
            data.map((_:any,i:any)=>{
                const inputRange=[(i-1)* width, i*width,(i+1)*width]
              const dotWith=scrollx.interpolate({
                inputRange,
                outputRange:[10,20,10],
                extrapolate:"clamp"
              })

              const opacity=scrollx.interpolate({
                inputRange,
                outputRange:[0.3,1,0.3],
                extrapolate:"clamp"

              })
return < Animated.View style={[styles.dot,{width:dotWith,opacity,}]} key={i.toString()} >
  

</Animated.View>
            })
        }
     
    </View>
  )
}

const styles = StyleSheet.create({
    
    dot:{
height:10,
borderRadius:5,
backgroundColor:"#0096f6",
marginHorizontal:8
    }
});