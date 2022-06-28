import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Image, Text, Button, TouchableHighlight, Dimensions, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from "react-native";
import ProfileComponent from "./ProfileComponent";
import * as ImagePicker from "expo-image-picker";
import {TextInput} from "react-native";
import KeyboardStickyView from 'rn-keyboard-sticky-view';
import {ScrollView} from "react-native";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileManagement= ({selectedUser,setProfileDetailOpened,setConsults,consults,edit})=> {
    const [image, setImage] = useState(null);
    const [modifyBio, setModifyBio] = useState(false);
    const [newUser, setNewUser] = useState([]);
    const [newBio, setNewBio] = useState("");
    const [edited, setEdited] = useState(false);
    const [loading, setLoading] = useState(false);

    const storeUserData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@user', jsonValue).done();
        } catch (e) {
        }
    }

    useEffect(async ()=>{
    const response = await fetch("http://192.168.43.198:5555/api/v1/user/id/"+selectedUser.id);
    const usr = await response.json();
    setNewUser(usr);
    await storeUserData(usr);
    },[])

    const modify=async () =>{
        setLoading(true);
        await fetch('http://192.168.43.198:5555/api/v1/user/update/'+selectedUser.id, {
            method: 'PUT',

            body: JSON.stringify({
                ...newUser,
                bio: newBio?newBio: selectedUser.bio,
                picture : image.toString()
            })


            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        }).then( res => { res.json() })
            .then(async (res) => {
                setTimeout(()=>{
                    setLoading(false)
                    setEdited(true);
                    setTimeout(()=>{
                        setEdited(false);
                    },2000);
                },3000);

            })
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (

            <View style={{flex:1}}>
                <ScrollView  style={{flex:1}}>
                <View style={[styles.img,{justifyContent:'center', alignItems:'center',alignSelf:"center",height:170, width:170, borderRadius: 100}]}>
                    <Image style={{height:"100%", width:"100%", borderRadius: 100}} source={!image?{uri:newUser.picture}:{uri:image}}></Image>
                    <TouchableOpacity onPress={()=> pickImage()} style={{position: "absolute"}}><Text style={{color:"#fff", fontWeight: "700"}}>Modifier l'image</Text></TouchableOpacity>
                </View>
                <View style={{ paddingBottom:50,justifyContent:'center', alignItems:'center', marginTop:"5%"}}>
                    <Text  style={{textAlign:'center',textAlignVertical:'center',fontWeight:'bold',color:'#004869'}}> {selectedUser.firstname + " " + selectedUser.lastname}</Text>
                    <Text style={{textAlign:'center',textAlignVertical:'center'}}>        @{newUser.firstname}/{newUser.isAdmin? "Admin" : "Utilisateur"}</Text>
                    <Text style={{textAlign:'center',textAlignVertical:'center'}}>    {selectedUser.location.region} , {selectedUser.location.city}</Text>
                </View>

                {!modifyBio?<View style={{display:"flex", alignItems:"center", justifyContent:"center",padding:"5%", borderRadius:10, backgroundColor: "rgba(28,25,25,0.09)", width:"90%" ,height: "auto", alignSelf:"center"}}><Entypo name="edit" size={28} color="#00AD61" style={{position:"absolute"}}/><TouchableHighlight onPress={()=> setModifyBio(true)}><Text style={{opacity: .2, marginHorizontal: 30}}>
                    {newUser.bio}
                </Text></TouchableHighlight></View>:<View style={{display:"flex", alignItems:"center", justifyContent:"center",padding:"5%", borderRadius:10, backgroundColor: "rgba(28,25,25,0.09)", width:"90%" ,height: "auto", alignSelf:"center"}}><TextInput multiline={true} numberOfLines={5} style={{height:"auto", width:"90%", alignSelf:"center", border:1}} onChangeText={(newBio)=>setNewBio(newBio)} ><Text>{selectedUser.bio}</Text></TextInput></View> }

                {modifyBio&&<View style={{height: 300}}></View>}


        </ScrollView>
            <View style={!edited?styles.btns: [styles.btns , {backgroundColor: "#00AD61"}]}>

                {!edited&&<View style={styles.btn}><TouchableOpacity style={styles.btn} onPress={()=>modify()}>{!loading?<Text style={styles.btnText}>Modifier</Text>: <ActivityIndicator size="small" color="white" />}</TouchableOpacity></View>}
                {edited&&<View style={styles.btn}><TouchableOpacity style={styles.btn} ><Text style={styles.btnText}>Modification effectuée avec succès</Text></TouchableOpacity></View>}
            </View>
</View>
        )
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
        borderRadius:100,
        opacity:.6
    },
    btns:{
        position:"absolute",
        bottom:0,
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

export default ProfileManagement;