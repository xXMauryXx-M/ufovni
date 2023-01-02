import { Theme } from '@react-navigation/native';
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState extends Theme{
    currenTheme:"light"|"dark",
    dividerColor:string
}

export const initialState:ThemeState={
    currenTheme:"dark",
    dividerColor:"rgba(0,0,0,0.7)",
    dark:true,
    colors:{
        primary: "white",
        background: "black",
        card: "blue",
        text: "black",
        border: "#B3B6B7",
        notification:"teal"
    }

}


export const ThemeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: {
         DarkTheme:(state)=>{
            state.dark=true,
            state.colors.primary="white"
            state.colors.background="black"
            state.colors.border="grey"
         },
         LigthTheme:(state)=>{
         state.dark=false,
           state.colors.primary="white"
           state.colors.background="white"
           state.colors.border="grey"

         },
         theme:(state)=>{
        return state
        }
    }
});
export const { DarkTheme,LigthTheme } = ThemeSlice.actions;