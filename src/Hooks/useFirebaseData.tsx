import React,{useState,useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';
import { UfosightingProps } from '../Componets/Mapa/Map';

import auth from '@react-native-firebase/auth';
import { infoUserTypes } from '../Componets/BottomSheet/BottomSheets';

export const useFirebaseData = () => {
    const [Ufosighting, setUfosighting] = useState<UfosightingProps[]>([])
    const [infoUser, setinfoUser] = useState<infoUserTypes>()
    const [countOfsighting, setcountOfsighting] = useState<number>()
    useEffect(() => {
UploadInfoUser()
UploadUFOsightings()
getAllUfoUserightinSg()
    }, [])
    
    const UploadInfoUser=()=>{
        firestore().collection('users').doc(auth().currentUser?.email as any).get()
        .then(documentSnapshot => {
          if(documentSnapshot.exists) {
            setinfoUser(documentSnapshot.data() as any);
          }
        });
      }
      
      const UploadUFOsightings=()=>{
        const suscriber=  firestore().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
            const Ufosightins:any=[]
            querySnapshot.forEach(documentSnapshot=>{
              Ufosightins.push({
                    ...documentSnapshot.data(),
                    key:documentSnapshot.id
                })
            })
            setUfosighting(Ufosightins)     
        })
        return ()=>suscriber()
      }
       
      const getAllUfoUserightinSg=()=>{
       
        const suscriber=firestore().collection("users").doc(auth().currentUser?.email as any).collection("geoShot").onSnapshot(querySnapshot=>{
          const UfosightinsCount:any=[]
          querySnapshot.forEach((sightings,i)=>{
          
            UfosightinsCount.push({
              ...sightings.data(),
              key:sightings.id
            })
            setcountOfsighting(UfosightinsCount.length);

            
          })
        })

        return ()=>suscriber()
      }
        
   

    

    return {
        Ufosighting,
        infoUser,
        setUfosighting,
        countOfsighting          
    }
}
