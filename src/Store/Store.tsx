import { configureStore } from "@reduxjs/toolkit";
import {FormSlice } from './form/FormSlice';
import { PermisionSlice } from './Permision/PermisionSlide';
import { ThemeSlice } from './Theme/ThemeSlice';



export const Store=configureStore({
    reducer:{
     permision:PermisionSlice.reducer,
     form:FormSlice.reducer,
     Theme:ThemeSlice.reducer,
   
      
    }
})