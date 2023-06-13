import { View, Text ,TextInput,TouchableWithoutFeedback,Alert} from 'react-native'
import React, { useRef, useState } from 'react'
import { getDoc,getFirestore,doc, updateDoc,collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import app from './firebase'
import { decrypt, encrypt } from 'n-krypta'
// const jwt = require("jsonwebtoken")

// import { setUserId } from 'firebase/analytics'

export default function ForgotOTP({navigation}) {
  const db = getFirestore(app)
  const InputOne = useRef()
  const InputTwo = useRef()
  const InputThree = useRef()
  const InputFour = useRef()
  const [visible,setVisible] = useState(false)
  const [OTP,setOTP] = useState()
  const [UserOTP,SetUserOTP] = useState()
  const [email,setEmail] = useState(false)
  const coll = collection(db,"users")
  const [data] = useCollectionData(coll)
  async function sendOtp(){
    const filtered = data.filter(x=>x.name == email)
    // console.log(filtered[0])
    if(filtered[0]){

      
      const res = await fetch("https://api-olive-two.vercel.app/api/hello",{
        body:JSON.stringify({email:email,token:  "U2FsdGVkX1+k1eGGZozi7X/jT/Dy7hIyKAJ1XrHs20NAnoz+Bhe2b72uBonnZToxzbysard8fXitm3IFW9uutw==",}),
        method:"POST"
        
      })
      // const Doc = getDoc(doc(db,'users',email))
      setOTP((await res.json())['otp'])
      setVisible(true);
      // console.log(await res.json())
      
      
      
    }
    else{
      Alert.alert('This account does not exist', 'Please check your email', [

        // {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    }
    function checkOTP(){
    if(OTP.toString() == UserOTP){
      console.log("Password Reset")
      navigation.navigate("Reset",{verfied:true,email:email})
      updateDoc(doc(db,'users',email),{
        otp:"none"
      })
      // print("")

    }

  }
  return (

    <View>
    {visible ?
    <View>

      <Text style={{fontSize:22,marginLeft:"6%",marginTop:"30%",position:"absolute"}}>Please enter the OTP sent to your email</Text>
      <View style={{display:"flex",flexDirection:"row",gap:7,marginTop:"50%",marginLeft:"10%"}}>
      <TextInput onChangeText={e=>{InputTwo.current.focus();SetUserOTP(e)}} ref={InputOne} maxLength={1} style={{width:"20%",fontSize:60,paddingLeft:"6%",height:"120%",borderColor:"#5A4BDA",borderWidth:3,borderRadius:6}}></TextInput>
      <TextInput onChangeText={e=>{InputThree.current.focus();SetUserOTP(UserOTP + e)}}  ref={InputTwo} maxLength={1} style={{width:"20%",fontSize:60,paddingLeft:"6%",height:"120%",borderColor:"#5A4BDA",borderWidth:3,borderRadius:6}}></TextInput>
      <TextInput onChangeText={e=>{InputFour.current.focus();SetUserOTP(UserOTP + e)}}  ref={InputThree} maxLength={1} style={{width:"20%",fontSize:60,paddingLeft:"6%",height:"120%",borderColor:"#5A4BDA",borderWidth:3,borderRadius:6}}></TextInput>
      <TextInput onChangeText={e=>{SetUserOTP(UserOTP + e)}} ref={InputFour} maxLength={1} style={{width:"20%",fontSize:60,paddingLeft:"6%",height:"120%",borderColor:"#5A4BDA",borderWidth:3,borderRadius:6}}></TextInput>
    </View>
    <TouchableWithoutFeedback onPress={checkOTP}>
          <Text style={{backgroundColor:"#5A4BDA",width:"32%",color:"white",height:"15%",paddingLeft:40,paddingTop:17,fontSize:18,borderRadius:8,overflow:'hidden',marginLeft:"34%",marginTop:"12%"
        
        }}>Submit</Text>
      </TouchableWithoutFeedback>
      
      </View>
    :
    <View>
      <Text style={{fontSize:22,marginLeft:"23%",marginTop:"5%"}}>Forget Your Password?</Text>
      <TextInput style={{borderWidth:.1,backgroundColor:"white",width:"90%",height:50,borderColor:"gray",marginTop:20,borderRadius:9,paddingLeft:8,marginTop:40,marginLeft:20,marginTop:"10%"}} onChangeText={e=>setEmail(e.toLowerCase())} placeholder='Enter password...'/>
      <TouchableWithoutFeedback onPress={sendOtp}>
          <Text style={{backgroundColor:"#5A4BDA",width:"22%",color:"white",height:"22%",paddingLeft:19,paddingTop:13,fontSize:18,borderRadius:8,overflow:'hidden',marginLeft:"39%",marginTop:12
        
        }}>Submit</Text>
      </TouchableWithoutFeedback>
      </View>}

    </View>
  )
}