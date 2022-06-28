import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {Feather, Ionicons} from "@expo/vector-icons";
import UserEvents from "./UserEvents";
import {ScrollView} from "react-native";
import {ActivityIndicator} from "react-native";
import dimensions from "react-native-web/dist/exports/Dimensions";




const ActivityComponent =({user, eventDetail, eventD, setEventD , eventDetailState, setType,setOpenedActivity,setProfileOpened, setEventDetailOpened,setEditTemplate}) => {
    const [users , setUsers]= useState(null)
    const [loading, setLoading] = useState(true);
    const [participent , setParticipent]= useState([]);
    const [partWithInvite , setPartWithInvite]= useState([]);

    useEffect(async ()=>{
        const res =await fetch("http://192.168.43.198:5555/api/v1/notification/participant/"+user.id+"/"+true+"/paticipation");
        const r = await res.json();
        setParticipent(r);
    },[])


    useEffect(async ()=>{
        const res =await fetch("http://192.168.43.198:5555/api/v1/notification/participant/"+user.id+"/"+true+"/acceptedInvite");
        const r = await res.json();
        setPartWithInvite(r);
    },[])
    useEffect(async ()=>{

        const response = await fetch("http://192.168.43.198:5555/api/v1/user/id/"+user.id).then(setLoading(false)).catch(setLoading(true));
        setUsers(await response.json());
    }, []);

    setTimeout(()=>{
        setLoading(false);
    },3000);

    if (loading){return (<View style={{height:"73%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}><ActivityIndicator size="small" color="black" /></View>)}
    else{
    return (
        <ScrollView style={{height:'100%', backgroundColor:"#fff" }}>
            <View style={[styles.searchContainerForInput, {marginTop: "8%"}]}>
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
            <View style={styles.infoContainer}>
                <View style={styles.cercles}>
                    <Text style={styles.text}>Organisateur</Text>
                    <View style={styles.Info}>
                        <Text style={styles.numbers}>{users.organisateur.length>0 ? users.organisateur.length : 0}</Text>
                    </View>
                </View>
                <View style={styles.cercles}>
                    <Text style={styles.text}>Staff</Text>
                    <View style={styles.Info}>
                        <Text style={styles.numbers}>{users.staff ? users.staff.length : 0}</Text>
                    </View>
                </View>
                <View style={styles.cercles}>
                    <Text style={styles.text}>Participant</Text>
                    <View style={styles.Info}>
                        <Text style={styles.numbers}>{participent.length+ partWithInvite.length}</Text>
                    </View>
                </View>
            </View>
            {users.events.length>0 || partWithInvite ?<View style={{marginTop: "6%"}}>
                <Text style={{width: '90%',alignSelf:"center"}}>Que Vous-avez Participé</Text>
                {participent.map((e, i)=>
                    <TouchableOpacity onPress={()=>{eventDetail(!eventDetailState); setEventD(e.org); setType("organisateur")}}>
                    <UserEvents eventDetail={eventDetail} eventDetailState={eventDetailState} setEventD={setEventD} org={users.organisateur[i]} setType={setType}  setEditTemplate={setEditTemplate} setEventDetailOpened={setEventDetailOpened} e={e.event}/>
                    </TouchableOpacity>
                )}
                {partWithInvite.map((e, i)=>
                    <TouchableOpacity onPress={()=>{eventDetail(!eventDetailState); setEventD(e.org); setType("organisateur")}}>
                    <UserEvents eventDetail={eventDetail} eventDetailState={eventDetailState} setEventD={setEventD} org={users.organisateur[i]} setType={setType}  setEditTemplate={setEditTemplate} setEventDetailOpened={setEventDetailOpened} e={e.event}/>
                    </TouchableOpacity>
                )}
            </View>: null}
            {users.organisateur.length>0&&<View style={{marginTop: "6%"}}>
                <Text style={{width: '90%',alignSelf:"center"}}>Que vous-avez organisé</Text>
                {users.organisateur.map((e, i)=>
                    <TouchableOpacity onPress={()=>{eventDetail(!eventDetailState); setEventD(user.organisateur[i]); setType("organisateur")}}>
                    <UserEvents eventDetail={eventDetail} eventDetailState={eventDetailState} setEventD={setEventD} org={users.organisateur[i]} setType={setType}  setEditTemplate={setEditTemplate} setEventDetailOpened={setEventDetailOpened}  e={users.organisateur[i].events[0]}/>
                    </TouchableOpacity>
                        )}
                </View>}


            <TouchableOpacity style={styles.btnInvite}><Text style={styles.btnText}>Supprimer Tous</Text><Ionicons name="md-trash-bin" size={24} color="white" style={{position: "absolute" , right :"5%"}}/></TouchableOpacity>
        </ScrollView>

    )}
}
export default ActivityComponent;
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