import { View, Text,TextInput,Image,TouchableWithoutFeedback,ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import app from './firebase'
import {collection,getFirestore} from 'firebase/firestore'

export default function Search({navigation}) {
    const [search,setSearch] = useState("")
    const [chapters,setChapters] = useState()
    const [filtered,setFiltered] = useState()
    useEffect(()=>{
        // async function fetchData(){
          const db = getFirestore(app)
          const chap =  collection(db,"chapters")
          setChapters(chap)
          // }
          // fetchData()
        },[])
        const [data] =  useCollectionData(chapters)
        useEffect(()=>{
            if(data){
              const searched = []
              
              
              data.map(it=>{
                if(it['title'].includes(search)){
                  searched.push(it)

                }
              })

              setFiltered(searched)

            }
        },[search])
  return (
    <View>
      <TextInput placeholder='Search' style={{paddingLeft:6,borderColor:"gray",borderWidth:.1,height:60,width:"88%",borderRadius:13,marginLeft:21,marginTop:20,backgroundColor:"#D9D5FF",color:"#5A4BDA"}} placeholderTextColor={"#503FEF"} onChangeText={(e)=>{setSearch(e)}}></TextInput>
      <View style={{marginLeft:"5%"}}>
      <ScrollView>

        {filtered && filtered.map((item,index)=>(
          <View key={index} style={{width:350,borderRadius:20,height:420,marginTop:20,marginLeft:20,backgroundColor:"white"}}>
            <Image width={280} height={200}  style={{position:"absolute",borderRadius:20,margin:34}} source={{uri:item.img}}/>
            <Text style={{position:"absolute",fontSize:25,fontWeight:"700",marginTop:250,marginLeft:40}}>{item.title}</Text>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Chapter",{title:item.title})}}>
              <Text style={{backgroundColor:"#5A4BDA",width:120,color:"white",paddingLeft:25,overflow:"hidden",borderRadius:10,fontWeight:"500",top:"80%",left:"30%",height:50,paddingTop:15,fontSize:15}}>View Now</Text>
            </TouchableWithoutFeedback>
          </View>
        ))}
        </ScrollView>
        </View>
    </View>
  )
}