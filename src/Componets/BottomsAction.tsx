import React,{useCallback,useEffect,useState} from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface props {
    bottomSheetRef:React.RefObject<BottomSheetModalMethods> ,
    bottomSheetRef3:React.RefObject<BottomSheetModalMethods> ,
    bottomSheetRef2:React.RefObject<BottomSheetModalMethods>,
    infoGeoShot:any


}

export const BottomsAction = ({bottomSheetRef,bottomSheetRef3,bottomSheetRef2,infoGeoShot}:props) => {
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
        

    const ShowReport = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(2);
    }, []);

    const handlePresentCpress=useCallback(()=>{
        if (bottomSheetRef3.current) {
          bottomSheetRef2.current?.present();
        }
      },[])
  return (
<View>
<Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>   Hola {nombreUser?.nombre}!  </Text>               
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
        color:"white",
         fontSize:20,
          fontWeight:"900",
           marginTop:40,
            alignSelf:"center",
             marginBottom:-20
      }
})