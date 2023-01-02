import React, { useRef } from 'react'
import { Animated, Easing } from 'react-native'

export const useAnimation = () => {

    const opacity = useRef(new Animated.Value(0)).current
    const position  = useRef(new Animated.Value(0)).current
  
    const fadeIn=()=>{
           Animated.timing(
               opacity,
               {
                   toValue:1,
                   duration:300,
                   //esto hace para que sea mas rapido
                   useNativeDriver:true
               }
           ).start(()=>console.log("animacion termino") )
    
    

    }

    const fadeOut=()=>{
   
          Animated.timing(
               opacity,
               {
                   toValue:0.4,
                   duration:300,
                   useNativeDriver:true
               }
          ).start()


    }

    const startPosition=( initPosition:number, duracion:number=300)=>{

    position.setValue(initPosition)

    Animated.timing(
        position,

        {
            toValue:0,
            duration:duracion,
            useNativeDriver:true
        }
    )

    }

    return{
        fadeIn,
        fadeOut,
        opacity,
        position,
        startPosition

    }
}
