import React, {useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import UserSearchCard from "./userSearchCard";
import {ScrollView} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";


const StaffManagement = ({user})=> {
    const [staff , setStaff]= useState([]);
        useEffect(async ()=>{
            const response = await fetch("http://192.168.43.198:5555/api/v1/user/isstaff/"+true);
            const s = await response.json()
            setStaff(s);
        },[staff])

    return (<ScrollView>

        <View style={[styles.searchContainerForInput, {marginTop: "8%", marginBottom:"8%"}]}>
            <View style={styles.searchInput}>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Feather name="search" size={21} color="black" />
                    <TextInput placeholder={"Rechercher"} style={{marginLeft: "6%", width: "60%"}} />

                </View>
                <Text>Par : Nom</Text>
            </View>
            <View style={{marginLeft: "5%"}}>
                <Ionicons name="filter-sharp" size={24} color="#4A90E2" />
            </View>


        </View>
        {staff.map(s=>
        <UserSearchCard user={s} userConnected={user}/>)
        }
    </ScrollView>)
}
export default StaffManagement;
const styles = StyleSheet.create({
    ContainerAll : {
        display: "flex",
        justifyContent : "space-evenly",
        marginTop: "5%"
    },
    searchContainerForInput :{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        width: "100%",
        paddingLeft : "5%",
        paddingRight: "5%"

    },
    searchInput : {
        width : 286,
        height : 37,
        borderRadius : 238,
        backgroundColor: "#fff",
        opacity: 0.7,
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft : "4%",
        paddingRight : "4%",
        shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1

    },
    profile : {
        height: 50,
        width: 50
    },
    Container : {
        marginTop : "8%",
        width : "100%"
    },
    profileInfo : {
        display: "flex",
        width : "92%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems : "center",
        alignSelf: "center"

    },
    profileName : {
        color : "#004869",
        fontWeight: "bold"
    },
    creationDate : {
        color : "#000",
        fontWeight: "600"
    },
    interet : {
        color : "#000",
        fontWeight: "500"
    },
    infoContainer : {
        marginTop:"10%",
        display:"flex",
        justifyContent:"space-evenly",
        alignItems : "center",
        flexDirection: "row",

    },
    cercles : {
        display :"flex",
        justifyContent: "center",
        alignItems : "center"
    },
    Info : {
        marginTop:"15%",
        justifyContent: "center",
        alignItems:"center",
        height : 58,
        width : 58,
        backgroundColor : "#F2F2F2",
        borderRadius : 100
    },
    text : {
        fontWeight : "bold"
    },
    numbers : {
        color :"#3F3E3E",
        fontWeight : "600",
        fontSize: 18
    },
    btnInvite :{
        marginTop:"15%",
        position:"relative",
        backgroundColor: "#222222",
        height:46,
        width: "95%",
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        alignSelf:"center",
        bottom: 0,
        flexDirection: "row",
        borderRadius:5,
        marginBottom : 10,
    },
    btnText : {
        color: "#fff",
        fontWeight: "bold"
    }


})