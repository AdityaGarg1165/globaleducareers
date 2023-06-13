import { View, Text,TextInput,FlatList, Dimensions,Image,ScrollView,Button,TouchableWithoutFeedback } from 'react-native'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useEffect, useState} from 'react'
import app from './firebase'
import {collection,getFirestore} from 'firebase/firestore'
export default function Home({route,navigation}) {
  const [email,setEmail] = useState()
  const [currentIndex,setIndex] = useState(1)
  const [chapters,setChapters] = useState()
  useEffect(()=>{
    // async function fetchData(){
      const db = getFirestore(app)
      const chap =  collection(db,"chapters")
      setChapters(chap)
      // }
      // fetchData()
    },[])
  const [data] =  useCollectionData(chapters)

  // const dat = [1,1,1]

    const check = async () => {
        const val = await AsyncStorage.getItem("@login")
        const email = await AsyncStorage.getItem("@email")
        console.log(email)
        setEmail(email)
        if (val === "true")
        {

        }
        else{
            navigation.navigate("Login")
        }
    }
    check()
  return (
    <View>

    <ScrollView>
      <View style={{display:"flex",flexDirection:"column"}}>
        <TextInput onPressIn={()=>{navigation.navigate("Search")}} placeholder='Search' style={{paddingLeft:6,borderColor:"gray",borderWidth:.1,height:60,width:"87%",borderRadius:13,marginLeft:21,marginTop:20,backgroundColor:"#D9D5FF",color:"#5A4BDA"}} placeholderTextColor={"#503FEF"}></TextInput>
        {/* <Text style={{position:"absolute",marginTop:20,marginLeft:"70%",backgroundColor:"#5A4BDA",paddingLeft:18,color:"white",borderRadius:10,paddingTop:10,height:40,width:30}}>Search</Text> */}
      </View>
        <Text style={{fontSize:25,fontWeight:"600",color:'#5A4BDA',marginLeft:"10%",marginTop:20}}>All Topics</Text>
        <View style={{marginLeft:"5%"}}> 

          {data && data.map((item,index)=>(
            <View key={index} style={{width:320,borderRadius:20,height:420,marginTop:20,marginLeft:20,backgroundColor:"white"}}>
            <Image width={250} height={200}  style={{position:"absolute",borderRadius:20,margin:34}} source={{uri:item.img}}/>
            <Text style={{position:"absolute",fontSize:25,fontWeight:"700",marginTop:250,marginLeft:40}}>{item.title}</Text>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Chapter",{title:item.title})}}>
              <Text style={{backgroundColor:"#5A4BDA",width:120,color:"white",paddingLeft:25,overflow:"hidden",borderRadius:10,fontWeight:"500",top:"80%",left:"30%",height:50,paddingTop:15,fontSize:15}}>View Now</Text>
            </TouchableWithoutFeedback>
          </View>
          ))}
          </View>
      <View style={{width:2,height:2,marginTop:100}}></View>
  </ScrollView>
  </View>

  )
}