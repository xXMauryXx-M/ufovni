import React,{useState} from "react"
import {Text,View} from "react-native"
import { CustomSwitch } from '../../Componets/helpers/CustomSwitch';


export const ConfigMapScreen=()=>{

  const [state, setstate] = useState({
        isActive:false,
        isHungry:false,
        isHappy:true
   
    })
   
    const {isActive,isHappy,isHungry}=state

    const onChange=(value:boolean,field:string)=>{
        setstate({
            ...state,
            [field]:value
             

        })
    }
    return(

        <View>
            <Text>en fuiturar actuilizaciones</Text>
        </View>
        // <View style={{flex:1,backgroundColor:"black"}} >
        //     <Text style={{color:"grey", fontSize:18, fontWeight:"500", marginLeft:20,marginBottom:10, marginTop:10}} >Con esta configuracion podras cambiar el Theme de tu app</Text>
        // <View style={{ borderBottomWidth:0.7 , borderBottomColor:"white",backgroundColor:"#2c2c2c", marginHorizontal:10, borderRadius:4, padding:5, flexDirection:"row"}}>  
        //           <Text style={{color:"white", fontSize:25, fontWeight:"500"}} >Cambiar A Mapa Normal</Text>
        //           <View style={{backgroundColor:"grey", flexDirection:"row"}} >
                 
        //           </View>
        //           <View style={{flex:1, alignItems:"flex-end", justifyContent:"center"}} >
        //           <CustomSwitch  isOn={isActive}  onchange={(value)=> onChange(value,"isActive") } />
        //   </View>
              
        //       </View>
              
            
                 
        //       </View>
            
    )
}