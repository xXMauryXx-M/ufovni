import React,{useState,useEffect} from "react"
import distance from "@turf/distance";
import { View, Text, TouchableOpacity, Image,useWindowDimensions, ActivityIndicator, ImageEditor, Button } from 'react-native';


interface props{
    handleDeismis4: () => void,
    item:any,
    setUfosighting:any,
    handlePresentBPress:any,
    inicialPosition:any
}

export const FlatlistPhoto=({item,setUfosighting,handlePresentBPress,inicialPosition}:props)=>{
   const {height,width}=useWindowDimensions()
   const [loadingImage,setloadingImage,]=useState(false)
   const [distanceKilometros, setdistanceKilometros] = useState("")
   const handleChangeDirection=(item:any)=>{      
  // setinfoGeoShot(item)
  // handlePresentBPress()
  console.log("click")
  }

const distanceUfowithYou=()=>{

     let from = [inicialPosition.latitude, inicialPosition.longitude]
     let to = [item.latitud, item.longitud]
     let distances = distance(from, to, {units:"kilometers"});
     let aproximar= distances.toFixed(0);
     if( parseInt( aproximar)==0){
     }
     setdistanceKilometros(aproximar)
    
    
}


  useEffect(() => {
   distanceUfowithYou()
  }, [inicialPosition])
  
   
    return(
        <View>
            <TouchableOpacity onPress={()=>handleChangeDirection(item)} style={{marginTop:60}}>
            <Text style={{color:"black",marginLeft:10,fontSize:19}} >Distancia:
               
           
                 <Text style={{fontWeight:"bold",fontSize:17,marginLeft:40}} >
                 {distanceKilometros} KM
                </Text>
             
               

               
            </Text>
                <TouchableOpacity onPress={()=>console.log("as")} >
                <Image 
                 key={Math.random()}
                 resizeMode="contain"
                  style={{width:width/2,height:height/3,borderRadius:10}}
                  source={{uri:item.photo}}
                  onLoadStart={()=> setloadingImage(true)}
                  onLoadEnd={()=>setloadingImage(false)}
                  />
                  </TouchableOpacity>           
                      
                  
                  
         
                  {
                    loadingImage &&
                    <ActivityIndicator size={40} color={"white"} />                   
                  }
                
            </TouchableOpacity>
        </View>
    )
}