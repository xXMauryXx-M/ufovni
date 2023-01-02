import React,{useEffect} from 'react'
import { UfoHome } from '../Screen/UfoHome';
import { ShootCamara } from '../Screen/ShootCamara';
import { SettingScreen } from '../Screen/SettingScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppState } from 'react-native';
import { checkLocationPermission } from '../Store/Permision/thunks';
//poner este dentro de un stack navigation
const Tab=createMaterialBottomTabNavigator()
 export const ButtonTabs = () => {
   


  return (
    <Tab.Navigator
    backBehavior='initialRoute' 
    sceneAnimationEnabled={true}
    barStyle={{
      height:60,
      backgroundColor:"#000"
    }}
    screenOptions={({route})=>({
      tabBarIcon:({color,focused})=>{
        let iconName:string=""
        switch (route.name) {
            case  "ShootCamara":
            iconName="barcode-outline"
            break;
            case  "UfoHome":
                iconName="navigate-outline"
            break;
        }
          return <Icon  name={iconName} size={26} color={focused ? "#0096f6" : color} />
      }
    })}>
            <Tab.Screen name='UfoHome' options={{title:"Map"}} component={UfoHome} />
            <Tab.Screen name='ShootCamara' options={{title:"Shot"}} component={ShootCamara} />
       </Tab.Navigator>
  )
}
