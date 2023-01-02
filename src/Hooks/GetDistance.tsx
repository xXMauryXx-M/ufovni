
import React,{useEffect,useState} from "react"
import {View,Text} from "react-native"

const  gradosARadianes = (grados:any) => {
    return grados * Math.PI / 180;
  };
  
  
  export   const  getDistanciaMetros=(lat1:number, lon1:number, lat2:number, lon2:number)=> {


    // const [distancia, setdistancia] = useState<number>()

  
      // useEffect(() => {
  
      //   lat1 = gradosARadianes(lat1);
      //   lon1 = gradosARadianes(lon1);
      //   lat2 = gradosARadianes(lat2);
      //   lon2 = gradosARadianes(lon2);
      //   // Aplicar fórmula
      //   const RADIO_TIERRA_EN_KILOMETROS = 6378.137;
      //   let diferenciaEntreLongitudes = (lon2 - lon1);
      //   let diferenciaEntreLatitudes = (lat2 - lat1);
      //   let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
      //   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      //   let resultado= RADIO_TIERRA_EN_KILOMETROS * c 
      //   let  aproximar= parseInt( resultado.toFixed(3))
          
  
  
      //   setdistancia( aproximar)  
      // }, [])
      
     
      // console.log(distancia);
      
   

       return{
        //  distancia
       
        lat1, lon1, lat2, lon2
      }

  }