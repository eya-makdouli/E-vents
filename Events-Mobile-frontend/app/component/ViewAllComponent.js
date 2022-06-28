import React, {useEffect, useRef, useState} from 'react'
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import EventInfo from './EventInfo';
import EventsJson from "../EventsJson";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigatorDots from "./Shared/NavigatorDots";
import {Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";



const ViewAllComponent = ({eventDetailState ,eventDetail,eventD,setEventD,user,item}) =>{

    return (
        <ScrollView style={{backgroundColor:"#fff"}}>
            <View style={styles.searchContainer}>
                <View style={styles.searchContainerForInput}>
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




            </View>
            <View style={{height: 50}}></View>
            {item.map((e,i) => <EventInfo item = {item[i]} eventDetailState={eventDetailState} eventDetail={eventDetail} eventD={eventD} setEventD={setEventD} user={user}/>)}
        </ScrollView>
            )

}
export default ViewAllComponent;
const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor: 'rgba(153, 151, 151, 0.5)',
        display: 'flex',



    },
    contain :{
        flex : 1,
        display:"flex",
        flexDirection: "column"
    },
    searchContainer :{
        height : "auto",
        width : "90%",
        display:"flex",
        flexDirection : "column",
        justifyContent:"center",
        alignItems:"center",
        marginTop : "3%",
    },
    searchContainerForInput :{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        width: "100%",
        paddingLeft : "5%"

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
    filterContainer : {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width : "100%",
        height : "auto",
        flexDirection:"row",
        padding : 15,
    },
    filter : {

        height: 38,
        width : 38,
        borderRadius : 87,
        backgroundColor:"#E9E9E9",
        marginLeft: 5,
        display:"flex",
        justifyContent: "center",
        alignItems:"center"
    }

});