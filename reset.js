import { View, Text,TextInput,TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import app from './firebase'
import { encrypt } from 'n-krypta'
import { getFirestore,updateDoc,doc } from 'firebase/firestore'

export default function Reset({route,navigation}) {
    const [visible,setVisible] = useState(false)
    const [password,setPassword] = useState()
    const verified = route.params.verfied
    const email = route.params.email
    const db = getFirestore(app);
    useEffect(()=>{
        if(verified){
            setVisible(true)
        }
    },[])

    function changePassword(){
        if(verified){
            updateDoc(doc(db,'users',email),{
                "password":encrypt(password,"mirdul_khota#62490")
            })
            navigation.navigate("Login")

        }
    }
  return (
    <View>
      {visible ? <View>
        <Text style={{fontSize:22,marginLeft:"23%",marginTop:"5%"}}>Reset Your Password?</Text>
      <TextInput style={{borderWidth:.1,backgroundColor:"white",width:"90%",height:50,borderColor:"gray",marginTop:20,borderRadius:9,paddingLeft:8,marginTop:40,marginLeft:20,marginTop:"10%"} } onChangeText={e=>setPassword(e)} placeholder='Enter New password...'/>
      <TouchableWithoutFeedback onPress={changePassword}>
          <Text style={{backgroundColor:"#5A4BDA",width:"22%",color:"white",height:"22%",paddingLeft:19,paddingTop:13,fontSize:18,borderRadius:8,overflow:'hidden',marginLeft:"39%",marginTop:12
        
        }}>Submit</Text>
      </TouchableWithoutFeedback>
      </View>:<View></View>}
    </View>
  )
}