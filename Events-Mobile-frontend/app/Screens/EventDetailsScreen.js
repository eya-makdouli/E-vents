import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, useWindowDimensions, ImageBackground, ActivityIndicator} from 'react-native';
import EventDetails from "../component/EventDetails";
import {ScrollView} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity} from "react-native";
import {TouchableHighlight} from "react-native";
import EditEvent from "../component/EditEvent";





const EventDetailsScreen = ({navigation, state, eventDetails,type,setType,user, category,editTemplate,setEditTemplate}) =>{
const {window} = useWindowDimensions();
const [organisateur, setOrganisateur] = useState();
const [Loading , setLoading] = useState({});
    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/organisateur/"+parseInt(eventDetails.id));
        setOrganisateur(await response.json());
    },[])

if(organisateur!= null){

    return (
        <View style={{height: "100%" , width: "100%"}}>

            <ImageBackground source={eventDetails.events[0].backgroundImage== null?require("../assets/baby.jpg"): {uri : eventDetails.events[0].backgroundImage}} resizeMode="cover" style={styles.image}>
               <TouchableOpacity onPress={() => {state(false); setType(null); setEditTemplate(false) }} style={styles.close}>
                <Ionicons name="close" size={32} color="white"  />
               </TouchableOpacity>
                {!editTemplate?<EventDetails user={user} organisateur={organisateur} navigation={navigation} eventDetails={eventDetails.events[0]} type={type}/>:
                <EditEvent category={category} user={user} organisateur={organisateur} navigation={navigation} eventDetails={eventDetails.events[0]} type={type}/>}
            </ImageBackground>

        </View>

    )}else{
    return (<View style={{height:300, width:300, display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}><ActivityIndicator size="small" color="black" /></View>)
};
}
export default EventDetailsScreen;
const styles = StyleSheet.create({
    Container : {

    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    close : {
        position :"absolute",
        right : "3%",
        top: "3%"
    }

})
