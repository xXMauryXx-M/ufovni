   //funciones button shet -navegation screen

   import { useRef,useCallback,useMemo } from "react";
  import { BottomSheetModal } from '@gorhom/bottom-sheet';

    const bottomSheetRef=useRef<BottomSheetModal>(null);
    const bottomSheetRef2=useRef<BottomSheetModal>(null);
    const bottomSheetref4=useRef<BottomSheetModal> (null)
    const bottomSheetRef3=useRef<BottomSheetModal>(null)
    const snapPoints=useMemo(() => ["10%","26%"], []);
    const snapPoint2=useMemo(() => ["30%","60%"], []);

   
 export   const bottomSheetFunction=()=>{
    const handlePresent4 = useCallback(() => {
      if (bottomSheetRef.current) {
          bottomSheetref4.current?.present()
       }
      }, []);
     
       const handleDeismis4=useCallback(()=>{
        if(bottomSheetref4.current){
          bottomSheetref4.current.dismiss()
        }
      },[])
    
       const handlePresentBPress = useCallback(() => {
      if (bottomSheetRef2.current) {
        bottomSheetRef2.current.present();
      }
    }, []);
      const handleDismisBPress = useCallback(() => {
      if (bottomSheetRef2.current) {
        bottomSheetRef2.current.dismiss();
      }
    }, []);
    
 

return(
handleDeismis4(),
handlePresent4(),
handleDismisBPress(),
handlePresentBPress()


)


    

   }

  

  
   
