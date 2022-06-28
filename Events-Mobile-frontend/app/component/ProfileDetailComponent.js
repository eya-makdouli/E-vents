import React, {useEffect, useState} from 'react'
import { StyleSheet, View,Image,Text,Button, TouchableHighlight ,Dimensions } from 'react-native';
import {TouchableOpacity} from "react-native";
import ProfileComponent from "./ProfileComponent";

const ProfileDetailComponent= ({selectedUser,setProfileDetailOpened,setConsults,consults})=> {


    if(consults){
        return <ProfileComponent user={selectedUser} consults={consults} setConsults={setConsults}/>
    }else{
    return (

        <View style={{flex:1}}>
            <View style={{justifyContent:'center', alignItems:'center' ,position:"relative" ,bottom:140}}>
                <Image style={styles.img} source={{uri:selectedUser.picture}}/>
            </View>
            <View style={{ paddingBottom:50,justifyContent:'center', alignItems:'center', bottom:110}}>
                <Text  style={{textAlign:'center',textAlignVertical:'center',fontWeight:'bold',color:'#004869'}}> {selectedUser.firstname + " " + selectedUser.lastname}</Text>
                <Text style={{textAlign:'center',textAlignVertical:'center'}}>        @{selectedUser.firstname}/{selectedUser.isAdmin? "Admin" : "Utilisateur"}</Text>
                <Text style={{textAlign:'center',textAlignVertical:'center'}}>    {selectedUser.location.region} , {selectedUser.location.city}</Text>
            </View>

            <Text style={{ paddingBottom:50, marginHorizontal: 30, bottom:75}}>
                {selectedUser.bio}
            </Text>
            <View style={styles.btns}>
                <View style={styles.btn}><TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Contacter</Text></TouchableOpacity></View>
                <View style={styles.btn}><TouchableOpacity style={styles.btn} onPress={()=> {setConsults(true)}}><Text style={styles.btnText}>Consulter</Text></TouchableOpacity></View>
            </View>
        </View>

    )}
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        display: 'flex',
        justifyContent: 'center', alignItems: 'center',
    },

    img:{
        height:150,
        width: 150,
        justifyContent: 'space-between',
        borderRadius:100
    },
    btns:{
        position:"absolute",
        bottom: 0,
        width:"100%",
        height: 46,
        display:"flex",
        justifyContent:"space-evenly",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"#4CD0D5"
    },
    btn : {
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    btnText : {
        fontWeight:"400",
        color:"#fff",
        fontSize:18
    }

});

export default ProfileDetailComponent;