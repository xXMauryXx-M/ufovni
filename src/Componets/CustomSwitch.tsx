import React, { useState } from 'react'
import { Switch, Platform } from 'react-native';

interface Props{
    isOn:boolean
    onchange:(value:boolean)=>void
}

export const CustomSwitch = ({isOn,onchange}:Props) => {
    const [isEnabled, setIsEnabled] = useState(isOn)
    const toggleSwitch = () =>{
      setIsEnabled(!isEnabled)
         onchange(!isEnabled) 
      } 
        
  return (
    <Switch
    //ñas cpmfiguracion del tack color y thum colo es mas que anda para androd ya que no se ve bien pero igual sirve para ambops 
          trackColor={{ false: "grey", true: "#0096f6" }}
          //este es la pelotita del swithc
          thumbColor={(Platform.OS==="android")? "white":"red"}
          // ios_backgroundColor="#3e3e3e"
          //hace lo contario cuando cambia 
          onValueChange={toggleSwitch}
          //valor actual del siwth
          value={isEnabled}
        />
  )
}
