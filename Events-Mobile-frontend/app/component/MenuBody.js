import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Touchable} from "react-native-web";


const MenuBody = ({setCreateEventOpened,setProfileOpened, ProfileOpened,setStaffRequestOpened, staffRequestOpened,dark,setDark ,activityState,Activity, annimation, op , opened , notif,navigation, user ,connectedUser,setCategoriesOpened, setLocationOpened,setStaffServiceOpened,setProfileEdit})=> {
    const [loading , setLoading]= useState(false);
    useEffect(()=> {
        setDark(dark);

    },[])
    const deconnect = async () =>{
        try {
            await AsyncStorage.removeItem("@user");
        }catch (e) {
        }
        setLoading(true);
        setTimeout(()=>{
        navigation.replace("VisitorScreen");
        },2000)
    };

    return(

        <ScrollView style={[{backgroundColor:"#fff" , position:"relative" , zIndex: 99999}, !dark ? {backgroundColor:"#5A5A5A"} : {backgroundColor:"#fff"} ]}>

            <View style={styles.paramContainer}>
                <TouchableOpacity onPress={()=> {setLocationOpened(false) ; setStaffServiceOpened(false);setProfileEdit(false);setCategoriesOpened(false); Activity(true);  annimation(); opened(!op); notif(false)}} style={[styles.paramContainer, {width: "100%"}]}>
        <View style={[styles.parameters , !dark ? {backgroundColor:"#1A1A1A"} : null ]}>
            <Text style={[styles.param , !dark ? {color:"#fff"} : null ]}>Vos Activité</Text>
            <Image source={require("../assets/param.png")} style={styles.icon}/>
        </View>
    </TouchableOpacity>
        <View style={styles.description}><Text style={[styles.desc , !dark ? {color:"#fff"} : null ]}>Consulté et gérer vos activité bla bla bla bla bla bla</Text></View>

    </View>

    <View style={styles.paramContainer}>
        <TouchableOpacity style={[styles.paramContainer, {width: "100%"}]} onPress={()=> {Activity(false);setCategoriesOpened(false); setLocationOpened(false); setStaffServiceOpened(false) ;setProfileEdit(true); annimation(); opened(!op); notif(false); setProfileOpened(false); setCreateEventOpened(false)}}>
        <View style={[styles.parameters , !dark ? {backgroundColor:"#1A1A1A"} : null ]}>
            <Text style={[styles.param , !dark ? {color:"#fff"} : null ]}>Gérer votre profile</Text>
            <Image source={require("../assets/param.png")} style={styles.icon}/>
        </View></TouchableOpacity>
        <View style={styles.description}><Text style={[styles.desc , !dark ? {color:"#fff"} : null ]}>Consulté et gérer vos activité bla bla bla bla bla bla</Text></View>

    </View>
            {connectedUser&&connectedUser.isAdmin==false|| connectedUser&&connectedUser.isAdmin==null&&<View style={styles.paramContainer}>
                <TouchableOpacity style={[styles.paramContainer, {width: "100%"}]} onPress={()=> {setProfileEdit(false);setCategoriesOpened(false) ; setLocationOpened(false); setStaffServiceOpened(false); setStaffRequestOpened(true); annimation(); opened(!op); notif(false); setProfileOpened(false); setCreateEventOpened(false)}}>
                    <View style={[styles.parameters , !dark ? {backgroundColor:"#1A1A1A"} : null ]}>
            <Text style={[styles.param , !dark ? {color:"#fff"} : null ]}>Devenir un staff</Text>
            <Image source={require("../assets/param.png")} style={styles.icon}/>
        </View></TouchableOpacity>
        <View style={styles.description}>
            <Text style={[styles.desc , !dark ? {color:"#fff"} : null ]}>Consulté et gérer vos activité bla bla bla bla bla bla</Text>
        </View>
    </View>}

            {connectedUser&&connectedUser.isAdmin&&<View style={styles.paramContainer}>
                <TouchableOpacity onPress={()=> {Activity(false);setProfileEdit(false);setCategoriesOpened(false); setLocationOpened(false); setStaffServiceOpened(true);  annimation(); opened(!op); notif(false)}} style={[styles.paramContainer, {width: "100%"}]}>
                <View style={[styles.parameters , !dark ? {backgroundColor:"#1A1A1A"} : null ]}>
                    <Text style={[styles.param , !dark ? {color:"#fff"} : null ]}>Gérer les services staffs</Text>
                    <Image source={require("../assets/param.png")} style={styles.icon}/>
                </View></TouchableOpacity>
                <View style={styles.description}>
                    <Text style={[styles.desc , !dark ? {color:"#fff"} : null ]}>Consulté et gérer vos activité bla bla bla bla bla bla</Text>
                </View>
            </View>}

            {connectedUser&&connectedUser.isAdmin&&<View style={styles.paramContainer}>
                <TouchableOpacity onPress={()=> {setProfileEdit(false);Activity(false);setCategoriesOpened(true); setStaffServiceOpened(false); setLocationOpened(false);  annimation(); opened(!op); notif(false)}} style={[styles.paramContainer, {width: "100%"}]}>
                    <View style={[styles.parameters , !dark ? {backgroundColor:"#1A1A1A"} : null ]}>
                    <Text style={[styles.param , !dark ? {color:"#fff"} : null ]}>Gérer les Catégories</Text>
                    <Image source={require("../assets/param.png")} style={styles.icon}/>
                </View></TouchableOpacity>
                <View style={styles.description}>
                    <Text style={[styles.desc , !dark ? {color:"#fff"} : null ]}>Consulté et gérer vos activité bla bla bla bla bla bla</Text>
                </View>
            </View>}

            {connectedUser&&connectedUser.isAdmin&&<View style={styles.paramContainer}>
                <TouchableOpacity onPress={()=> {setProfileEdit(false);Activity(false);setCategoriesOpened(false); setLocationOpened(true); setStaffServiceOpened(false);  annimation(); opened(!op); notif(false)}} style={[styles.paramContainer, {width: "100%"}]}>
                <View style={[styles.parameters , !dark ? {backgroundColor:"#1A1A1A"} : null ]}>
                    <Text style={[styles.param , !dark ? {color:"#fff"} : null ]}>Gérer les Localisations</Text>
                    <Image source={require("../assets/param.png")} style={styles.icon}/>
                </View></TouchableOpacity>
                <View style={styles.description}>
                    <Text style={[styles.desc , !dark ? {color:"#fff"} : null ]}>Consulté et gérer vos activité bla bla bla bla bla bla</Text>
                </View>
            </View>}

            <View style={{width: "90%", justifyContent:"center" , alignSelf:"center"}}>
    <TouchableOpacity style={styles.deconnect} onPress={() => deconnect() } >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Déconnexion</Text>}</TouchableOpacity>

    <Text style={[styles.description, {marginTop: "10%"}, !dark ? {color:"#fff"} : null ]}>© Copyright réservés à E-vents</Text>
            </View>

        </ScrollView>

    )}
export default MenuBody;

const styles = StyleSheet.create({
    container: {
        height:177,
        width: Dimensions.get('window').width,
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent: "center"



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
        alignSelf: "center",
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