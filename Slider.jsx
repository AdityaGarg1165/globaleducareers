import { View, Text,Dimensions } from 'react-native'
import React from 'react'

export default function Slider() {
  const {width,height} = Dimensions.get('window')
  return (
    <View>
        
                <Text style={{fontSize:25,color:"#5A4BDA",fontWeight:"700",marginTop:80,marginLeft:22,position:"absolute"}}>Freshly arrived</Text>
                <FlatList horizontal data={data} onScroll={(e)=>{
                // console.log(parseInt(width)/parseInt(e.nativeEvent.contentOffset.x))
                if((parseInt(width)/parseInt(e.nativeEvent.contentOffset.x)) === 1){

                }
                //  if(e.nativeEvent.contentOffset.x > 384){
                // setIndex(2)
                setIndex((parseInt(e.nativeEvent.contentOffset.x)/parseInt(width)*10/10).toFixed(0))
                console.log(currentIndex)
                }} renderItem={({item,index})=>(
                <View style={{marginTop:80,height:320,width:350,marginLeft:20,borderRadius:10,backgroundColor:"black"}}>
                    <Image style={{borderRadius:30}} width={350} height={320} source={{uri:imgs[index],width:350,height:320}}/>
                </View>
                
        )}/>
        <View style={{flexDirection:"row",marginLeft:145,marginTop:20}}>

            {data.map((item,index)=>(
            <View key={index} style={{height:14,borderRadius:10000,width:14,backgroundColor: currentIndex.toString() === index.toString() ? "#5A4BDA" : "gray",marginLeft:8}}></View>
            ))}
        </View>
    </View>
  )
}