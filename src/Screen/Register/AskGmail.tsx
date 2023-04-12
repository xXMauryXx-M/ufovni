import { ErrorMessage, Formik } from "formik";
import React from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import * as Yup from "yup"

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TexCustomInput } from "../../Componets/helpers/TexCustomInput";
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { GiveCoreoForm, GivePasswordForm } from "../../Store/form/FormSlice";

interface valoresGmail {
    email: string;
    password: string;
    terms: boolean;
}

 export  const AskGmail=()=>{
    const {correo,contraseña,nombre}=  useSelector((state:any)=>state.form)

   const dispatch= useDispatch<any>()

    const navigation= useNavigation<any>()


    const subirGmailPassword=(values:valoresGmail)=>{

        try {
            dispatch(GiveCoreoForm(values.email))
            dispatch(GivePasswordForm(values.password))
            navigation.navigate("NombreScreen")        
        } catch (error) {
            console.log(error);
            
        }
    
       }

    return(
        <>
        <TouchableOpacity onPress={()=>navigation.goBack()} >

      
         <Icon 
         name="arrow-back"
          size={25}
          style={{color:"black",marginLeft:10, marginTop:10}}
         />
  </TouchableOpacity>
           <Text style={{fontSize:25, fontWeight:"900", color:"#000", marginTop:40, marginHorizontal:10}} >Hola ufologo!{"\n"}Facilitanos tus datos</Text>
           
           <View style={{marginTop:20}} >

          
           <Formik

          
           initialValues={{
            email:"",
            password:"",
            terms:false
           }}

           onSubmit={(values)=>{
            subirGmailPassword(values)
              
           }}

           validationSchema={
            Yup.object({
                email:Yup.string().email("ingresa un correo electronico válido").required("nesesario"),
                password:Yup.string().min(5, "La contraseña debe tener almenos 5 caracateres").required("nesesario"),
            })
           }
           >
        {
            ({handleBlur, values, handleChange, handleSubmit,touched,errors,setFieldValue})=>(
            
        <>
        
       

                <TexCustomInput
                focus={true}
                placeholder="Direccíon de correo electrónico"
                errors={errors}
                type="email-address"
                value={values.email}
                name='email'
                handleBlur={handleBlur}
                nameIcon="mail"
                handleChange={handleChange}
                values={values.email}
             
                />
                
                <Text style={{color:"#FF3733", marginLeft:20, fontWeight:"900"}}>
            <ErrorMessage name="email" />
                </Text>




                <TexCustomInput
                focus={false}
                placeholder="Tu Contraseña"
                errors={errors}
                type="visible-password"
                value={values.password}
                name='password'
                handleBlur={handleBlur}
                nameIcon="lock-closed"
                handleChange={handleChange}
                values={values.password}
                
             
                />
   <Text style={{color:"#FF3733", marginLeft:20, fontWeight:"900"}}>
            <ErrorMessage name="password" />
                </Text>



<View style={{marginTop:10}} >
 
 <TouchableOpacity 
 
 onPress={()=>handleSubmit()
 }
       style={styles.button}
       activeOpacity={0.8}
       >
      <Text style={{fontSize:20, color:"white" }} > Siguiente </Text>
   
   </TouchableOpacity>





</View>   
                
</>
            
            
            
            
            )


            

        }

        
         </Formik>
         </View>


       
        </>
    )
}

const styles = StyleSheet.create({
    
    input:{
        padding:40
    },
    button:{
        flexDirection:"row",
        backgroundColor:"#0096f6",
        width:350,
        marginBottom:10,
        height:50,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:20,
    },
});