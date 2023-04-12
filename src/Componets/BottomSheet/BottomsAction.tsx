import React,{useCallback,useEffect,useState} from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface props {
    bottomSheetRef:React.RefObject<BottomSheetModalMethods> ,
    handlePresent4:any
    bottomSheetRef3:React.RefObject<BottomSheetModalMethods> ,
    bottomSheetRef2:React.RefObject<BottomSheetModalMethods>,
    infoGeoShot:any,
    infoUser:any


}

export const BottomsAction = ({bottomSheetRef, handlePresent4, bottomSheetRef3,bottomSheetRef2,infoGeoShot,infoUser}:props) => {
    const navigation=useNavigation<any>()
    const windowWith=Dimensions.get("window").width;
    const [nombreUser, setnombreUser] = useState<FirebaseFirestoreTypes.DocumentData>()

    const cargarNombre=()=>{
        firestore().collection('users').doc(auth().currentUser?.email as any).get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setnombreUser (documentSnapshot.data());
          }
        });
        }
        useEffect(() => {
            cargarNombre() 
        }, [])
        const singout=()=>{
          auth()
         .signOut()
       };

    const ShowReport = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(2);
    }, []);

    const handlePresentCpress=useCallback(()=>{
        if (bottomSheetRef3.current) {
          bottomSheetRef2.current?.present();
        }
      },[])
  return (
<View  >
<View style={{flexDirection:"row"}} >
  <View style={{marginVertical:-3}} >
  <Image
   style={styles.imagenUser}
  source={{uri:infoGeoShot.photoPerfil}} />
  </View>

<Text style={{color:"black", fontSize:20, fontWeight:"bold"}}>   Hola {nombreUser?.nombre}!  </Text>               

</View>

<View style={{flexDirection:"row",marginTop:20}} >

<View style={{flexDirection:"column",marginLeft:10}} >
<Text style={styles.textInfo} >Avistamientos:5</Text>
  <Text style={styles.textInfo} >ovni cerca:5</Text>
  <Text style={styles.textInfo} >tiempo:30</Text>

</View>

<View style={{flexDirection:"row",alignSelf:"flex-end",marginLeft:"35%"}} >
<TouchableOpacity onPress={()=>handlePresent4()} style={{height:40,width:40,backgroundColor:"orange",alignSelf:"center",marginBottom:30,borderRadius:10}} >
             <Icon name='navigate-circle-outline' size={40} color={"white"} />
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>singout()} style={{height:40,width:40,backgroundColor:"red",alignSelf:"center",marginBottom:50,borderRadius:10,marginLeft:10}} >
             <Icon name='log-out-outline' size={40} color={"white"} />
               </TouchableOpacity>
              
              
               
</View>

</View>



</View>                                                
    

  )
}

const styles=StyleSheet.create({
    buttonContainer:{
        justifyContent:"space-around",
        flexDirection:"row",
       marginTop:"10%"
    
      },
      textReportsUltimos:{
        color:"black",
         fontSize:20,
          fontWeight:"900",
           marginTop:40,
            alignSelf:"center",
             marginBottom:-20
      },
      imagenUser:{
        width:40,
        height:40,
        marginLeft:10,
        borderRadius:20    
      },
      textInfo:{
      color:"black",
      fontSize:20
      }
})

/* 

<Text style={{color:"black", fontSize:20, fontWeight:"bold"}}>   Hola {nombreUser?.nombre}!  </Text>               
                  <View style={styles.buttonContainer} >      
                          <TouchableOpacity onPress={()=>navigation.navigate("ShootCamara")}  style={{backgroundColor:"#0096f6",borderRadius:10,padding:10, width:windowWith/3.1}} >
                            <Text style={{color:"white", fontSize:20, paddingHorizontal:10, fontWeight:"900"}} >Capturar</Text>
                          </TouchableOpacity>
                      
                          <TouchableOpacity  onPress={()=>navigation.openDrawer()} style={{backgroundColor:"#7A7575",borderRadius:10, padding:10, width:windowWith/3.1}} >
                            <Text style={{color:"white", fontSize:20, paddingHorizontal:14,fontWeight:"900"}} >Cuenta</Text>
                          </TouchableOpacity>

                        <TouchableOpacity onPress={()=>ShowReport()}  style={{backgroundColor:"#DE1C14",borderRadius:10, padding:10, width:windowWith/3.1}}  >
                            <Text style={{color:"white", fontSize:20, paddingHorizontal:3,fontWeight:"900"}}  >Resportes</Text>
                        </TouchableOpacity>
                  </View>
       
                  <Text style={styles.textReportsUltimos} >   Ultimos Reportes: {infoGeoShot.hora } </Text>
                 <TouchableOpacity onPress={()=>handlePresentCpress()}  style={{width:windowWith}} >
                 <Icon
        name='filter-outline'
        size={30}
        color={"white"}
        style={{marginLeft:20}}
         />
        
                 </TouchableOpacity>

                  
               <TouchableOpacity onPress={()=>handlePresent4()} style={{height:60,width:190,backgroundColor:"orange",alignSelf:"center",marginBottom:30,borderRadius:10}} >
                <Text style={{color:"black",fontSize:20,marginTop:20,fontWeight:"bold",alignSelf:"center"}} >Ver avistamientos </Text>
               </TouchableOpacity>

*/