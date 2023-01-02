import React, { useState,useEffect } from "react"
import { Alert, Text, View, TouchableOpacity, Switch, Platform } from 'react-native';
import { useDispatch } from "react-redux";
import { CustomSwitch } from '../../Componets/CustomSwitch';
import { DarkTheme, LigthTheme } from "../../Store/Theme/ThemeSlice";





export const ThemeScreen=()=>{

    const [state, setstate] = useState({
        isActive:true,
    })
   const dispatch=  useDispatch()
    const {isActive}=state
   
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () =>{
      setIsEnabled(!isEnabled)
       
      } 
      console.log(isEnabled)

   const cambiarTheme=()=>{
    isActive ? dispatch(LigthTheme) : dispatch(DarkTheme)
   }


   

    return(
        <View style={{flex:1,backgroundColor:"black"}} >
              <Text style={{color:"grey", fontSize:18, fontWeight:"500", marginLeft:20,marginBottom:10, marginTop:10}} >Con esta configuracion podras cambiar el Theme de tu app</Text>
  <View style={{ borderBottomWidth:0.7 , borderBottomColor:"white",backgroundColor:"#2c2c2c", marginHorizontal:10, borderRadius:4, padding:5, flexDirection:"row"}}>  
            <Text style={{color:"white", fontSize:25, fontWeight:"500"}} >Cambiar Color</Text>
            <View style={{backgroundColor:"grey", flexDirection:"row"}} >
           
            </View>
            <View style={{flex:1, alignItems:"flex-end", justifyContent:"center"}} >
            <Switch
          trackColor={{ false: "grey", true: "#0096f6" }}
          thumbColor={(Platform.OS==="android")? "white":"red"}

          onValueChange={toggleSwitch}
          //valor actual del siwth
          value={isEnabled}
        />

            <TouchableOpacity onPress={()=>dispatch(LigthTheme())} > 
                <Text style={{color:"red"}} > Cambiar Color blanco</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>dispatch(DarkTheme())} > 
                <Text style={{color:"red"}} > Cambiar Color negro</Text> 
                </TouchableOpacity>
   
    </View>
        
        </View>
        
      
           
        </View>
      
    )
}