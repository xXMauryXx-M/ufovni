import React from 'react'
import {Text, Button } from 'react-native';
import notifee, {AndroidVisibility,TimestampTrigger, TriggerType } from '@notifee/react-native';
import { useState, useEffect } from 'react';

export const SettingScreen = () => {
  const [count, setcount] = useState(0)

  async function onCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setHours(1);
    date.setMinutes(6);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp:  Date.now() + 1000 * 60  // fire at 11:10am (10 minutes before meeting)
      
    };
    console.log(date)

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'your-channel-id',
        },
      },
      trigger,
    );
  }

//esta function se abrira cuando la localizacion del usuario este serca de otro avistamineto de ovni 
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound:"hallow", // dispotivios con android 8.0
      visibility:AndroidVisibility.PUBLIC //se vera en la pantalla de bloqueo
      
    });

    // Display a notification
    await notifee.displayNotification({
  title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
  subtitle: '&#129395;',
  body:
    'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
  android: {
    channelId,
    smallIcon: 
    "ic_launcher",
    color: '#4caf50',
    actions: [
      {
        title: '<b>Dance</b> &#128111;',
        pressAction: { id: 'dance' },
      },
      {
        title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
        pressAction: { id: 'cry' },
      },
    ],
  },
})}

  useEffect(() => {
  
    comprobacion()
  }, [count])
  

const comprobacion=()=>{
  
   if(count!==0){
    onDisplayNotification()
   }else{
    console.log("todavia no se cumple")
   }

 }


  
  return (
   
   <>
    <Button title="Display Notification" onPress={() => onCreateTriggerNotification()} />
   
    <Button
    title='sumar'
    onPress={()=>setcount( count+1)}
    />


   <Text>{(count)}</Text> 
 
  </>
  )
}
