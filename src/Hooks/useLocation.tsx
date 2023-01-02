import React,{useRef} from 'react'
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

export interface Location{
    latitude:number,
    longitude:number

}

export const useLocation = () => {
  const [hasLocation, sethasLocation] = useState(false)
const [inicialPosition, setinicialPosition] = useState<Location>({
    longitude: 0,
        latitude: 0  
})
const isMounted = useRef(true);


useEffect(() => {
    isMounted.current = true;
    return () => {
        isMounted.current = false;
    }
}, [])



    useEffect(() => {
        getCurrentLocation()
        .then( location => {

        
            setinicialPosition(location);
            sethasLocation(true);
        });

       }, [])
  

      const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
    
                },
                (err) => reject({ err }), { enableHighAccuracy: true,timeout:20000}
            );
        });
    }

    return {
        hasLocation,
        inicialPosition,
        getCurrentLocation
    }
}
