import react,{useEffect} from "react"
import { createSlice } from '@reduxjs/toolkit';
import { PermissionStatus, request,PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';




interface TypePermision{
LocationStatus: PermissionStatus
}

export const initialState :TypePermision = {
LocationStatus:"unavailable",


  }

export const PermisionSlice = createSlice({
    name: "permision",
     
    initialState,
    reducers: {
         askLocationPermission:  (state,payload) => {
        
            state.LocationStatus=payload.payload
     
            
         
        
        },
        
        

    }
});
export const { askLocationPermission } = PermisionSlice.actions;