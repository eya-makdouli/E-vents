import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Notifications = ({item, setSelectedUser,setProfileDetailOpened,setNotificationOpened}) => {
        const [not , setNot ] = useState([]);
        const[loading , setLoading] = useState(true);
        const [newUser, setNewUser]= useState(null)

    useEffect(async ()=>{
        const response =await fetch("http://192.168.43.198:5555/api/v1/user/id/"+item.user.id);
        setNewUser(await response.json());
    },[]);

        const AcceptInvite =async ()=>{
            await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
                method: 'POST',
                body: JSON.stringify({
                    type : "acceptationEvent",
                    action : "a accepter votre invitation de rejoindre l'evenement",
                    solved : false,
                    accepted: false,
                    refused : false,
                    user : {id: item.org.id},
                    org : {id : item.user.id},
                    event : {id : item.event.id}
                })
                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }

                ,
            }).then(async res => await res.json())
                .then(async (res)=> {
                    await fetch('http://192.168.43.198:5555/api/v1/notification/update/'+parseInt(item.id), {
                        method: 'PUT',
                        body: JSON.stringify({
                           ...res,
                            type : "acceptedInvite",
                            solved : true,
                            accepted : true
                        })
                        , headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        }
                        ,}).then((res)=> res.json())
                        .then(async (resJson)=> {

                        })
                });
        }

        const RefuseInvite= async ()=>{
            await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
                method: 'POST',
                body: JSON.stringify({
                    type : "acceptationEvent",
                    action : "a réfusé votre invitation de rejoindre l'évenement",
                    solved : false,
                    accepted: false,
                    refused : false,
                    user : {id: item.org.id},
                    org : {id : item.user.id},
                    event : {id : item.event.id}
                })
                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }

                ,
            }).then(async res => await res.json())
                .then(async (res)=> {
                });

        }

        const Refused = async () =>{
            await fetch('http://192.168.43.198:5555/api/v1/notification/update/'+parseInt(item.id), {
                method: 'PUT',
                body: JSON.stringify({
                    type : "paticipation",
                    action : "Est Réfusé de la participation de votre évenement",
                    solved : true,
                    user : { id : not.user.id},
                    event : {id : parseInt(not.event.id)},
                    org : {id : not.org.id},
                    accepted : false,
                    refused : true
                })
                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }
                ,}).then((res)=> res.json())
                .then(async (resJson)=> {})
        }

        const Accepted =async () => {
            await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
                method: 'POST',
                body: JSON.stringify({
                    type : "acceptationParticipation",
                    action : "a accepter votre demande de participation pour l'evenement",
                    solved : false,
                    accepted: false,
                    refused : false,
                    user : {id: item.org.id},
                    org : {id : item.user.id},
                    event : {id : item.event.id}
                })
                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }

                ,
            }).then(async res => await res.json())
                .then(async (res)=> {
                });
            await fetch('http://192.168.43.198:5555/api/v1/notification/update/'+parseInt(item.id), {
                method: 'PUT',
                body: JSON.stringify({
                    type : "paticipation",
                    action : "Est devenir un participant dans votre évenement",
                    solved : true,
                    user : { id : not.user.id},
                    event : {id : parseInt(not.event.id)},
                    org : {id : not.org.id},
                    accepted : true,
                    refused : false
                })
                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }
                ,}).then((res)=> res.json())
                .then(async (resJson)=> {


                    setNewUser(newUser.events.push({id : parseInt(item.event.id)}));
                    await fetch('http://192.168.43.198:5555/api/v1/user/update/'+item.user.id, {
                        method: 'PUT',


                        body: JSON.stringify({
                            ...newUser
                        })


                        , headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        }

                        ,
                    }).then( res => { res.json() })
                        .then(async (res) => {});







                    }

                )
        }



    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/notification/"+parseInt(item.id));
        setNot( await response.json());
    },[not])


    setTimeout(()=> {

        setLoading(false);
    },2000)

    if (loading || !newUser){
        return <View style={{height:75, width:300, display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}><ActivityIndicator size="small" color="black" /></View>
    }else{
        if(not.type === "acceptedInvite"){
            return <View></View>
        }else{
    return(
        <View style={not.type== "reminder" ? [styles.Container, {height:75}] : styles.Container }>
            {not.type == "paticipation"|| not.type== "Invitation" || not.type== "acceptationstaff" || not.type == "acceptationEvent" || not.type=="acceptationParticipation" || not.type == "acceptRecruitment"?<View style={styles.info}>
                <TouchableOpacity onPress={()=>{setSelectedUser(not.user) ; setProfileDetailOpened(true); setNotificationOpened(false)}}><View >
                    <Image style={styles.image} source={{uri :not.user.picture}} />
                </View></TouchableOpacity>
                <View >
                    <Text style={[styles.description]}>
                        {not.type!= "acceptationstaff" &&<Text style={styles.name}>{not.user.firstname} </Text>}
                        {not.action}
                        {not.type!= "acceptationstaff" && <Text style={styles.event}> {not.event.eventName}</Text>}
                    </Text></View>
            </View>:null}
            {not.type == "reminder"&&<View style={styles.info}>
                <TouchableOpacity><View >
                    <Image style={styles.image} source={{uri :not.event.picture}} />
                </View></TouchableOpacity>
                <View >
                    <Text style={styles.description}>
                        <Text style={styles.name}>{not.event.eventName} </Text>
                        {not.action}
                    </Text></View>
            </View>}
            {not.type == "paticipation"|| not.type=="Invitation"? <View style={styles.btns}>
                { !not.accepted ? <TouchableOpacity onPress={()=>{not.type == "paticipation"?Accepted(): AcceptInvite();}} style={styles.accept}><Text style={{ color :"#fff"}}>Accepter</Text></TouchableOpacity>: <TouchableOpacity disabled={true} style={[styles.accept, {flexDirection: "row", width: 100}]}><Text style={{ color :"#fff"}}>Accepté</Text><AntDesign name="check" size={24} color="white" /></TouchableOpacity> }
                { !not.refused ? <TouchableOpacity onPress={()=>{not.type == "paticipation"? Refused() : RefuseInvite();}} style={styles.refuse}><Text style={{ color :"#fff"}}>Réfuser</Text></TouchableOpacity>: <TouchableOpacity style={[styles.refuse, {flexDirection: "row", width: 100}]}><Text style={{ color :"#fff"}}>Réfusé</Text><AntDesign name="close" size={24} color="white" /></TouchableOpacity>}
            </View>: null}
        </View>
    )}};


}




export default Notifications;
const styles = StyleSheet.create({
    Container : {
        height : 103,
        width : "90%",
        display: "flex",
        justifyContent : "center",
        flexDirection:"column",
        alignItems: "flex-start",
        alignSelf:"center",
        backgroundColor: "#F2F2F2",
        borderRadius : 17,
        borderColor: "#fff",
        borderWidth : 2,
        marginTop : "2%",
        zIndex: -1
    },
    image: {
        height:48,
        width: 48,
        borderRadius: 100
    },
    info : {
        display:"flex",
        flexDirection :"row",
        alignItems:"center",
        justifyContent:"flex-start",
        width : "80%",
        marginLeft:"4%"
    },
    description : {
        fontSize : 12,
        fontWeight : "300",
        marginLeft: "3%",
    },
    name : {
        fontSize : 12,
        fontWeight : "bold"
    },
    event : {
        color : "#004869",
        fontWeight : "500"
    },
    btns : {
        display : "flex",
        flexDirection: "row",
        alignItems : "center",
        justifyContent : "space-between",
        width: "60%",
        marginLeft: "30%"
    },
    accept : {
        backgroundColor : "#00AD61",
        width : 91,
        height: 25,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    },
    refuse : {
        backgroundColor : "#111111",
        width : 91,
        height: 25,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    }



})
