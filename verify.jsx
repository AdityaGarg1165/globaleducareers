import { View, Text,TextInput,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
// const jwt = require('jsonwebtoken')

export default function Verify({route,navigation}) {
    const {id} = route.params
    console.log(id)
  return (
    <View>
      <Text style={{fontSize:20,fontWeight:"700",marginLeft:10,marginTop:30}}>Please enter the OTP sent to your email</Text>
      <TextInput placeholder='Enter OTP' style={{borderWidth:3,borderRadius:8,width:150,marginLeft:115,marginTop:20,padding:9,fontSize:30}}/>
      <TouchableWithoutFeedback>
            <Text style={{backgroundColor:"#ce4027",width:140,color:"white",paddingLeft:38,height:55,paddingTop:15,fontSize:18,marginLeft:120,borderRadius:8,marginTop:20}}>Submit</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}