import React,{useState,useEffect} from "react"
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { ButtonTabs } from './ButtonTabs';
import { View, Image, TouchableOpacity, StyleSheet, AppState } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StackConfig } from './StackConfig';
import { checkLocationPermission } from "../Store/Permision/thunks";
const Drawer = createDrawerNavigator()

export const MyDrawer = () => {

  useEffect(() => {
    AppState.addEventListener("change",state=>{
      if(state!=="active") return
    checkLocationPermission()
      
  })
   }, [])

  const theme=useSelector((state:any)=>state.Theme)
   return (
    <NavigationContainer
       theme={theme} 
    >
    <Drawer.Navigator    
      drawerContent={(props)=> <MenuInterno {...props} /> }
      screenOptions={
      {
        headerShown:false,
         drawerContentStyle:{backgroundColor:"black"},
         drawerActiveTintColor:theme.colors.primary,
         drawerInactiveTintColor:theme.colors.border ,    
      }
    }
    >
    <Drawer.Screen  options={{title:"HOME",drawerIcon:()=>(
        <Icon name='planet-outline' size={20}  color={theme.colors.primary}/>
    )}} name="ButtonTabs" component={ButtonTabs} />
     <Drawer.Screen options={{title:"CUENTA",drawerIcon:()=>(
         <Icon name='person-outline' size={20}  color={theme.colors.primary}/>
     )}} name="Article" component={StackConfig} /> 

    </Drawer.Navigator>
    </NavigationContainer>
   )
 }

const MenuInterno=(props:DrawerContentComponentProps)=>{
  
  const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()
  
  const cargarNombre=()=>{
    firestore().collection('users').doc(auth().currentUser?.email as any).get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        setnombreUser (documentSnapshot.data());
      }
    });} 
    const singout=()=>{
      auth()
     .signOut()
     .then(() => console.log('User signed out!'));
   }
    useEffect(() => {
      cargarNombre()
    }, [])
 
const theme = useSelector((state:any)=>state.Theme)
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

  
 export const styles = StyleSheet.create({
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
    borderRadius:100
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