import React, { useEffect, useState }from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,     
  Text
} from 'react-native'

import { createUser } from '../API/Apis';
import { Divider } from "react-native-elements";
export default  SignUp = ({navigation}) =>  {
  
    let user ={
      userName: '', 
    password: '', 
    email: '', 
    phoneNumber: '',
    payment:{},
    address:{},
    role: "CUSTOMER"
    };


let address = {
    zipCode:'',
    city:'',
    hoseNumber:'',
    streetName:'',
    latitude: 41.01977938731343,
    longitude:-91.96781914203154,
};

 let   payment = {
    cardNumber: '',
    expireMonth:'',
    expireYear:'',
    ccv:''
    };


    const onChangePayment=(val, name)=>{
      payment[name] = val ;
    }
    const onChangeAddress=(val, name)=>{
      address[name] = val ;
      
    }
    const onChangeUser=(val, name)=>{
      user[name] = val ;
    }

    



const [isLoading,setIsLoading] =useState(false);

 const signUp = async () => {
   user.address=address;
   user.payment=payment;
  
  setIsLoading(true);
  setTimeout(() => { 
   createUser(user).then(data => {  setIsLoading(false);navigation.navigate("SignIn");} ).catch((error) => console.error(error));

  }, 1500);
    
  }
 const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#eee" />
        </View>

      )
    }
  }
 
  
    return (
      <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
         <ScrollView>
      <View style={styles.container}>

      <Text style={styles.text}>User Informations</Text>
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.smallInput}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeUser(val, 'userName')}
        />
        <TextInput
          style={styles.smallInput}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeUser(val,'password')}        />
      </View>
       
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.smallInput}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeUser(val,'email')}        />



          
        <TextInput
          style={styles.smallInput}
          placeholder='Phone Number'
          autoCapitalize="none"
          keyboardType="numeric"
          placeholderTextColor='white'
          onChangeText={val => onChangeUser(val,'phoneNumber')}        />
      </View > 
      <View style={{
          alignSelf: 'stretch',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
          marginHorizontal:20,
        }} />
<Text style={styles.text}>address Information</Text>
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.smallInput}
          placeholder='city'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeAddress(val,'city')}
        />
        <TextInput
          style={styles.smallInput}
          placeholder='zip code'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeAddress(val,'zipCode')}        />
      </View>

     



       
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.smallInput}
          placeholder='street name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeAddress(val,'streetName')}        />
          
        <TextInput
          style={styles.smallInput}
          placeholder='house number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeAddress(val,'hoseNumber')}        />
      </View > 
      
      <View style={{
          alignSelf: 'stretch',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
          marginHorizontal:20,
        }} />
<Text style={styles.text}>Payement Information</Text>




    <View >  
    <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.input}
          placeholder='Card Number'
          autoCapitalize="none"
          
          keyboardType="numeric"
          placeholderTextColor='white'
          onChangeText={val => onChangePayment(val, 'cardNumber')}
        />
       
      </View>
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.verySmallInput}
          placeholder='Month'
          autoCapitalize="none"
          placeholderTextColor='white'
          
          keyboardType="numeric"
          onChangeText={val => onChangePayment(val,'expireMonth')}
        />
      
        <TextInput
          style={styles.verySmallInput}
          placeholder='Year'
          autoCapitalize="none"
          placeholderTextColor='white'
          
          keyboardType="numeric"
          onChangeText={val => onChangePayment(val,'expireYear')}        />
          <TextInput
          style={styles.verySmallInput}
          placeholder='CCV'
          autoCapitalize="none"
          keyboardType="numeric"
          placeholderTextColor='white'
          onChangeText={val => onChangePayment(val,'ccv')}        />
      </View>
    
        </View>
        {isLoading ? _displayLoading() : <View style={{marginTop:30}}><Button
          title='Sign Up'
          onPress={signUp}
        /></View> }
             
      </View>
      </ScrollView>
      </SafeAreaView>
    )
  }


const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: 'black',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: '500',
  },
  text:{
marginVertical:10,
color:'blue',
fontSize:16,

fontWeight: '500',
  },
  smallInput: {
    width: 170,
    height: 55,
    backgroundColor: 'black',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: '500',
  },
  verySmallInput: {
    width: 100,
    height: 55,
    backgroundColor: 'black',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:120,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})