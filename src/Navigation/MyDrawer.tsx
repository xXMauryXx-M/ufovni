import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ButtonTabs } from './ButtonTabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { MapBoxs } from "../Screen/MapBoxs";
import { MenuInterno } from "../Componets/Drawer/MenuInterno";

const Drawer = createDrawerNavigator()
export const MyDrawer = () => {
   return (
    <NavigationContainer
    >
    <Drawer.Navigator    
      drawerContent={(props)=> <MenuInterno {...props} /> }
      screenOptions={
      {
        headerShown:false,
         drawerContentStyle:{backgroundColor:"white"},
         drawerActiveTintColor:"white",
         drawerInactiveTintColor:"white" ,    
      }
    }
    >
    <Drawer.Screen  options={{title:"HOME",drawerIcon:()=>(
        <Icon name='planet-outline' size={20}  color={"white"}/>
    )}} name="ButtonTabs" component={ButtonTabs} />
    <Drawer.Screen options={{title:"Mpabox",drawerIcon:()=>(
         <Icon name='person-outline' size={20}  color={"white"}/>
     )}} name="MapBoxs" component={MapBoxs} /> 
    </Drawer.Navigator>
    </NavigationContainer>
   )
 }



  