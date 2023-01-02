
import React,{useMemo,useRef} from 'react'
import{View, Text,TouchableOpacity} from "react-native"
import BottomSheet, { BottomSheetView,BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
export const ButtonShet1 = (data:any) => {
    const snapPoints = useMemo(() => ["25%", "43", "63%"], []);
const bottomSheetRef = useRef<BottomSheetModal>(null);
const bottomSheetRef2 = useRef<BottomSheetModal>(null);


  return (
    <BottomSheetModalProvider  >
      



      <BottomSheetModal

style={{flex:1}}
index={0}
ref={bottomSheetRef}
snapPoints={snapPoints}
backgroundStyle={{backgroundColor:"black"}}
handleIndicatorStyle={{backgroundColor:"white"}}
>
<BottomSheetView  focusHook={useFocusEffect} style={{flex:1}}>
 <Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>   Hola ! Mauricio  </Text>

<View  style={{justifyContent:"space-around", flexDirection:"row", marginTop:"10%"}} >

<TouchableOpacity style={{backgroundColor:"#0096f6",borderRadius:10,padding:10, width:120}} >
  <Text style={{color:"white", fontSize:20, paddingHorizontal:10, fontWeight:"900"}} >Capturar</Text>
</TouchableOpacity>
  
<TouchableOpacity style={{backgroundColor:"#7A7575",borderRadius:10, padding:10, width:120}} >
  <Text style={{color:"white", fontSize:20, paddingHorizontal:14,fontWeight:"900"}} >Cuenta</Text>
</TouchableOpacity>

<TouchableOpacity style={{backgroundColor:"#DE1C14",borderRadius:10, padding:10, width:120}}  >
  <Text style={{color:"white", fontSize:20, paddingHorizontal:3,fontWeight:"900"}}  >Resportes</Text>
</TouchableOpacity>
  



</View>

<Text style={{color:"white", fontSize:20, fontWeight:"900", marginTop:30, marginLeft:10, marginBottom:5 }} >   Ultimos Reportes 16:24</Text>

</BottomSheetView>


<BottomSheetFlatList
horizontal
showsHorizontalScrollIndicator
ItemSeparatorComponent={()=>{
return(
  <View style={{paddingHorizontal:4}} ></View>
)
}}
data={data}
renderItem={({item})=>{
return(
  <View  >
   <Text style={{color:"white", fontSize:20, fontWeight:"900", marginTop:30, marginLeft:10, marginBottom:5 }} >      NombreUser:</Text>

   {/* <Text style={{color:"white"}} > {item.usuario}</Text>  
    */}
<View style={{alignItems:"center"}}  >

<Image
  style={{width:50, height:50}}
  source={require("../assets/user.png")}
  />
 
</View>
  

  {/* <Image
  style={{width:200, height:120}}
  source={item.imagen}
  />  */}
  
  </View>
)
}}
> 

</BottomSheetFlatList> 

</BottomSheetModal>






<BottomSheetModal

style={{flex:1}}
index={1}
ref={bottomSheetRef2}
snapPoints={snapPoints}
backgroundStyle={{backgroundColor:"black"}}
handleIndicatorStyle={{backgroundColor:"white"}}
>
<BottomSheetView  focusHook={useFocusEffect} style={{flex:1}}>
 <Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>   Hola ! Mauricio  </Text>

<View  style={{justifyContent:"space-around", flexDirection:"row", marginTop:"10%"}} >

<TouchableOpacity style={{backgroundColor:"#0096f6",borderRadius:10,padding:10, width:120}} >
  <Text style={{color:"white", fontSize:20, paddingHorizontal:10, fontWeight:"900"}} >Capturar</Text>
</TouchableOpacity>
  
<TouchableOpacity style={{backgroundColor:"#7A7575",borderRadius:10, padding:10, width:120}} >
  <Text style={{color:"white", fontSize:20, paddingHorizontal:14,fontWeight:"900"}} >Cuenta</Text>
</TouchableOpacity>

<TouchableOpacity style={{backgroundColor:"#DE1C14",borderRadius:10, padding:10, width:120}}  >
  <Text style={{color:"white", fontSize:20, paddingHorizontal:3,fontWeight:"900"}}  >Resportes</Text>
</TouchableOpacity>
  



</View>

<Text style={{color:"white", fontSize:20, fontWeight:"900", marginTop:30, marginLeft:10, marginBottom:5 }} >   Ultimos Reportes 16:24</Text>

</BottomSheetView>




</BottomSheetModal>




 
     
  </BottomSheetModalProvider>


            
   
  )
}
