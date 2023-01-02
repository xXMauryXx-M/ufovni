import React, { useEffect } from 'react'
import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Easing, AppState } from 'react-native';
import { SlideScreen } from '../Screen/Register/SlideScreen';
import { AskGmail } from '../Screen/Register/AskGmail';
import { NombreScreen } from '../Screen/Register/NombreScreen';
import { SelectPhotoUset } from '../Screen/Register/SelectPhotoUset';
import { OnBoarding } from '../Screen/Home/OnBoarding';
import { LoginScreen } from '../Screen/Login/LoginScreen';
import { UfoHome } from '../Screen/UfoHome';
import { PermissionScreen } from '../Screen/PermissionScreen';
import { useSelector } from 'react-redux';
import { ButtonTabs } from './ButtonTabs';

import { checkLocationPermission } from '../Store/Permision/thunks';
import { MyDrawer } from './MyDrawer';


const Stack = createStackNavigator();

// const cutomThem:Theme={
//   dark: true, 
//   colors: {
//       primary: "red",
//       background: "balck",
//       card: "red",
//       text: "orange",
//       border: "red",
//       notification: "blue"
//   }
// }
export const StackNavigation = () => {
  const {LocationStatus}=  useSelector((state:any)=>state.permision)
  const config = {
    animation: 'spring',
    config: {
      
    }
  }
  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 200,
      easing: Easing.linear,
    }
  }

  useEffect(() => {
    AppState.addEventListener("change",state=>{
     if(state!=="active") return
     checkLocationPermission()
     console.log(state)
     
    })
     }, [])

  return (
   
    <NavigationContainer>


        <Stack.Navigator
  
  screenOptions={{
  
    // gestureEnabled:true,
 
      // transitionSpec:{
      //  open : config as any ,
      //  close:closeConfig as any
      // },
     

  
          headerShown:false
        }}
        >

 

{/* este va ser el singout*/ }
        <Stack.Screen  options={{ gestureDirection:"horizontal", cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name="SlideScreen" component={SlideScreen} />

      <Stack.Screen  options={{ gestureDirection:"horizontal", cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name='Gmail' component={AskGmail} /> 
       <Stack.Screen  options={{ gestureDirection:"horizontal", cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name='NombreScreen' component={NombreScreen} />
         <Stack.Screen  options={{ gestureDirection:"horizontal", cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name='SelectPhotoUset' component={SelectPhotoUset} />
         <Stack.Screen options={{presentation:"modal"}}  name='OnBoarding' component={OnBoarding} />
        <Stack.Screen options={{ gestureDirection:"horizontal-inverted", cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS }}  name='LoginScreen' component={LoginScreen} />  
        <Stack.Screen options={{ gestureDirection:"horizontal-inverted", cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS }}  name='ButtonTabs' component={ButtonTabs} />  
    
        <Stack.Screen options={{ gestureDirection:"horizontal-inverted", cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS }}  name='PermissionScreen' component={PermissionScreen} />  
      

       
    
    </Stack.Navigator>
          

  
    </NavigationContainer>
  )
}
