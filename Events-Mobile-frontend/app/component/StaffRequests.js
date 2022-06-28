import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {Feather} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import dimensions from "react-native-web/dist/exports/Dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {TouchableOpacity} from "react-native";
import * as WebBrowser from 'expo-web-browser';


const StaffRequests = ({user}) => {
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [jobs , setJob]= useState([]);
    const [loading , setLoading]= useState(false);
    const [selectedJob ,setSelectedJob]= useState("Serveur");
    const [Desc ,setDesc]= useState(null);
    const [staffRquests ,setStaffRequests]= useState({});
    const [sended , setSended]= useState(null)



    const sendRequest = async ()=> {
        await fetch('http://192.168.43.198:5555/api/v1/staffRequest/create', {
            method: 'POST',


            body: JSON.stringify({
                user : {id : user.id},
                staffJob : {id : selectedJob},
                image1 : image?image.toString(): null,
                image2 : image2?image2.toString():null,
                image3 : image3?image3.toString(): null,
                solved: false,
                accepted: false,
                refused : false,
                apropos : Desc?Desc:null
            })


            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        })
            .then( response => response.json())
            .then( async (responseJson) => {
                if (responseJson) {
                    setSended(true);
                   setTimeout(()=>{
                       setSended(null)
                   },3000)
                }}).catch(e => {
                setSended(false);
                setTimeout(()=>{
                    setSended(null)
                },3000)
            });

    }


    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staffjob/all");
        const job = await response.json()
        setJob(job);
    },[jobs.length <= 0])

    useEffect(async ()=>{
        const res = await fetch("http://192.168.43.198:5555/api/v1/staffRequest/user/"+user.id);
        const req = await res.json()
        setStaffRequests(req);
    },[])

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

    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage2(result.uri);
        }
    };

    const pickImage3 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage3(result.uri);
        }
    };
        if(Object.keys(staffRquests).length>0 && Object.keys(staffRquests).length!=6){
        if(staffRquests.accepted){

            return (<View style={{flex:1, display:"flex", alignItems:"center" , alignSelf:"center", width:"90%"}}>
                <Text style={{alignSelf:"flex-start", marginTop:20,fontWeight: "600", color:"#004869"}}>Vos Demandes de rejoindre l'equipe Staff</Text>
                <View style={{width:"100%", height:"auto", padding : "5%" ,marginTop:20, backgroundColor:"rgba(57,115,96,0.41)", display : "flex", justifyContent:"center", flexDirection:"row",borderRadius:10 }}>
                    <Text style={{position:"absolute", top:5, right : 5, fontWeight: "700", color:"rgba(0,173,97,1)"}}>Accepté</Text>
                    <View style={{display:"flex" , justifyContent:"center"}}>
                        <Image source={{uri : staffRquests.user.picture}} style={{height :80, width : 80 , borderRadius:100}}/>
                    </View>
                    <View style={{display:"flex" , justifyContent:"center", width:"70%"}}>
                        <Text style={{color:"#fff", marginLeft: 5}}>Vous éte déjà Accepter tant-que un <Text style={{fontWeight: "600", color:"#004869"}}>{staffRquests.staffJob.nameService}</Text></Text>
                    </View>

                </View>
            </View>)
        }else{
            return <View style={{flex:1, display:"flex", alignItems:"center" , alignSelf:"center", width:"90%"}}>
                <Text style={{alignSelf:"flex-start", marginTop:20,fontWeight: "600", color:"#004869"}}>Vos Demandes de rejoindre l'equipe Staff</Text>
                <View style={{width:"100%", height:"auto", padding : "5%" ,marginTop:20, backgroundColor:"rgba(0,0,0,0.56)", display : "flex", justifyContent:"center", flexDirection:"row",borderRadius:10 }}>
                    <Text style={{position:"absolute", top:5, right : 5, fontWeight: "700", color:"rgb(252,231,0)"}}>En cours de traitement...</Text>
                    <View style={{display:"flex" , justifyContent:"center"}}>
                        <Image source={{uri : staffRquests.user.picture}} style={{height :80, width : 80 , borderRadius:100}}/>
                    </View>
                    <View style={{display:"flex" , justifyContent:"center", width:"70%"}}>
                        <Text style={{color:"#fff", marginLeft: 5}}>Votre demande est en cours de traitement.</Text>
                    </View>

                </View>
            </View>
        }
    }else{
        return (
            <ScrollView style={{backgroundColor:"#fff", height:"100%"}}>
                <View>
                    <Picker selectedValue={selectedJob}
                            onValueChange={(itemValue, itemIndex) =>{
                                setSelectedJob(itemValue)}}

                    >
                        {jobs.map(j =>
                            <Picker.Item label={j.nameService} value={j.id} key={j.id}></Picker.Item>)}
                    </Picker>
                </View>
                <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                    <TextInput multiline={true} numberOfLines={4} style={{ width: 'auto', height:50 , fontSize:15}} placeholder="A propos de toi ..." placeholderTextColor="#a1a1a1" editable={true} selectTextOnFocus={false}  onChangeText={(Desc) => setDesc(Desc)}/>
                </View>

                <View style={{alignSelf:"center",borderRadius:7,padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                    <Text>Importer les image des évenements que tu à organisé </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {image?<Button title="Modifier l'image" onPress={pickImage} /> : <Button title="Importer une Image" onPress={pickImage} />}
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                {image&&<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {image2?<Button title="Modifier l'image" onPress={pickImage2} /> : <Button title="Importer une autre Image" onPress={pickImage2} />}
                    {image2 && <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />}
                </View>}
                {image&&image2&&<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {image3?<Button title="Modifier l'image" onPress={pickImage3} /> : <Button title="Importer une autre Image" onPress={pickImage3} />}
                    {image3 && <Image source={{ uri: image3 }} style={{ width: 200, height: 200 }} />}
                </View>}

                {sended===true &&<View style={styles.success}><Text style={{color:"#fff"}}>Demande envoyée avec succée</Text></View>}
                {sended===false &&<View style={styles.error}><Text style={{color:"#fff"}}>Demande non envoyée </Text></View>}

                <View style={{width: "90%", justifyContent:"center" , alignSelf:"center"}}>
                    <TouchableOpacity style={styles.deconnect} onPress={()=>sendRequest()}  >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Envoyer la demande</Text>}</TouchableOpacity>
                </View>



            </ScrollView>
        )}
    }

export default StaffRequests;
const styles= StyleSheet.create({
    deconnect : {
        marginTop: "12%",
        width : "100%",
        height: 36,
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#00AD61",
        borderRadius: 3
    },
    container : {
        alignItems:"flex-start",
        justifyContent:"flex-start"
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    indicator : {
        position:"absolute",
        zIndex:9999,
        top:0,
        left:0,
        bottom: 0,
        right: 0,
        width: dimensions.get("window").width,
        height: dimensions.get("window").height,
        backgroundColor:"rgba(94,94,94,0.25)"
    },
    success : {
        height : "auto",
        width : "90%",
        borderRadius: 5,
        backgroundColor: "#00AD61",
        display: "flex",
        justifyContent: "flex-start",
        padding: 10,
        alignSelf:"center",
    },
    error : {
        height : "auto",
        width : "90%",
        borderRadius: 5,
        backgroundColor: "#cb0000",
        display: "flex",
        justifyContent: "flex-start",
        padding: 10,
        alignSelf:"center",
    },
    btnText : {
        fontSize:18,
        fontWeight: "700",
        color: "#fff"
    }

});