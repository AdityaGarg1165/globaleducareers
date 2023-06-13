// import Toast from 'react-native-toast-message';
import { encrypt,decrypt } from 'n-krypta'
import { View, AlertIOS,Text,Image,Alert,TextInput,Button,TouchableWithoutFeedback,ToastAndroid, Platform} from 'react-native'
import React, { useState } from 'react'
import {getFirestore,collection,doc,addDoc, setDoc} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import app from './firebase'
export default function Register({navigation}) {
  const [user,setName] = useState()
  const [password,setPassword] = useState()
  const db = getFirestore(app)
  const coll = collection(db,"users")
  const [data] = useCollectionData(coll)
  
  function signup(){
    if(user && password){

      const curruser = data.filter(x=>x.name == user)
      if(curruser[0]){

          Alert.alert('This account does not exist', 'Please check your email')
        
 
      }
    else{
    

          
      Alert.alert('Account Created', 'Account Created Succesfully')
          const a  = setDoc(doc(db,"users",user),{
            name:user,
            password:encrypt(password,"mirdul_khota#62490")
          })
        

 
  }
  }
  else{
    
    if(Platform.OS == "android"){
      
      // ToastAndroid.show("Please fill all the feilds",ToastAndroid.LONG)
      Alert.alert('Please fill all the feilds')
    }
    else{
      Alert.alert('Please fill all the feilds')
      // AlertIOS("Please fill all the feilds")
    }
  }
    }



  return (
    <View>
        <View style={{backgroundColor:"white",borderRadius:900,width:120,height:120,marginLeft:136,position:"absolute",marginTop:50}}>
            <Image style={{marginLeft:22,marginTop:25,position:"absolute"}} source={require("./assets/icon.png")}></Image>
        </View>
        <View>
            <TextInput style={{borderWidth:.1,backgroundColor:"white",width:"90%",height:50,borderColor:"gray",borderRadius:8,paddingLeft:8,marginTop:20,marginLeft:20,marginTop:220}} onChangeText={(e)=>{setName(e.toLowerCase())}} placeholder='Enter email...'/>
            <TextInput style={{borderWidth:.1,backgroundColor:"white",width:"90%",height:50,borderColor:"gray",borderRadius:8,marginTop:40,paddingLeft:8,marginLeft:20,marginTop:10}} onChangeText={e=>setPassword(e)} placeholder='Enter password...'/>
        </View>

        <TouchableWithoutFeedback onPress={signup}>
          <Text style={{backgroundColor:"#5A4BDA",overflow:"hidden",textAlign:"center",height:50,paddingTop:15,width:330,marginLeft:25,marginTop:20,borderRadius:10,fontSize:15,color:'white'}}>Sign up</Text>
        </TouchableWithoutFeedback>
        {/* <Text style={{backgroundColor:"#ce4027",textAlign:"center",height:50,paddingTop:15,width:350,marginLeft:20,marginTop:20,borderRadius:10,fontSize:15,color:'white'}}>Sign up with google</Text> */}
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Login")}}>
            <Text style={{textAlign:"center",height:50,width:350,marginLeft:20,marginTop:20,borderRadius:10,fontSize:15,color:'black'}}>Already have have an account?</Text>
        </TouchableWithoutFeedback>

    </View>
  )
}