import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const NotificationRecruitment = ({item, setSelectedUser,setProfileDetailOpened,setNotificationOpened, req}) => {
    const [newUser , setNewUser]= useState(null)
    const [not, setNot]= useState([]);
    useEffect(async ()=>{
        const response =await fetch("http://192.168.43.198:5555/api/v1/user/id/"+item.user.id);
        setNewUser(await response.json());
    },[]);
    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/recruitment/"+parseInt(item.id));
        setNot( await response.json());

    },[not])

    const Accepted = async () => {
        await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
            method: 'POST',
            body: JSON.stringify({
                type : "acceptRecruitment",
                action : "a accepté votre demande de recrutement tant que un "+item.staffJob.nameService+ " dans votre évenement",
                solved : false,
                accepted: false,
                refused : false,
                user : {id: item.user.id},
                org : {id : item.org.id},
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



        await fetch('http://192.168.43.198:5555/api/v1/recruitment/update/'+parseInt(item.id), {
            method: 'PUT',
            body: JSON.stringify({
                ...item,
                accepted: true,
                refused: false,
                solved : true
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
            ,}).then((res)=> res.json())
            .then(async (resJson)=> {
            })

    }



    return(
        <View style={styles.Container}>
            <View style={styles.info}
            ><TouchableOpacity  onPress={()=>{setSelectedUser(item.org) ; setProfileDetailOpened(true); setNotificationOpened(false)}}><View><Image style={styles.image}
                                                                                                                                                                              source={{uri: item.org.picture}}/></View></TouchableOpacity>
                <View>
                    <Text style={styles.description}>
                        <Text style={styles.name}>{item.org.firstname}</Text>
                        <Text style={styles.event}> Vous invite a rejoinde son équipe staff dans l'évenement</Text>
                        <Text style={styles.event2}> {item.event.eventName} </Text>
                        <Text style={styles.event}> tant que un </Text>
                        <Text style={styles.name}>{item.staffJob.nameService}</Text>
                        <Text style={styles.event}> avec un prix proposé de </Text>
                        <Text style={styles.name}> {item.price} DT </Text>
                        <Text style={{fontSize:10}}> clique sur voir la demande pour s'avoir plus</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.btns}>
                { !item.accepted ? <TouchableOpacity onPress={()=> Accepted()}  style={styles.accept}><Text style={{ color :"#fff"}}>Accepter</Text></TouchableOpacity>: <TouchableOpacity disabled={true} style={[styles.accept, {flexDirection: "row", width: 90}]}><Text style={{ color :"#fff"}}>Accepté</Text><AntDesign name="check" size={24} color="white" /></TouchableOpacity> }
                { !item.refused ? <TouchableOpacity  style={styles.refuse}><Text style={{ color :"#fff"}}>Réfuser</Text></TouchableOpacity>: <TouchableOpacity style={[styles.refuse, {flexDirection: "row", width: 100}]}><Text style={{ color :"#fff"}}>Réfusé</Text><AntDesign name="close" size={24} color="white" /></TouchableOpacity>}
                <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.accept, {width:"auto", paddingLeft: 5, paddingRight:5}]}><Text
                    style={{color: "#fff"}}>Voir La demande</Text></TouchableOpacity>
            </View>
        </View>
    );


}




export default NotificationRecruitment;
const styles = StyleSheet.create({
    Container : {
        height : 140,
        width : "88%",
        display: "flex",
        justifyContent : "center",
        flexDirection:"column",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor: "#F2F2F2",
        borderRadius : 17,
        borderColor: "#fff",
        borderWidth : 2,
        marginTop : "2%",
        paddingRight: "2%",
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
        alignSelf:"flex-start",
        marginLeft:"2%",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width : "80%",
    },
    description : {
        fontSize : 12,
        fontWeight : "300",
        marginLeft: "3%",
        width: "auto",
        paddingLeft:"2%"
    },
    name : {
        fontSize : 12,
        fontWeight : "bold"
    },
    event : {
        color : "#004869",
        fontWeight : "500",
    },
    event2 : {
        color : "#00AD61",
        fontWeight : "700",
    },
    btns : {
        display : "flex",
        flexDirection: "row",
        alignItems : "flex-start",
        justifyContent : "space-evenly",
        width: "95%",
        marginLeft: "3%",
        marginTop:10
    },
    accept : {
        backgroundColor : "#00AD61",
        width : 80,
        height: 25,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    },
    refuse : {
        backgroundColor : "#111111",
        width : 80,
        height: 25,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    },centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width:"90%",
        alignItems: "center",
        shadowColor: "#000",
        maxHeight: "80%",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        position:"absolute",
        top: 0,
        right : 3,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }



})
