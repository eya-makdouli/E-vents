import React, {useState} from "react";
import {Image, StyleSheet, Text, View, TouchableHighlight, Modal, Pressable} from 'react-native';
import moment from "moment";
import {TouchableOpacity} from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


const Modals = ({setModalVisible,modalVisible}) => {
   return(
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
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
   )
}
export default Modals
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