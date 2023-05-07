import { View, Text } from 'react-native'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import app from './firebase'
import {collection,getFirestore} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

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
      <Text style={{fontSize:24,fontWeight:"600",marginLeft:60,marginTop:20,color:"#5A4BDA"}}>{title}</Text>
      <View style={{width:350,marginLeft:20,marginTop:20,height:350,backgroundColor:"#B9AEF3",borderRadius:20}}>
        <Text style={{fontSize:30,marginLeft:100,marginTop:20,fontWeight:"700",color:"white"}}>Defination</Text>
        <View style={{padding:24}}>
          <Text style={{fontSize:23}}>{filtered && filtered[0].defination}</Text>
        </View>
      </View>
      <View style={{width:350,marginLeft:20,marginTop:20,height:350,backgroundColor:"#B9AEF3",borderRadius:20}}>
        <Text style={{fontSize:30,marginLeft:100,marginTop:20,fontWeight:"700",color:"white"}}>Defination</Text>
        <View style={{padding:24}}>
          <Text style={{fontSize:23}}>{filtered && filtered[0].defination}</Text>
        </View>
      </View>
    </View>
  )
}