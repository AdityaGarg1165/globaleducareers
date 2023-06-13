import { View, Text } from 'react-native'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import app from './firebase'
import {collection,getFirestore} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

import Video from 'react-native-video'


export default function Chapter({route,navigation}) {
    const {title} = route.params
    const [chapters,setChapters] = useState()
    const [filtered,setFiltered] = useState()

    useEffect(()=>{
      const db = getFirestore(app)
      const chap =  collection(db,"chapters")
      setChapters(chap)
    },[])
    const [data] =  useCollectionData(chapters)

    useEffect(()=>{
      if(data){

          
          const filter = data.filter(x=>x.title===title)
          console.log(filter)
          setFiltered(filter)

      }
  },[data])

  return (
    <View>
      {/* <View> */}

      {/* </View> */}
      
      <View style={{width:"95%",marginLeft:"2%",marginTop:"10%",height:330,backgroundColor:"#B9AEF3",borderRadius:20}}>
        {filtered ?
      <Video style={{flex:1,position:"absolute",marginTop:"3%",borderRadius:12,width:"90%",height:300,marginLeft:"3.5%",zIndex:9}} muted={false} controls={true} volume={10} source={{uri:filtered[0].url}}/>
    :
    <View></View>}

      </View> 
      <View style={{backgroundColor:"#B9AEF3",width:"94%",marginLeft:"3%",marginTop:"5%",borderRadius:4}}>

            <Text style={{fontSize:25,marginLeft:"17%",marginTop:40,fontWeight:"700",color:"white"}}>Summary of the lesson</Text>
            <View style={{padding:24}}>
              <Text style={{fontSize:23,marginLeft:"7%"}}>{filtered && filtered[0].defination}</Text>
            </View>
      </View>
    </View>
  )
}