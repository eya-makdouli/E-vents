import React, {useEffect, useState} from 'react'
import { StyleSheet, View,Image,Text,Button, TouchableHighlight ,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity} from "react-native";
import {ScrollView, Touchable} from "react-native";
import {Switch} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';



const MenuHeader = ({annimation , opened, op, dark, setDark , user, setProfileOpened ,ProfileOpened})=> {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {setIsEnabled(previousState => !previousState); setDark(isEnabled)};
    return (
        <View style={[styles.container, isEnabled ? {backgroundColor: "#5A5A5A"} : {backgroundColor: "#fff"}]} >
        <View style={{display: 'flex', flexDirection: 'row' ,alignItems:"center", justifyContent: 'space-evenly',width:"100%"}}>
            <TouchableOpacity onPress={() =>{opened(!op); annimation() ; setDark(true);setProfileOpened(true) }}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems:"center"}}>
                    <Image style={styles.profile} source={{uri : user.picture}}/>
                    <View style={{display: 'flex', flexDirection: 'column', alignItems:"center"}}>
                    <Text style={[{color:'#004869', fontWeight:"900", marginLeft:5, fontSize:12} , isEnabled ? {color:"#fff"} : null]}>
                        {user.firstname +" " + user.lastname}
                    </Text>
                    {user.isAdmin&&<Text style={{color:"#00AD61" ,fontWeight:"900", marginLeft:5, fontSize:12,alignSelf:"flex-start"}}>Admin</Text>}
                </View>
                </View>
            </TouchableOpacity>
            <View style={{display: 'flex', flexDirection: 'row', alignItems:"center", width:150,justifyContent: 'space-evenly'}}>
                <Switch  trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled}/>
                <TouchableOpacity onPress={() =>{opened(!op); annimation() ; setDark(true)}}>
                <MaterialCommunityIcons name="window-close" size={40} color="#7BACE6" />
                </TouchableOpacity>
            </View>

        </View>
            <View style={{height: 20}}></View>
        <View>
            <Text style={[{color:"#004869", fontWeight:"800", fontSize:21}, isEnabled ? {color:"#fff"} : null]}> Mon Compte</Text>

        </View>


    </View>
    )
}
export default MenuHeader
const styles = StyleSheet.create({
    container: {
        height:177,
        width: Dimensions.get('window').width,
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent: "center",
        position:'relative',
        zIndex: 99999,
        backgroundColor: "#fff"



    },

    profile: {
        width: 49,
        height:48,
        borderRadius:500

    },
    parameters: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf: "center",
        padding: 8,
        backgroundColor: "#F2F2F2",
        borderRadius: 3,
        paddingLeft: "8%",
        paddingRight: "8%"
    },
    paramContainer : {
        marginTop: "5%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        alignSelf: "center"
    },
    icon : {
        width: 29,
        height: 29
    },
    description : {
        marginTop : "2%",
        fontSize : 14,
        width: "80%",
        fontWeight: "100",
        alignSelf: "flex-start"
    },
    param : {
        fontSize: 18,
        fontWeight: "700"
    },
    deconnect : {
        marginTop: "12%",
        width : "100%",
        height: 36,
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#00AD61",
        borderRadius: 3
    },
    btnText : {
        fontSize:18,
        fontWeight: "700",
        color: "#fff"
    }


})