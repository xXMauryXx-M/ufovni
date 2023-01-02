import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { Provider} from 'react-redux';
import { Store } from './src/Store/Store';
import { AuthNavigation } from './src/AuthNavigation';
import { enableLatestRenderer } from 'react-native-maps';
import notifee,{EventType} from '@notifee/react-native';
 enableLatestRenderer();
export const App = () => {  
  useEffect(() => {
    SplashScreen.hide()
     }, [])
     

    // escucha notificaciones en background
      notifee.onBackgroundEvent(async ({ type, detail }) => {
       const { notification, pressAction } = detail;
       if (type === EventType.ACTION_PRESS ) {
       console.log( "hola somos deails:",detail)
         // Remove the notification
          await notifee.cancelNotification(notification?.id!);
       }
     });

  return (
    
            <Provider store={Store} >
                    <AuthNavigation/>
            </Provider>
  )
}
