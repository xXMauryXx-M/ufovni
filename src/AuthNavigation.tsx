import React,{ useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { MyDrawer } from './Navigation/MyDrawer';
import { StackNavigation } from './Navigation/StackNavigation';

 export const AuthNavigation = () => {
    const [currentUser, setcurrentUser] = useState(null)
    const userHandler= (user:any)=>
    user? setcurrentUser(user) :setcurrentUser(null)
    useEffect(() => {
      //nos muetra el estado del suuario si esta logenado o no 
    auth().onAuthStateChanged(user=>userHandler(user))
    }, [])  
      return <>{currentUser ? <MyDrawer/> : <StackNavigation/> }</>
  
 
   }

