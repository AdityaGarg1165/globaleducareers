import { View, Text,Image,TextInput,Button,TouchableWithoutFeedback, Platform, ToastAndroid, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { encrypt,decrypt } from 'n-krypta'
import React,{useState} from 'react'
import {getFirestore,collection,addDoc} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import app from './firebase'
import { decrypt } from 'n-krypta'


export default function Login({navigation}) {
  const [user,setName] = useState()
  const [password,setPassword] = useState()
  db = getFirestore(app)
  coll = collection(db,"users")
  const [data] = useCollectionData(coll)
  const check = async ()=>{

    const val = await AsyncStorage.getItem("@login")
    if (val === "true"){
      // async ()=> {


      navigation.navigate("Home")
      // AsyncStorage.clear()
    }
  }
  check()
  function login(){
      if(data){

        const curruser = data.filter(x=>x.name == user)
        if(curruser[0]){
          if (decrypt(curruser[0].password,"mirdul_khota#62490") === password.toLowerCase()){
            // Alert.alert('', '')
            const log = async ()=>{
              await AsyncStorage.setItem("@login","true")
              AsyncStorage.setItem("@email",user)
              navigation.navigate("Home")
            }
            log()
          }
          else{
            const log = async ()=>{
              AsyncStorage.setItem("@email",user)
              await AsyncStorage.setItem("@login","false")
              if(Platform.OS == "android"){
                ToastAndroid.show("Invalid Credentials",ToastAndroid.LONG)
              }
              else{
                Alert.alert("Invalid Credentials",'')
              }
              // AsyncStorage.setItem("@email",user)

            }
            log()
            // console.log("Invalid Credentials")
            // Alert.alert('Invalid Credentials', '')
          }
        }
        else{
          const log = async ()=>{
            await AsyncStorage.setItem("@login","false")
            
          }
          log()
        
          // Alert.alert('Invalid Credentials', '')
          
        }
        
      }
      }
  return (
    <View>
        <View style={{backgroundColor:"white",borderRadius:900,width:120,height:120,marginLeft:136,position:"absolute",marginTop:50}}>
            <Image style={{marginLeft:22,marginTop:25,position:"absolute"}} source={require("./assets/icon.png")}></Image>
        </View>
        <View>
            <TextInput style={{borderWidth:.1,backgroundColor:"white",width:"90%",height:50,borderColor:"gray",borderRadius:9,marginTop:20,paddingLeft:8,marginLeft:20,marginTop:220}} onChangeText={e=>setName(e.toLowerCase())} placeholder='Enter username...'/>
            <TextInput style={{borderWidth:.1,backgroundColor:"white",width:"90%",height:50,borderColor:"gray",marginTop:20,borderRadius:9,paddingLeft:8,marginTop:40,marginLeft:20,marginTop:10}} onChangeText={e=>setPassword(e)} placeholder='Enter password...'/>
        </View>
        <TouchableWithoutFeedback onPress={login}>
          <Text style={{backgroundColor:"#5A4BDA",textAlign:"center",height:50,paddingTop:15,width:330,marginLeft:"10%",marginTop:20,borderRadius:10,fontSize:15,color:'white',overflow:"hidden"}}>Login</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Forgot")}}>
         <Text style={{textAlign:"center",height:50,paddingTop:15,width:350,marginLeft:20,marginTop:20,borderRadius:10,fontSize:15,color:'black'}}>Forgot Your Password?</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Register")}}>
            <Text style={{textAlign:"center",height:50,width:350,marginLeft:20,marginTop:20,borderRadius:10,fontSize:15,color:'black'}}>Don't have an account?</Text>
        </TouchableWithoutFeedback>
    </View>
  )
}