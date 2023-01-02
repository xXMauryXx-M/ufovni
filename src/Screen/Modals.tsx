import React,{useMemo, useRef,useCallback} from 'react'
import { Text, View, Modal, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { color } from 'react-native-reanimated';

//cossas que ahace en esta aplicacion otp mensajeria , correos, navigations hacia el lado

export const Modals = (props:any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
  
      <BottomSheet
        ref={bottomSheetRef}
  enablePanDownToClose={true}
 
        snapPoints={snapPoints}
        
      >
        <View style={{flex:1, alignItems:"center"}}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    
   
  )


}

const styles = StyleSheet.create({
 
      modaLContainer:{
        flex:1,
        justifyContent:"flex-end"
      }
});
