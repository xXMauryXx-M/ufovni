import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ButtonTabs } from './ButtonTabs';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StackConfig } from './StackConfig';
import { MapBoxs } from "../Screen/MapBoxs";
import { MenuInterno } from "../Componets/MenuInterno";
const Drawer = createDrawerNavigator()

export const MyDrawer = () => {
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

    <Drawer.Screen options={{title:"Mpabox",drawerIcon:()=>(
         <Icon name='person-outline' size={20}  color={theme.colors.primary}/>
     )}} name="MapBoxs" component={MapBoxs} />

    </Drawer.Navigator>
    </NavigationContainer>
   )
 }



  