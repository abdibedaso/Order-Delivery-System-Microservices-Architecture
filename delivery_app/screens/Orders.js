import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal,ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";


export default function Orders({navigation}){

    const [lastOrder, setLastOrder] = useState({
        items: [],
      });
      const [total, setTotal] = useState(0);
    
      console.log(lastOrder);
      console.log(lastOrder);
      {/*let t = lastOrder.map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);*/}

    useEffect(() => {
        const db = firebase.firestore();
          const unsubscribe = db
            .collection("orders")
            .orderBy("createdAt", "desc")
            .limit(5)
            .onSnapshot((snapshot) => {
              snapshot.docs.map((doc) => {
                setLastOrder(doc.data().items);
                setTotal(doc.data().items
                .map((item) => Number(item.price.replace("$", "")))
                .reduce((prev, curr) => prev + curr, 0));
              });
            });
      
           return () => unsubscribe(); 
       
        }, []);
        if(total==0) return null;
    return (
<SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15, marginTop:30 }}>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: "white", padding: 15, marginTop:30 }}>

<Text> Orders Here </Text>
<Text> Total Order : ${total} </Text>
<Text> Status : ongoing </Text>
<Divider width={1} />

</View >
<BottomTabs naviger={navigation.navigate}/>
      </ScrollView>
     
    </SafeAreaView>)
}