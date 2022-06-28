import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View, TouchableHighlight, Pressable, Button} from 'react-native';
import moment from "moment";
import {TouchableOpacity} from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Modal from "react-native-modal";



const UserEvents = ({e, action,setEventDetailOpened,setEditTemplate,consults,eventDetail,eventDetailState,setEventD,org,setType}) => {


    const [visible, setVisible] = useState(false);
    const hideMenu = () =>setVisible(false);

    const showMenu = () => setVisible(true);

    return(


        <View style={styles.container}>
            {!consults&&<Menu
                visible={visible}
                anchor={<TouchableOpacity onPress={showMenu}><View style={{display:"flex", justifyContent:"space-between" , width:35, marginLeft:"90%", flexDirection:"row", padding:5, position:"relative", zIndex:99999}}>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                </View></TouchableOpacity>}
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={()=>{setEventDetailOpened(true);setEditTemplate(true); eventDetail(!eventDetailState); setEventD(org); setType("organisateur"); hideMenu();}}>Modifier</MenuItem>

                <MenuDivider />
                <MenuItem onPress={hideMenu}>Supprimer</MenuItem>
            </Menu>}



            <View style={styles.info}>
                <View>
                    <Image source={{uri : e.picture}} style={styles.event} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={{color: "#3F3E3E"}}>{action}<Text style={styles.textEvent}>{e.eventName}</Text></Text>
                    <Text style={{color: "#3F3E3E"}}>{e.location ? "à " +e.location.city : "Google Meet"}</Text>
                </View>

            </View>
            <View style={{alignSelf:"center"}}><Text>{moment(e.startDate).format("YYYY/MM/DD")} a {moment(e.startDate).hours()+":"+moment(e.startDate).minutes()}</Text></View>

        </View>
    );
}
export default UserEvents;
const styles = StyleSheet.create({
    container : {
        marginTop: "2%",
        height : "auto",
        display: "flex",
        justifyContent: "center",
        alignItems : "center",
        backgroundColor:"#F2F2F2",
        padding: "3%",
        width: "92%",
        alignSelf: "center",
        borderRadius: 4,
        shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1
    },
    dots : {
        width: 30,
        display:"flex",
        flexDirection: "row",
        position: "absolute",
        right: 10,
        top: 10,
        justifyContent: "space-evenly"
    },
    dot : {
        height: 6,
        width : 6,
        backgroundColor: "#595252",
        borderRadius: 100,

    },
    event : {
        height: 72,
        width : 72,
        borderRadius: 100
    },
    info : {
        display:"flex",
        flexDirection :"row",
        width: "95%",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center"
    },
    textContainer: {
        width: "70%",

    },
    textEvent : {
        color : "#004869"
    },
    centeredView: {
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
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
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


});