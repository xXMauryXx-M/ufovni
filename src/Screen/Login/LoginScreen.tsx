import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { TexCustomInput } from '../../Componets/helpers/TexCustomInput';
import { useSelector,useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';


export const LoginScreen = () => {


    const singin=(values:any) => {
        try {
            auth().signInWithEmailAndPassword(values.email,values.password)
            .then(() => {
                console.log('User signed in anonymously');
              })
              .catch(error => {
              Alert.alert("usuario o contraseña invalidos  ")
            
              });
            
        
            
        } catch (error) {
            Alert.alert("usuario o contraseña invalidos  ")
            
        }
        
    }

    {
        const navigation= useNavigation<any>()
        return(
            <>
          
        
        
  
      
            <TouchableOpacity onPress={()=>navigation.goBack()} >
           
          
             <Icon 
             name="arrow-back"
              size={25}
              style={{color:"black",marginLeft:10, marginTop:10}}
             />
      </TouchableOpacity>
               <Text style={{fontSize:25, fontWeight:"900", color:"#000", marginTop:40, marginHorizontal:10}} >Hola de nuevo,Ufologo</Text>
               
               <View style={{marginTop:20}} >
    
              
               <Formik
    
              
               initialValues={{
                email:"",
                password:"",
           
               }}
    
               onSubmit={(values)=>{
                singin(values)
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
                    focus={false}
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
    
    
    
    <View style={{}} >
     
     <TouchableOpacity 
     
     onPress={()=>handleSubmit()
     }
           style={styles.button}
           activeOpacity={0.8}
           >
          <Text style={{fontSize:20, color:"white",  }} > Siguiente </Text>
       
       </TouchableOpacity>
    
    
    
        <View style={{flexDirection:"row", marginTop:20}}>
        <View style={{borderBottomColor:"black", borderBottomWidth:0.5, width:"45%", marginLeft:10}} >
     
        </View>
       
     
      <Text style={{ width:"5%", marginLeft:5}} >O</Text>
        

           
        <View  style={{borderBottomColor:"black", borderBottomWidth:0.5, width:"45%", }} >

        </View>
    </View>
    
    </View>   
    <TouchableOpacity 
     
     onPress={()=>handleSubmit()
     }
           style={styles.button2}
           activeOpacity={0.8}
           >
          <Text style={{fontSize:20, color:"white",  }} > inciar sesión con Google </Text>
       
       </TouchableOpacity>
         
    </>
                
                
                
                
                )
    
    
                
    
            }
    
            
             </Formik>
             </View>
    
    
           
            </>
        )
    }
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
            marginLeft:20
        },
        button2:{
            flexDirection:"row",
            backgroundColor:"grey",
            width:350,
            marginBottom:10,
            height:50,
            borderRadius:20,
            justifyContent:"center",
            alignItems:"center",
            marginLeft:20,
            marginTop:40
        },
    });