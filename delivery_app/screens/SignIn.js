import React, { useState } from "react";
import { View, Text,ActivityIndicator, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Divider } from "react-native-elements";

import { logIn } from '../API/Apis';
import LottieView from "lottie-react-native";

import { useDispatch } from "react-redux";



export default function SignIn({navigation}){
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let user={
        username:'',
        password:''
      };

      const onChangeUserName = (val) => {
        user.username=val;
      };
      const onChangePassword = (val) => {
        user.password=val;
        
      };

      const signIn = () => {
        setLoading(true);
      
          setTimeout(() => {
            setLoading(false);
        logIn(user).then(data => {dispatch({
            type: "USER_LOG_IN",
            payload: { isAuth:data.access_token }});   setLoading(false);navigation.navigate("Home");} );
        
          }, 1500);
      };

      const _displayLoading = () => {
        if (loading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" color="black" />
            </View>
    
          )
        }
      }



    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>Please Sign</Text>
            
            <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeUserName(val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangePassword(val)}        />
           

           {loading ? _displayLoading() 
           :<View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: "#220066",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                  opacity: 0.8
                }}
                onPress={() => {
                  signIn();
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 20, marginRight:25 }}>Sign In</Text>
                
              </TouchableOpacity>
            </View>
            }
            
          </View>
        </View>
       
      </>
    );
  };





  
  

  const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.7)",
      },
  
      modalCheckoutContainer: {
        backgroundColor: "white",
        padding: 16,
        paddingTop:60,
        height: 500,
        borderWidth: 1,
      },
      input: {
        width: 350,
        height: 55,
        backgroundColor: 'black',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
      },
  
      restaurantName: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
        marginBottom: 10,
      },
  
      subtotalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
      },
  
      subtotalText: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 17,
        marginBottom: 10,
      }
  
  })