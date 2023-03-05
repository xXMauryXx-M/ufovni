import React, { useEffect, useState } from "react"
import { View, Image, StyleSheet,Text } from 'react-native';
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

 export const MenuInterno=(props:DrawerContentComponentProps)=>{
    const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>();
    useEffect(() => {
      cargarNombre()
    }, []);
    const cargarNombre=()=>{
      firestore().collection('users').doc(auth().currentUser?.email as any).get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setnombreUser(documentSnapshot.data());
        }
      })
  };
  const singout=()=>{
        auth()
       .signOut()
     };
  const theme = useSelector((state:any)=>state.Theme)
  
  console.log(nombreUser?.photoPerfil)
  
  return(
      <View style={{flex:1,backgroundColor:theme.colors.background}} >
                      <View style={{height:250,width:"100%", justifyContent:"center",alignItems:"center"}} >
                            <Image
                              source={{uri:nombreUser?.photoPerfil}}
                              style={styles.avatar}/>
                      </View>
                  
                  <DrawerContentScrollView
                    {...props}
                    >
                     <DrawerItemList {...props} />
  
                </DrawerContentScrollView>
                <DrawerItem 
                    label=""
                    labelStyle={{color:theme.colors.primary}}
                    style={{marginTop:30}}
                    onPress={()=>console.log("")}
                    icon={()=>(
                  <TouchableOpacity onPress={()=>singout()}  >
                    <Icon name='log-out-outline' size={30} color={theme.colors.primary}  />
                  </TouchableOpacity>
                  )}
                />
      </View>
    
  
    )
   }

   
   
  const styles = StyleSheet.create({
    globalMargin:{
        fontSize:20,
        marginHorizontal:20
    },
    titulo:{
        fontSize:30,
        marginBottom:10
    },
    botongrande:{
        width:100,
        height:100,
        backgroundColor:"red",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        marginRight:10
    },
    botongrandetexto:{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
    },
     avatar:{
      width:150,
      height:150,
      borderRadius:100,
      backgroundColor:"blue"
    },
    avartarContent:{
    alignItems:"center",
    marginTop:10
    },
  
    menucontenedor:{
        marginVertical:30,
        marginHorizontal:50,
        
    },
    menuText:{
        fontSize:20
    },
    menuBoton:{
        marginVertical:10
    }
    
  })