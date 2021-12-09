import React, { useState, useEffect } from "react";
import { View, Text,TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import { Divider } from "react-native-elements";
import { logIn } from '../../API/Apis';

import LottieView from "lottie-react-native";

import { useDispatch } from "react-redux";

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let user={
    username:'',
    password:''
  };

    const onChangeUserName = (val) => {
      user.username=val;
      console.log(user);
    };
    const onChangePassword = (val) => {
      user.password=val;
      
    };
  
    const { userInfoReducer , cartReducer } = useSelector(
      (state) =>  state
    );

  const { items, restaurantName } = cartReducer.selectedItems;
  const { isAuth } = userInfoReducer;
  console.log(userInfoReducer);
  console.log("isA");
  console.log(isAuth);
  console.log("isA");

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString('en-US', {style:'currency', currency:'USD'});
  console.log(totalUSD);

  const signIn = () => {
    setLoading(true);
  
      setTimeout(() => {
    logIn(user).then(data => {dispatch({
        type: "USER_LOG_IN",
        payload: { isAuth:data.access_token }});
         console.log(data.access_token);   setLoading(false);navigation.navigate("Checkout");} );

      }, 1500);
  };

  const handleModelOrSignIn=()=>{
    console.log(isAuth);
    if(isAuth) navigation.navigate("Checkout");
    else  setModalVisible(true) ;
  }
  

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>Please Sign In To Checkout</Text>
            <Divider
              width={0.5}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            />
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
           
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
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

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  backgroundColor: "#220066",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 26,
                  width: 220,
                  position: "relative",
                  opacity: 0.8
                }}
                onPress={() => {
                  
                  setModalVisible(false);
                  navigation.navigate('Account');
                }}
              >
                <Text style={{ color: "white", fontSize: 16, marginRight:25 }}>register</Text>
                
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 130,
            zIndex: 999,
          }}
        >
          {loading ? null :
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%"
            }}
          >
            
            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: "#220066",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
                opacity: .8
              }}
              onPress={() => handleModelOrSignIn()}
            >
              <Text style={{ color: "white", fontSize: 15, marginRight: 40 }}>
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 15 ,marginRight: 50}}>${totalUSD}</Text>
            </TouchableOpacity>
          
          </View>
            }
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
    paddingTop:60,
  },

  restaurantName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 20,
  },

  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  subtotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
});

