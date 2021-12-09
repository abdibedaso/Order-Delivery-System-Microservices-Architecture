import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image,ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../components/restaurantDetail/OrderItem";
import firebase from "../firebase";
import LottieView from "lottie-react-native";


import { makeOrder } from '../API/Apis';
export default function Checkout({ route, navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  


  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const { isAuth } = useSelector(
    (state) => state.userInfoReducer
  );
  let foods = [];

  let address = {
    zipCode: '52557',
    city: 'FairFiled',
    phoneNumber: '',
    hoseNumber: '142G7',
    streetName: 'Goldfinch',
    latitude: 41.01977938731343,
    longitude: -91.96781914203154
  };

  

  const total = items
    .map((item) => Number(item.price.replace("$", "")) )
    .reduce((prev, curr) => prev + curr, 0);

    items.map((item) => foods.push({ name: item.title, price: item.price }));
  const totalUSD = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  console.log(foods);
  let user = {
    id: 1,
    userName: "lemama",
    email: "bula@gmail.com",
    address: address
  };
  let restaurant = {
    id: "2",
    restaurantName: restaurantName,
    email: "pizzaranch@granch.com",
    address: address
  };
  let payment = {
    cardNumber: "600 8909 8897 4434",
    expireMonth: "07",
    expireYear: "26",
    ccv: "679",
  };



  let order = {
    user: user,
    foods: foods,
    restaurant: restaurant,
    payment: payment,
    dasher: {}
  };



  const addOrderToBackspring = () => {
    setLoading(true);

    setTimeout(() => {
      {/*makeOrder(user, isAuth).then(data => {
        
        console.log(data); setLoading(false); navigation.navigate("OrderCompleted");
      }) .catch((error) => console.log("erroooor"));
    */}
    
    setLoading(false); navigation.navigate("OrderCompleted");
    }, 1500);
  }
   const addOrderToBackEnd = () => {
        setLoading(true);
        const db = firebase.firestore();
        db.collection("orders")
          .add({
            items: items,
            restaurantName: restaurantName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
           
            setTimeout(() => {
              setLoading(false);
              navigation.navigate("OrderCompleted");
            }, 1500);
          });
      };
   


  return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>

    <View >

    <Image source={{ uri: "https://th.bing.com/th/id/R.c17b385ea235391ecc104b4c298be577?rik=pQOD3jt9d2KE6w&pid=ImgRaw&r=0" }} style={{ width: "100%", height: 320 }} />
    </View >
    <View style={{ width: "100%", height: 320, backgroundColor:"#eee",position:"absolute", opacity:0.7}}></View>
   
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          
      <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          {items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Total :</Text>
            <Text style={styles.subtotalText}>${total}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#220066",
                alignItems: "center",
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: "relative",
                opacity: 0.8
              }}
              onPress={() => {
                {/*addOrderToBackspring();*/}
                addOrderToBackEnd();
              }}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 25 }}>Checkout</Text>
              <Text
                style={{
                  position: "absolute",
                  right: 20,
                  color: "white",
                  fontSize: 15,
                  top: 17,
                  marginRight: 40
                }}
              >
                ${total ? totalUSD : ""}
              </Text>
            </TouchableOpacity>
          </View>
          
      </ScrollView>
        </View>
        
      </View>
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
            source={require("../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
   
   </SafeAreaView>
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
    padding: 30,
    height: 500,
    borderWidth: 1,
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
  },
});
