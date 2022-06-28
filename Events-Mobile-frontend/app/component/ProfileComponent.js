import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Feather, FontAwesome, Ionicons} from "@expo/vector-icons";
import UserEvents from "./UserEvents";

const ProfileComponent =  ({consults, setConsults,user, eventDetail, eventD, setEventD , eventDetailState, setType,setOpenedActivity,setProfileOpened, setEventDetailOpened,setEditTemplate}) => {
    const [loading, setLoading] = useState(false);
    const [users , setUsers]= useState();
    const [participent , setParticipent]= useState([]);
    const [partWithInvite , setPartWithInvite]= useState([]);
    const [staff , setStaff]= useState([]);

    useEffect(async ()=>{
        const res =await fetch("http://192.168.43.198:5555/api/v1/notification/participant/"+user.id+"/"+true+"/acceptedInvite");
        const r = await res.json();
        setPartWithInvite(r);
    },[])

    useEffect(async ()=>{
        const res =await fetch("http://192.168.43.198:5555/api/v1/notification/participant/"+user.id+"/"+true+"/paticipation");
        const r = await res.json();
        setParticipent(r);
    },[])

    useEffect(async ()=>{
        const res =await fetch("http://192.168.43.198:5555/api/v1/notification/participant/"+user.id+"/"+false+"/acceptRecruitment");
        const r = await res.json();
        setStaff(r);
    },[])

    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/user/id/"+user.id);
        setUsers(await response.json());
    }, []);
    if (users==null){return (<View style={{height:"73%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}><ActivityIndicator size="small" color="black" /></View>)}
        else
    {
        var t = users ?users.createdDate.toString().split(/[- :]/) : null;
// Apply each element to the Date function
        var d = new Date(t?Date.UTC(t[0], t[1] - 1, "07"): new Date());
        const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        var monthName = months[d.getMonth()];
    return(
        <ScrollView style={{height:'100%', backgroundColor:"#fff"}}>
        <View style={styles.ContainerAll}>

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
            <View style={styles.Container}>
                <View style={styles.profileInfo}>
                <View>
                    <Image source={{uri : users.picture}} style={styles.profile}/>
                </View>
                <View>
                    <Text style={styles.profileName}>{users.firstname + " " + users.lastname}</Text>
                    {users.createdDate &&<Text>Membre depuis :<Text style={styles.creationDate}>{"  "+monthName + " " + d.getFullYear()}</Text></Text>}

                    <Text>Centre d'intérêt : <Text style={styles.interet}> Musique , Sport, Dessin</Text></Text>

                </View>
            </View>
                <View style={styles.infoContainer}>
                    <View style={styles.cercles}>
                    <Text style={styles.text}>Organisateur</Text>
                        <View style={styles.Info}>
                        <Text style={styles.numbers}>{users.organisateur ? users.organisateur.length : 0}</Text>
                        </View>
                    </View>
                    <View style={styles.cercles}>
                    <Text style={styles.text}>Staff</Text>
                        <View style={styles.Info}>
                            <Text style={styles.numbers}>{staff ? staff.length : 0}</Text>
                        </View>
                    </View>
                    <View style={styles.cercles}>
                    <Text style={styles.text}>Participant</Text>
                        <View style={styles.Info}>
                            <Text style={styles.numbers}>{participent.length+ partWithInvite.length}</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: "6%"}}>
                    {users.event &&
                <UserEvents setEventDetailOpened={setEventDetailOpened} e={users.event} action={"Vous-avez participé a l'evenement de "}/>
                    }
                    {users.event &&<View style={{width: "100%" ,height: "auto", display:"flex",flexDirection : "row", justifyContent:"flex-end", alignItems:"center", marginLeft: "6%" , padding : 10 , paddingLeft : 0}}><TouchableOpacity onPress={()=> {setOpenedActivity(true) ; setProfileOpened(false)} }><View style={{display:"flex", flexDirection: "row" , width: 100 , justifyContent: "space-evenly" , alignItems:"center",marginRight: '6%'}}><Text style={{fontSize: 15 , fontWeight: "500" , color:"#4A90E2"}}>Voir Tout</Text><FontAwesome name="arrow-circle-right" size={24} color="#4A90E2" /></View></TouchableOpacity></View>}

                    {users.organisateur.length>0 && !consults&&
                        users.organisateur.map((e, i)=>
                        <TouchableOpacity onPress={()=>{eventDetail(!eventDetailState); setEventD(users.organisateur[i]); setType("organisateur")}}>
                            <UserEvents eventDetail={eventDetail} eventDetailState={eventDetailState} setEventD={setEventD} org={users.organisateur[i]} setType={setType}  setEditTemplate={setEditTemplate} setEventDetailOpened={setEventDetailOpened} setConsults={setConsults} consults={consults} e={users.organisateur[i].events[0]} action={"Vous-avez Organisé l'evenement "}/>
                     </TouchableOpacity>)
                    }
                    {users.organisateur.length>0&& consults &&<View>
                        <Text style={{width: '90%',alignSelf:"center"}}>Ce que {users.firstname} a organisé</Text>
                    {users.organisateur.map((e, i)=>
                        <UserEvents consults={consults} e={users.organisateur[i].events[0]} action={users.firstname+ " a organisé l'évenement "}/>
                    )}
                        </View>}

                    {users.organisateur.length>0 && !consults &&<View style={{width: "100%" ,height: "auto", display:"flex",flexDirection : "row", justifyContent:"flex-end", alignItems:"center", marginLeft: "6%" , padding : 10 , paddingLeft : 0}}><TouchableOpacity onPress={()=>{setOpenedActivity(true);setProfileOpened(false);}}><View style={{display:"flex", flexDirection: "row" , width: 100 , justifyContent: "space-evenly" , alignItems:"center",marginRight: '6%'}}><Text style={{fontSize: 15 , fontWeight: "500" , color:"#4A90E2"}}>Voir Tout</Text><FontAwesome name="arrow-circle-right" size={24} color="#4A90E2" /></View></TouchableOpacity></View>}
                </View>


            </View>

        </View>
        </ScrollView>
    )}
}

export default ProfileComponent;


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
        width: 50,
        borderRadius:100
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
        marginTop:"5%",
        position:"relative",
        backgroundColor: "#00AD61",
        height:46,
        width: "100%",
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        bottom: 0
    },
    btnText : {
        color: "#fff",
        fontWeight: "bold"
    }



})