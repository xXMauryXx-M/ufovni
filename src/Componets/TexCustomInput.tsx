import React,{useState,useEffect} from 'react'
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//PERdon Me queivoque este no es un hook es un componente 
//https://ethercreative.github.io/react-native-shadow-generator/
interface Props{
  name:string
  handleBlur:any
  values: any
  handleChange:any,
  nameIcon:string
  value:any
type:any
errors:any
placeholder:any
focus:any
}

export const TexCustomInput = ({name, focus, handleBlur, type, value, values, handleChange, nameIcon,errors,placeholder} :Props) => {


const [first, setfirst] = useState(false)


useEffect(() => {
  setfirst(true)
 
}, [])


  
  return (
  
  
    
         <View style={{flexDirection:"row", alignItems:"center",backgroundColor:"#faF4F9", paddingHorizontal:5, marginHorizontal:15}} >
         < Icon  style={{  color:"grey",  alignItems:"center", justifyContent:"center", paddingHorizontal:7}} name={nameIcon} size={23} color="white" />
        
          {/* verf el foco */}
                                            
                 <TextInput
                
                 focusable={true}
                 blurOnSubmit={false}
                 autoFocus={focus}
                 autoCorrect={false}
                 //para aumentar la altura del plce holder es el fontsize
                style={{ flex:1, fontWeight:"600", borderColor:"#faF4F9", borderWidth:5, backgroundColor:"#faF4F9", fontSize:20, color:"black" , padding:10, borderRadius:10 ,shadowColor: "#000",
              }}
                 placeholder={placeholder}
                 keyboardType={type}
                 onBlur={handleBlur(name)}
                 value={values}
                 onChangeText={handleChange(name)}
           />
         </View>


  )
}
