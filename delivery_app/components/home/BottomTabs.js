import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useSelector } from "react-redux";
export default function BottomTabs({naviger}) {
  const {isAuth} = useSelector(
    (state) => state.userInfoReducer
  );
  console.log("hna",isAuth);
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Icon icon="home" text="Home" navigate={naviger} />
      <Icon icon="search" text="Browse" navigate={naviger} />
      {isAuth ? <Icon icon="receipt" text="Orders" navigate={naviger} /> : null}
      {isAuth ? null : <Icon icon="user" text="Account" navigate={naviger}/> }
    </View>
  );
}

const Icon = ({ icon, text, navigate  }) => {
  
  const navigateTo = () => {
   navigate(text);
  }
 return (
  
  <TouchableOpacity onPress={navigateTo}>
    <View>
      <FontAwesome5
        name={icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);}
