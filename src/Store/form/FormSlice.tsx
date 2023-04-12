import { createSlice } from '@reduxjs/toolkit';

export interface  TypeForm{
    nombre:string,
    contraseña:number,
    correo:string,
    photoPerfil:string
}

export const initialState :TypeForm = {
 nombre:"",
 contraseña:0,
 correo:"",
 photoPerfil:""
 


  }

export const FormSlice = createSlice({
    name:"Form",
    initialState,
    reducers: {
         GiveCoreoForm:  (state,payload) => {
            state.correo=payload.payload
  
        },
        GivePasswordForm:  (state,payload) => {
            state.contraseña=payload.payload
        },
     
        GiveNombreForm:  (state,payload) => {
            state.nombre=payload.payload
  
        },
     
        GiveUrlUserForm:  (state,payload) => {
            state.photoPerfil=payload.payload
  
        },
     
     
        
        

    }
});
export const { GiveCoreoForm,GivePasswordForm,GiveNombreForm,GiveUrlUserForm } = FormSlice.actions;