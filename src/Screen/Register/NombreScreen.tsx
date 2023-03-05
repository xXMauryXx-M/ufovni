import React,{useState,useEffect} from 'react'
import { TouchableOpacity, Text, View, StyleSheet , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import { TexCustomInput } from '../../Componets/helpers/TexCustomInput';
import { useDispatch } from 'react-redux';
import { GiveNombreForm } from '../../Store/form/FormSlice';
import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
interface valorNombre {
    nombree:string
}

export const NombreScreen = () => {

    const [nombres,setnombres]= useState([])
    const nombre=()=>{
        firestore().collectionGroup("geoShot").onSnapshot(querySnapshot=>{
           
            const maz:any=[]
            querySnapshot.forEach(documentSnapshot=>{
                maz.push({
                    ...documentSnapshot.data(),
                    key:documentSnapshot.id
                })
            })
    
    
    
            setnombres(maz)
           
            
          
            
        })
      
   
    }

    
    

    useEffect(() => {
        nombre()
     
      }, []);

    

   const navigation=useNavigation<any>()
   const dispatch= useDispatch<any>()

   const subirNombre=(values:valorNombre)=>{

    try {
        dispatch(GiveNombreForm(values.nombree))
        navigation.navigate("SelectPhotoUset")      
    } catch (error) {
        console.log(error);
        
    }

   }

  return (
    <>
 <TouchableOpacity onPress={()=>navigation.goBack()} >
    
          
    <Icon 
    name="arrow-back"
     size={25}
     style={{color:"black",marginLeft:10, marginTop:10}}
    />
</TouchableOpacity>

<View style={{width:100,height:100}} >
 <Image 
source={require("../../assets/Hello-rafiki.png")}
style={{width:140,height:140}}
/> 
</View>


     
       <Text style={{fontSize:25, fontWeight:"900", color:"#000", marginTop:40, marginHorizontal:10}} >Empecemos, Escribe  tu nombre Nombre de Usuario</Text>
       <View style={{marginTop:20}} >
       <Formik
       initialValues={{
         nombree:" "
       }}

       onSubmit={(values)=>{
    
            subirNombre(values)
        
        
          
          
       }}

       validationSchema={
        Yup.object({
            nombree:Yup.string().min(5, "nombre de usuario no valido").required("nesesario")
            .test("name-exists", "Nombre de Usuario ya Registrado", async value=>{
                const usernameRef = firestore().collection("users").where("nombre", "==", value );
             const querySnapshot = await usernameRef.get();
           
             return querySnapshot.empty;

            
             })
        })
       }
       >
    {
        ({handleBlur, values, handleChange, handleSubmit,touched,errors,setFieldValue})=>(
        
    <>
   
   

            <TexCustomInput
            focus={true}
            placeholder="Tu Nombre Completo"
            errors={errors}
            type="email-address"
            value={values.nombree}
            name='nombree'
            handleBlur={handleBlur}
            nameIcon="person"
            handleChange={handleChange}
            values={values.nombree}
         
            />
            
            <Text style={{color:"#FF3733", marginLeft:20, fontWeight:"900"}}>
        <ErrorMessage name="nombree" />
            </Text>


     

           


<View style={{marginTop:100}} >

<TouchableOpacity 

onPress={()=>handleSubmit()
}
   style={styles.button}
   activeOpacity={0.8}
   >
  <Text style={{fontSize:20, color:"white",  }} > Siguiente </Text>

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
     marginTop:-40,
        height:50,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:20,
        
    },
});