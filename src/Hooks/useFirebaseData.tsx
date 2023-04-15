import React,{useState,useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';
import { UfosightingProps } from '../Componets/Mapa/Map';
import { infoUserTypes } from '../Screen/UfoHome';
import auth from '@react-native-firebase/auth';

export const useFirebaseData = () => {
    const [Ufosighting, setUfosighting] = useState<UfosightingProps[]>([])
    const [infoUser, setinfoUser] = useState<infoUserTypes>()

    useEffect(() => {
     loadRTdata()
     LoadInfoUser()
    }, [])
    

        const loadRTdata=()=>{
            const suscriber= 
            firestore().
            collectionGroup("geoShot").
            onSnapshot(querySnapshot=>{
            const array:any=[]
            querySnapshot.forEach(documentSnapshot=>{
            array.push({
            ...documentSnapshot.data(),
            key:documentSnapshot.id
            })
            })
               setUfosighting(array)       
            })
            return ()=>suscriber()
        }

        const LoadInfoUser=()=>{
        firestore().
        collection('users').
        doc(auth().currentUser?.email as any)
        .get()
          .then((documentSnapshot:any) => { 
               if(documentSnapshot.exists) {
            setinfoUser (documentSnapshot.data());
          }
        });
        }

       
        
   

    

    return {
        Ufosighting,
        infoUser,
        setUfosighting
          
    }
}
