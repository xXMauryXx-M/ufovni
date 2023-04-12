import React from "react"
import Icon from 'react-native-vector-icons/Ionicons';
import {View,Text, FlatList, TouchableOpacity, Button } from"react-native"
import {useNavigation} from "@react-navigation/native"

import { Item } from "react-native-paper/lib/typescript/components/List/List";
import auth from '@react-native-firebase/auth';
import { AjustesItem } from "../DataFlatlistLogin/ListUtilitesApp";

export const Prueba=()=>{

  
  const singout=()=>{
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }

   const navigation=useNavigation<any>()

  return(
    <View style={{flex:1, backgroundColor:"black"}}  > 
         
         
         <View style={{flexDirection:"row", flex:1}} >
         
              
          </View>
    
<View style={{marginBottom:500}} >
<Text style={{color:"#929191",  fontWeight:"500", fontSize:18, marginBottom:10, marginLeft:10 }} >Ajustes</Text>
<FlatList

data={AjustesItem}
renderItem={({item})=>{
  return(
    <View style={{flex:1}} >

    <TouchableOpacity onPress={()=>navigation.navigate(item.componet)} style={{ borderBottomWidth: (item.name=="configuraciones mapa") ?0 : 0.7 , borderBottomColor:"white",backgroundColor:"#282626", marginHorizontal:10, borderRadius:4, padding:5, flexDirection:"row",paddingVertical:10}}> 
    <Text style={{color:"white", borderRadius:1, fontSize:20,marginLeft:40, fontWeight:"500" ,padding:5}} >{item.name}</Text>
    <View style={{flex:1, alignItems:"flex-end", justifyContent:"center"}} >
     <Icon style={{justifyContent:"center"}}  name="chevron-forward-outline" size={20} color="white" />
    </View>

    <View style={{ position:"absolute", top:10, left:10, alignItems:"flex-start", justifyContent:"center"}} >
     <Icon style={{justifyContent:"center"}}  name={item.icon} size={25} color="white" />
    </View>
    
  
    </TouchableOpacity>

    
    
      
    </View>
      
      )
}}
/>
</View>

<TouchableOpacity  onPress={()=>navigation.openDrawer()} style={{ position:"absolute", bottom:400, left:10, right:100,  width:300}} >
    <Icon name="arrow-back" size={40}  color="white" style={{textAlign:"left"}} />
    </TouchableOpacity>   


  <TouchableOpacity  onPress={()=>singout()} style={{backgroundColor:"#282626", position:"absolute", bottom:10, left:45, padding:10,  width:300, borderRadius:10}} >
    <Text style={{color:"red", textAlign:"center",fontSize:20, fontWeight:"600"}} >Cerrar Sesíon</Text>
    </TouchableOpacity>    




        </View> 
     
    
 
   )
}