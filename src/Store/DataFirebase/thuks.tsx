import  firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
export const LoadGeoShot=()=>{
    return(dispatch:any)=>{
        const suscriber=  firestore ().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
            const maz:any=[]
            querySnapshot.forEach(documentSnapshot=>{
                maz.push({
                    ...documentSnapshot.data(),
                    key:documentSnapshot.id
                })
            })
        

    })
}
}