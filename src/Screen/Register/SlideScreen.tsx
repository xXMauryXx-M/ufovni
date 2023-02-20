import React, { useState } from 'react'
import { View, Text, Linking, ImageSourcePropType, SafeAreaView, Dimensions, Image, StyleSheet, Touchable, Animated, Alert } from 'react-native';

import Carousel,{Pagination} from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAnimation } from '../../Hooks/useAnimation';
import { OnBoarding } from '../../Componets/OnBoarding';

// identifica O.V.N.I.s y subelo al mapa GPS para que mas personas lo vean
//Descubre O.V.N.I.S serca de tu ubicacion
//Observa las Zonas Con mas Avistamientos de la Semana

 const {width,height}= Dimensions.get("window")

//aca debemoa de pasar todo la info del resgister a la base de datos



export const SlideScreen = () => {
    const navigation= useNavigation<any>()


  return (
        <SafeAreaView
        style={{
            flex:1,
            paddingTop:110
        }}
        >
       

      

  

          <View style={{
              flexDirection:"row", 
          justifyContent:"space-between",
          marginHorizontal:20,
          alignItems:"center"
          
          }} >

         
      
         <OnBoarding/>

         


   

          </View>

          <TouchableOpacity 
        
          onPress={()=>navigation.navigate("Gmail")}
                style={styles.button}
                activeOpacity={0.8}
                >
               <Text style={{fontSize:20, color:"white" }} > !Vamos! </Text>
            
            </TouchableOpacity>



          <TouchableOpacity
                style={styles.button2}
                activeOpacity={0.8}
                onPress={()=>navigation.navigate("LoginScreen")}
                >

                <Text style={{    fontSize:20,  color:"#0096f6"}} >inciar seccion</Text>
          
         </TouchableOpacity>



         <TouchableOpacity onPress={()=>console.log("hola polita de provacidad")} >
           <Text style={{textAlign:"center", marginBottom:20}} >Al cotinuar,aceptas las{"\n"}
           <Text style={{color:"#0096f6"}} >condiciones de servicio</Text> y la <Text style={{color:"#0096f6"}} >Politica de privacidad</Text>
            </Text>
        
  </TouchableOpacity>
        </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({

    titulo:{
        fontSize:30,
        fontWeight:"bold",
        color:"#0096f6"

    },

    subtitle:{
fontSize:22,
color:"black",
fontWeight:"bold",
textAlign:"center"

    },
    button:{
        flexDirection:"row",
        backgroundColor:"#0096f6",
        width:350,
        marginBottom:10,
        height:50,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:20
    },
    button2:{
        flexDirection:"row",
        backgroundColor:"#FaFaf3",
        width:350,
        
        height:50,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:40,
        marginLeft:20
    }
    
});
