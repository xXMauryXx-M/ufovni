import React from "react"
import { Prueba } from '../Screen/Prueba';
import { ThemeScreen } from '../Screen/confApp/ThemeScreen';
import { PerfilScreen } from '../Screen/confApp/PerfilScreen';
import { ConfigMapScreen } from '../Screen/confApp/ConfigMapScreen';
import { createStackNavigator } from '@react-navigation/stack';

const  Stack = createStackNavigator();

export const  StackConfig = () => {



  return (
     
        <Stack.Navigator
 
        screenOptions={{
          
        headerTintColor:"white",
        headerTitleAlign:"center",
     headerStyle:{backgroundColor:"black"},
    
    
       }}
        >
        <Stack.Screen name="Prueba" component={Prueba} />
        <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
        <Stack.Screen name="ConfigMapScreen" component={ConfigMapScreen} />
    
    </Stack.Navigator>
          

  

  )
}