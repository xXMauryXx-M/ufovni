import { Formik, ErrorMessage } from 'formik';
import React,{useEffect} from 'react'
import { View, Text, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';
import * as  Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { TexCustomInput } from '../Componets/helpers/TexCustomInput';
export const Reportes = () => {

  useEffect(() => {
 
  }, [])
  

  const navigator=useNavigation<any>()
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1, backgroundColor:"#000"}} >

    <View style={{flex:1, backgroundColor:"#000"}} >
    
   
        
         <View style={{alignItems:"center"}}> 
                 <Image
                 style={{width:250, height:250}}
                 source={require("../assets/Taken-rafiki.png")} />
                 <Text 
                 style={{fontSize:28, fontWeight:"900", color:"white",alignSelf:"flex-start" ,marginHorizontal:20}}
                 >
                 Log-In
                 </Text>
         </View>
 
 
                 <KeyboardAvoidingView behavior={Platform.OS=="android"? "height" :"padding"} >
 
                 <Formik 
 
                         
               initialValues={{
                 nombre:"",
                 password:"",
               }}
               onSubmit={(values)=>{
               
                     
                navigator.navigate("UfoHome")       
               }}
               validationSchema={
                 Yup.object({
                   nombre:Yup.string().min(5,"Nombre de usuario No Valido.").max(10, "Nombre de usuario No Valido").required("EL nombre es Requerido"),
      
                   password:Yup.number().min(5, "La contraseña debe tener almenos 10 caracateres").required("contraseña requerida"),
            
                   })}
               
      >
 {
 ({handleBlur, values, handleChange, handleSubmit,touched,errors,setFieldValue})=>(
   <ScrollView>
 
 <Text style={{color:"white"}} >
 <ErrorMessage name='nombre' />
 </Text>
 
     
     <Text style={{color:"white"}} >
     <ErrorMessage name='email' />
     </Text>
 
 
    
  
 <Text style={{color:"white"}} >
     <ErrorMessage name='password' />
     </Text>
 
 
 
 
     
 
 
    <View style={{height:100}} ></View>
 
 
    <TouchableOpacity onPress={()=>handleSubmit()} style={{alignItems:"flex-end", paddingHorizontal:15,}} >
                     <Text style={{color:"white", fontWeight:"900", fontSize:15}} >Siguiente</Text>
                 </TouchableOpacity>
 
   </ScrollView>
 
 
 
 //oboadring que diga uqe nesesita acceso a la localizacion y not ifaciones 
 
  )
 }
 
 
 
 
 
 
 
      </Formik>
 
                 </KeyboardAvoidingView>
 
         
              
       
    </View> 
    </TouchableWithoutFeedback>
  )
}
