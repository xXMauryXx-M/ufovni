import react,{useEffect} from "react"
import { Platform,AppState } from 'react-native';
import { PermissionStatus, PERMISSIONS, check, request } from 'react-native-permissions';
import { askLocationPermission } from './PermisionSlide';

export const  askLocationPermission1= ()=>{
    return async(dispatch:any,nn:any)=>{        
        let resp;
        if(Platform.OS==='ios'){
              resp=await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);   
       }else{
              resp=await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);  
          
    
            }

          
          dispatch(askLocationPermission(resp))
    
      checkLocationPermission()

        }
}

export const  checkLocationPermission= ()=>{

//lo ponemos aca por que nunca se destruira cuadno se cierra la app
  

    return async(dispatch:any,nn:any)=>{
    
        
        let resp;
        if(Platform.OS==='ios'){
              resp=await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);   
       }else{
              resp=await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);  
          
    
            }
console.log(resp);

          dispatch(askLocationPermission(resp))
    
      

        }
}