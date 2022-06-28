import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import {View,Text} from "react-native";
const Loader = () => {

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' , display: "flex", flexDirection:"row" }}
            >
            <Text style={{fontSize:20, color:"white" , fontWeight:"300"}}>Loading...</Text>
            <Entypo name="rocket" size={30} color="white" />
        </View>
    )







}
export default Loader;