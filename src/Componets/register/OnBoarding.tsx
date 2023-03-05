import React,{useState,useRef} from 'react'
import { FlatList, ImageSourcePropType, Animated, Text, View, useWindowDimensions } from 'react-native';
import { OnBoardingItems } from './OnBoardingItems';
import { Paginator } from '../Paginator';


interface Slide {
  
    desc: string;
    img: ImageSourcePropType
}

const items: Slide[] = [
    {
        
        desc: 'Se Capaz de Capturar \n OVNIS y subelo al GPS para que mas personas lo vean',
        img: require('../assets/imagen.png')
    },
    {
       
        desc: 'Geolocaliza OVNIS\nY Resive Notifiaciones \n cuando Haya uno cerca! ',
        img: require('../assets/undraw_Delivery_re_f50b.png')
    },
    {
       
        desc: 'Mira las zonas con Mas \navistamientos de la Semana \n y ve a visitarlas',
        img: require('../assets/undraw_Reminder_re_fe15.png')
    },
   
]

export const OnBoarding = () => {
    const {width}= useWindowDimensions()
    const scrollx=useRef(new Animated.Value(0)).current
  const [currentIndex, setcurrentIndex] = useState(0)
  const slideref=useRef(null)
  const ViewableItemsChanged=useRef(({viewableItems}:any)=>{
    setcurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig=useRef({viewAreaCoveragePercentThreshold:50}).current 
  
    return (
    <View style={{flex:1}} >

        <FlatList
        onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollx}}}],{
            useNativeDriver:false
        })}
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={(item)=>OnBoardingItems(item,width)}
        onViewableItemsChanged={ViewableItemsChanged}
        scrollEventThrottle={32}
        ref={slideref}
        />

        <Paginator data={items} scrollx={scrollx} />
    </View>
  )
}
