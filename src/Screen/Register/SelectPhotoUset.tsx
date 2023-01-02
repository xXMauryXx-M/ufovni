import React,{useState,useEffect} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { GiveUrlUserForm } from '../../Store/form/FormSlice';
import { useDispatch } from 'react-redux';



export const SelectPhotoUset = () => {
  const [uriTem,settempUri] = useState<any>(null)
 const dispatch= useDispatch()
  const subirUrl=()=>{

    try {
        dispatch(GiveUrlUserForm(uriTem))
        navigation.navigate("OnBoarding")      
    } catch (error) {
        console.log(error);
        
    }

   }


    const navigation= useNavigation<any>()

    const PhthoGalery=()=>{
        launchImageLibrary({
          mediaType:"photo",
        },(resp)=>{
              if(resp.didCancel) return 
              if(!resp.assets![0].uri!) return
              settempUri(resp.assets![0].uri!)
                
        })
      }
  return (

    <View style={{flex:1}} >  
          <Text style={{ fontSize:25, fontWeight:"900", color:"#000", marginTop:40, marginHorizontal:10}} >Ya casi! Ahora solo falta que elijas Tu Foto</Text>

 <TouchableOpacity  activeOpacity={0.8} style={{alignItems:"center" , marginTop:40}}  onPress={()=> PhthoGalery()} >

{
  uriTem ===null
  ?
  <Image
  style={{width:150, height:150, borderRadius:60}}
  source={   require(  "../../assets/perfil-del-usuario.png")}
        /> 

  :
  <Image
  style={{width:150, height:150, borderRadius:60}}
  source={ {uri:uriTem}  }/>


      
}

 
 </TouchableOpacity>


   

 
 <TouchableOpacity  disabled={uriTem !== null ? false :true} style={styles.button}  onPress={()=>subirUrl()} >
    <Text  style={{fontSize:20, color:"white"}} >siguiente</Text>
 </TouchableOpacity>



           
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
        marginLeft:20,
        marginVertical:60,
        
    },
});