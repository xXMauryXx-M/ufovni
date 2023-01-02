import React,{useState} from "react"
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import { TexCustomInput } from "../../Componets/TexCustomInput";
import * as Yup from 'yup';
import { launchImageLibrary } from "react-native-image-picker";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from "react-native-paper";


export const PerfilScreen=()=>{ 
 const navigate= useNavigation()
    const [uriTem,settempUri] = useState<any>(null)
    const [activeIndicator, setactiveIndicator] = useState(false)
    interface IncialValue{
        email:string,
        password:string
    }

    const ActualizarUsuarioFIrebase=(values:IncialValue)=>{
        setactiveIndicator(true)
        const {email,password}=values
        firestore()
       .collection('users')
       .doc(auth().currentUser?.email as any)
       .update({
        photoPerfil:uriTem,
        correo:email,
        contraseña:password
       
        })
       .then(() => {
        setactiveIndicator(false)
        navigate.goBack()
      
  });
    }


    const PhthoGalery=()=>{
        launchImageLibrary({
          mediaType:"photo",
        },(resp)=>{
              if(resp.didCancel) return 
              if(!resp.assets![0].uri!) return
              settempUri(resp.assets![0].uri!)
                
        })
      }

      if(activeIndicator){
        return(
       <View  style={{flex:1}}>
<ActivityIndicator style={{justifyContent:"center", marginTop:90}} size={70} />
    </View>


        )
              }

    return(
<View style={{flex:1, backgroundColor:"black"}} >

<View style={{alignItems:"center", marginTop:10}} >
<TouchableOpacity onPress={()=>PhthoGalery()} >
{/* <Image
style={{width:100, height:100}}
source={{uri:"https://firebasestorage.googleapis.com/v0/b/ufovni-54411.appspot.com/o/avistamietnosUser%2Fasdasd%2F368444138680174971?alt=media&token=f599e304-4268-4c3b-9df8-52a401b5900b"}}
/> */}

{
  uriTem ===null
  ?
  <Image
  style={{width:150, height:150, borderRadius:60}}
  source={require(  "../../assets/perfil-del-usuario.png")}
        /> 

  :
  <Image
  style={{width:150, height:150, borderRadius:60}}
  source={ {uri:uriTem}  }/>


      
}

</TouchableOpacity>
 
</View>


<Formik

          
initialValues={{
 email:"",
 password:"",
}}

onSubmit={(values)=>{
    ActualizarUsuarioFIrebase(values)
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
 
<View style={{marginTop:30}} >



     <TexCustomInput
     focus={true}
     placeholder="Correo"
     errors={errors}
     type="email-address"
     value={values.email}
     name='email'
     handleBlur={handleBlur}
     nameIcon="person-outline"
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
style={styles.button}
onPress={()=>handleSubmit()
}

activeOpacity={0.8}
>
<Text style={{fontSize:20, color:"white",  }} > Actualizar </Text>

</TouchableOpacity>





</View>   
     
</View>
 
 
 
 
 )


 

}


</Formik>



 </View>
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
        marginLeft:20
    },
});