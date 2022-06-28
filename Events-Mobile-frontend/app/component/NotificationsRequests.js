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
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {ScrollView} from "react-native";


const NotificationsRequests = ({item, setSelectedUser,setProfileDetailOpened,setNotificationOpened, req}) => {
        const [newUser , setNewUser]= useState(null)
    const [not, setNot]= useState([]);
    useEffect(async ()=>{
        const response =await fetch("http://192.168.43.198:5555/api/v1/user/id/"+item.user.id);
        setNewUser(await response.json());
    },[]);
    const Accepted = async () => {
        await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
            method: 'POST',
            body: JSON.stringify({
                type : "acceptationstaff",
                action : "Votre demande de rejoindre l'équipe staff tant que un "+item.staffJob.nameService+" est accepté.",
                solved : false,
                accepted: false,
                refused : false,
                user : {id: item.user.id},
                org : {id : item.user.id},
                event : null
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        }).then(async res => await res.json())
            .then(async (res)=> {
            });



        await fetch('http://192.168.43.198:5555/api/v1/staffRequest/update/'+parseInt(item.id), {
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
        await fetch('http://192.168.43.198:5555/api/v1/staff/create/', {
            method: 'POST',
            body: JSON.stringify({
                user : {id: item.user.id},
                available : true,
                staffJob: {id : item.staffJob.id}
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
            ,}).then((res)=> res.json())
            .then(async (resJson)=> {
                await fetch('http://192.168.43.198:5555/api/v1/user/update/'+item.user.id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...newUser,
                        staff: {id: resJson.id},
                        isStaff : true
                    })
                    , headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json'
                    }
                    ,}).then((res)=> res.json())
                    .then(async (resJson)=> {

                    })
            })






    }

    const Refused=async ()=>{
        await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
            method: 'POST',
            body: JSON.stringify({
                type : "acceptationstaff",
                action : "Votre demande de rejoindre l'équipe staff tant que un "+item.staffJob.nameService+" est Réfusé.",
                solved : false,
                accepted: false,
                refused : false,
                user : {id: item.user.id},
                org : {id : item.user.id},
                event : null
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        }).then(async res => await res.json())
            .then(async (res)=> {
            });
        await fetch('http://192.168.43.198:5555/api/v1/staffRequest/update/'+parseInt(item.id), {
            method: 'PUT',
            body: JSON.stringify({
                ...item,
                accepted: false,
                refused: true,
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

    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staffRequest/"+parseInt(item.id));
        setNot( await response.json());

    },[not])

    const [modalVisible, setModalVisible] = useState(false);
    return(
            <View style={styles.Container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <Image source={{uri : item.user.picture}} style={{height: 100 , width:100,borderRadius:100 }}/>
                                <Text style={{fontWeight:"700"}}>{item.user.firstname +" "+ item.user.lastname}</Text>
                            </View>
                            <View style={{alignSelf: "flex-start", marginTop:"7%", width:"100%" , display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"flex-start"}}>
                                <Text style={{fontWeight:"500"}}>A propos : <Text>{item.apropos}</Text></Text>
                            </View>
                            <View style={{alignSelf: "flex-start", marginTop:"7%", width:"100%" , display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"flex-start"}}>
                                <Text style={{fontWeight:"500"}}>Le service demandé : <Text style={{fontWeight:"700", color:"#00AD61"}}>{item.staffJob.nameService}</Text></Text>
                            </View>


                            <View style={{alignSelf: "flex-start", marginTop:"7%", width:"100%" , display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"flex-start"}}>
                                <Text style={{fontWeight:"500"}}>Derniers organisations ou qualifications professionnels : </Text>
                            </View>
                            <View style={{alignSelf: "flex-start", marginTop:"7%", width:"100%" , display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"flex-start"}}>
                                <Image source={{uri:item.image1}} style={{height : 80 ,width:80}}/>
                                <Image source={{uri:item.image2}} style={{height : 80 ,width:80}}/>
                                <Image source={{uri:item.image3}} style={{height : 80 ,width:80}}/>
                            </View>






                            <Pressable
                                style={[styles.button]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Ionicons name="close" size={32} color="green"  />
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.info}><TouchableOpacity  onPress={()=>{setSelectedUser(item.user) ; setProfileDetailOpened(true); setNotificationOpened(false)}}><View><Image style={styles.image}
                                                                         source={{uri: item.user.picture}}/></View></TouchableOpacity>
                    <View>
                        <Text style={styles.description}>
                            <Text style={styles.name}>{item.user.firstname}</Text>
                            <Text style={styles.event}> Veux Rejoindre l'équipe staff tant que un</Text>
                            <Text style={styles.name}>{" "+item.staffJob.nameService}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.btns}>
                    { !not.accepted ? <TouchableOpacity onPress={()=>Accepted()} style={styles.accept}><Text style={{ color :"#fff"}}>Accepter</Text></TouchableOpacity>: <TouchableOpacity disabled={true} style={[styles.accept, {flexDirection: "row", width: 100}]}><Text style={{ color :"#fff"}}>Accepté</Text><AntDesign name="check" size={24} color="white" /></TouchableOpacity> }
                    { !not.refused ? <TouchableOpacity onPress={()=> Refused()} style={styles.refuse}><Text style={{ color :"#fff"}}>Réfuser</Text></TouchableOpacity>: <TouchableOpacity style={[styles.refuse, {flexDirection: "row", width: 100}]}><Text style={{ color :"#fff"}}>Réfusé</Text><AntDesign name="close" size={24} color="white" /></TouchableOpacity>}
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.accept, {width:"auto", paddingLeft: 5, paddingRight:5}]}><Text
                        style={{color: "#fff"}}>Voir La demande</Text></TouchableOpacity></View>
            </View>
        );


}




export default NotificationsRequests;
const styles = StyleSheet.create({
    Container : {
        height : 120,
        width : "90%",
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
        width : "88%",
    },
    description : {
        fontSize : 12,
        fontWeight : "300",
        marginLeft: "3%",
        width: "50%"
    },
    name : {
        fontSize : 12,
        fontWeight : "bold"
    },
    event : {
        color : "#004869",
        fontWeight : "500",
        width: 300
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
