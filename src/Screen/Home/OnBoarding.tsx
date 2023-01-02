import React,{ useEffect} from 'react'
import { Text, View, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { askLocationPermission1 } from '../../Store/Permision/thunks';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"


export const OnBoarding = () => {
  const {correo,contraseña,nombre,photoPerfil}=  useSelector((state:any)=>state.form)
 const nanvigation= useNavigation<any>()
  const dispatch= useDispatch<any>()
    useEffect(() => {

     nanvigation.setOptions({
        presentation:"modal",
        gestureDirection:"vertical",
     })
      
    }, [])
    

    const onSingup =async()=>{
      try {
      //  const authuser= await auth().createUserWithEmailAndPassword(email, password)
      const authuser= await auth().createUserWithEmailAndPassword(correo, contraseña)
        
       firestore().collection("users").doc(authuser.user.email as any).set({
        correo,
        contraseña,
        nombre,
        photoPerfil

       })
        

       
      

      } catch (error) {
      console.log( "hols soy error", error);
      
      }

    }
  return (
    <>
  
    <View style={styles.container} >
        <Text style={{fontWeight:"500", color:"white", fontSize:25, marginTop:10}} >Permisos</Text>
        
        <Text style={{textAlign:"center", color:"grey", marginTop:5}} >Elige las opciones azules destacatas en las sieguientes pantallas</Text>
   
   <View style={{flexDirection:"row", justifyContent:"center", marginBottom:30, marginTop:30}} >
   <View style={{flex:0.8}} >
   <Image style={{width:100, height:100, }} source={require("../../assets/geolocalizacion3.png")} />
   </View>


  <View style={{flexDirection:"column", justifyContent:"center"}} >
     <Text style={{color:"white", fontSize:20, fontWeight:"600"}} >Geolocaliacion</Text>
      <Text  style={{color:"#0096f6", fontWeight:"bold"}} >● Permitir al usar la app </Text>
    <Text style={{color:"grey", fontSize:15}} >para poder enviar avistamientos{"\n"}y poder geolocalizarlos</Text>
  </View>

   </View>

<View style={{borderBottomColor:"white", borderBottomWidth:0.2, width:"100%"}} >

</View>




   
        <View style={{flexDirection:"row", justifyContent:"space-between",marginBottom:30, marginTop:50}} >
        <View style={{flex:0.8}} >
        <Image style={{width:100, height:100, }} source={require("../../assets/correo-electronico1.png")} />
        </View>
     
     
       <View style={{flexDirection:"column", justifyContent:"center"}} >
          <Text style={{color:"white", fontSize:20,fontWeight:"600"}} >Notificacion</Text>
          <Text  style={{color:"#0096f6", fontWeight:"bold"}} >● Permitir</Text>
          <Text style={{color:"grey", fontSize:15}} >Resive avistamientos  cerca de tu{"\n"}uficacion </Text>
       </View>
     
        </View>
     
     <View style={{borderBottomColor:"white", borderBottomWidth:0.2, width:"100%"}} >
     
     </View>



   
        <View style={{flexDirection:"row", justifyContent:"center", marginTop:50}} >
        <View style={{flex:0.8}} >
        <Image style={{width:100, height:100, }} source={require("../../assets/captura.png")} />
        </View>
     
     
       <View style={{flexDirection:"column", justifyContent:"center"}} >
          <Text style={{color:"white", fontSize:20,fontWeight:"600"}} >Camara</Text>
          <Text  style={{color:"#0096f6", fontWeight:"bold"}} >● ok</Text>
         <Text style={{color:"grey", fontSize:15}} >Accede a la camara para capturar{"\n"}O.V.N.I.S.</Text>
       </View>
     
        </View>
     
    

        <TouchableOpacity  onPress={()=>onSingup()}  style={{backgroundColor:"#0096f6", width:350, alignItems:"center", padding:10, borderRadius:10, marginTop:40}} >
    <Text style={{color:"white", fontSize:20}} >Continuar</Text>
  </TouchableOpacity>

    </View>



    </>
)
    }

const styles = StyleSheet.create({
    // #121112 1a1819
    container:{
        flex:1,
        backgroundColor:"#0f0f0f",
        alignItems:"center",
        
       
    },
    
    title:{
        fontSize:25,
        fontWeight:"bold",
        marginBottom:70,
        marginTop:100,
        color:"black"
    
    
    },
    subtitle:{
        fontSize:15,
         fontWeight:"bold",
         lineHeight:22,
         color:"black",
         marginLeft:65,
         
    },
    subheadline:{
        fontSize:15,
        fontWeight:"400",
        lineHeight:20,
        color:"black",
        marginLeft:65
    },
    fetureContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        
    
    
    }
    
    
    })