import React, {useEffect, useState} from 'react'
import { StyleSheet, View,Image,Text,Button, TouchableHighlight ,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity} from "react-native";
import MainScreen from "../MainScreen";
import { Ionicons } from '@expo/vector-icons';

const Homeheader = (props)=> {
    const [tokens ,setTokens] = useState()
    const [token ,setToken] = useState()
    const [result ,setResult] = useState()
    const [user , setUser] = useState({})
    const [oppned , SetOpened] = useState(false)

    useEffect(  () => {
        props.testfn(false);
        try {
            AsyncStorage.getItem('@user').then(user => {setUser(JSON.parse(user)) });

            AsyncStorage.getItem('@token').then(token => token != null ? setTokens(token.replaceAll('\"', "")) : null);
            if (tokens != null) {

                setToken(tokens);
                fetch('http://192.168.43.198:5555/api/v1/user/all', {
                    method: "GET",
                    headers: {"Authorization": "Bearer " + token}
                }).then(res => res.json()).then((resul) => setResult(resul)).catch((e) => {});
            }
        }catch (e){

        }
    },[]);

  return (
     
    <View >
     <LinearGradient
        colors={props.profileDetailOpened? ['#c6cbff', "#fff"] :['#4ce7ae', 'rgb(255,255,255)']}
        style={[styles.container, props.profileDetailOpened && !props.consults && {height: 250}]} blurRadius={50}>
            <View style={{display: 'flex', flexDirection: 'row' ,alignItems:"center", justifyContent: 'space-evenly',width:375}}>
                {!props.profileDetailOpened?<TouchableOpacity onPress={() =>{props.profile(true) ; props.not(false); props.Activity(false); props.setViewAll(false); props.setProfileDetailOpened(false); props.setConsults(false);props.setStaffRequestOpened(false);props.setLocationOpened(false); props.setStaffServiceOpened(false); props.setCategoriesOpened(false); props.setProfileEdit(false)}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems:"center"}}>
            <Image style={styles.profile} source={{uri : user&&user.picture}}/>
                    <View style={{display: 'flex', flexDirection: 'column', alignItems:"center"}}>
            <Text style={{color:'#004869', fontWeight:"900", marginLeft:5, fontSize:12}}>
                {user&&user.firstname +" " + user&&user.lastname}
            </Text>
                        {user&&user.isAdmin &&<Text style={{color:"#00AD61" ,fontWeight:"900", marginLeft:5, fontSize:12,alignSelf:"flex-start"}}>Admin</Text>}
                        {user&&user.isStaff &&<Text style={{color:"#00AD61" ,fontWeight:"900", marginLeft:5, fontSize:12,alignSelf:"flex-start"}}>Staff</Text>}

                    </View>
            </View>
                </TouchableOpacity> : props.consults? <TouchableOpacity onPress={()=>props.setConsults(!props.consults)}><View style={{right : 30}}><Ionicons name="arrow-back" size={26} color="#004869" /></View></TouchableOpacity>: <View style={{width:80}}></View>}
            <View style={props.profileDetailOpened && !props.consults? {display: 'flex', flexDirection: 'row', alignItems:"center", width:150,justifyContent: 'space-evenly' , bottom:40}: {display: 'flex', flexDirection: 'row', alignItems:"center", width:150,justifyContent: 'space-evenly'}}>
              <View style={{width:"auto", height:"auto", position: 'relative'}}>
            <Image style={{width:28 , height:28}} source={require('../../assets/messages.png')}/>
            <View style={{width:14, height:14 , borderRadius:5 , backgroundColor:"#004869" , position: 'absolute', bottom:0, left:0, display: 'flex',justifyContent: 'center', alignItems: 'center'}} ><Text style={{fontSize:9, fontWeight:"700", color:"#fff"}}>0</Text></View>
            </View>
                <TouchableOpacity onPress={()=>{props.not(!props.state); props.profile(false); props.Activity(false); props.setCreateEvent(false), props.setViewAll(false); props.setProfileDetailOpened(false); props.setStaffRequestOpened(false); props.setCategoriesOpened(false); props.setLocationOpened(false); props.setStaffServiceOpened(false) ; props.setProfileEdit(false)}}>
            <View style={{width:"auto", height:"auto", position: 'relative'}} >
                {!props.state ? <Image style={{width:28 , height:28}} source={require('../../assets/notification.png')} /> : <Image style={{width:28 , height:28 , resizeMode: "contain"}} source={require('../../assets/openedNot.png')} /> }
            <View style={{width:14, height:14 , borderRadius:5 , backgroundColor:"#004869" , position: 'absolute', bottom:0, left:0, display: 'flex',justifyContent: 'center', alignItems: 'center'}} ><Text style={{fontSize:9, fontWeight:"700", color:"#fff"}}>{props.notSize}</Text></View>
            </View>
                </TouchableOpacity>
            <Image style={{width:28 , height:28}} source={require('../../assets/qrcode.png')}/>
                <TouchableOpacity onPress={ () =>{props.stateMenu(previousState => !previousState); props.testfn(true);}}>
            <View style={{height:20, width:20 , display: 'flex', justifyContent: 'space-between'}}>
                <View style={{width:30, height:4, backgroundColor:'#7BACE6', borderRadius:3}}></View>
                <View style={{width:30, height:4, backgroundColor:'#7BACE6', borderRadius:3}}></View>
                <View style={{width:30, height:4, backgroundColor:'#7BACE6', borderRadius:3}}></View>

            </View>
                </TouchableOpacity>

            </View>
            
            </View>


            <View>
                {!props.profileEdit&&!props.staffServiceOpened&&!props.categoriesOpened && !props.locationOpened &&!props.staffRequestOpened &&!props.profileDetailOpened &&!props.state&& !props.profileState && !props.activityState && !props.createEvent &&<Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Accueil</Text>}
                {!props.staffRequestOpened && props.state&& !props.profileState && !props.activityState&& !props.createEvent&& <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Notification</Text>}
                {props.staffRequestOpened && !props.state&& !props.profileState && !props.activityState&& !props.createEvent&& <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Demande de Staff</Text>}
                {props.profileState && !props.activityState&&<Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Profile</Text>}
                {props.activityState && !props.createEvent&&<Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Vos Activités</Text>}
                {props.createEvent && !props.profileState && <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Créer un évenement</Text>}
                {props.locationOpened&&!props.createEvent && !props.profileState && <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Gérer les locations</Text>}
                {props.staffServiceOpened&&!props.locationOpened&&!props.createEvent && !props.profileState && <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Gérer les services</Text>}
                {props.categoriesOpened&&!props.locationOpened&&!props.createEvent && !props.profileState && <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Gérer les categories</Text>}
                {props.profileEdit&&!props.categoriesOpened&&!props.locationOpened&&!props.createEvent && !props.profileState && <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Modification de profile</Text>}
            </View>
         {!props.staffRequestOpened&&!props.profileEdit&&!props.locationOpened&& !props.categoriesOpened&& !props.staffServiceOpened&& !props.state && !props.profileState && !props.activityState && !props.createEvent && !props.profileDetailOpened ?<View style={{width:375, display:"flex",justifyContent: 'center', alignItems: 'center' ,top:20}}>
             <View style={{
                 width: 347,
                 height: 30,
                 borderRadius: 75,
                 borderWidth: 3,
                 borderColor: "#fff",
                 backgroundColor: "#F9F9F9",
                 opacity: 1,
                 display: "flex",
                 flexDirection: "row",
                 justifyContent: "space-evenly",
                 alignItems: "center"
             }}><Text style={{color: "#004869", fontWeight: "600", fontSize: 15,left: 5}}>Tous</Text>
                 <Text style={{color: "#00AD61", fontWeight: "600", fontSize: 15,left: 30}}>en cours</Text>
                 <View style={{
                     top: -1,
                     left: 35,
                     width: 117,
                     height: 30,
                     backgroundColor: "#fff",
                     borderRadius: 75,
                     shadowOffset: {width: 0, height: 1,},
                     shadowOpacity: 0.18,
                     shadowRadius: 1.00,

                     elevation: 1,
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center"
                 }}><Text style={{color: "#ad9f00", fontWeight: "600", fontSize: 15}}>Planifié</Text></View></View>
            </View>: <View style={{height: 30}}></View>}
            
            
     
      </LinearGradient>
        
    </View>
   
  )
}
export default Homeheader;


const styles = StyleSheet.create({
    container: {
        height:177,
        width: Dimensions.get('window').width, 
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent: "center"
         

        
      },
      profile: {
      width: 49,
      height:48,
      borderRadius:500
         
      },
    });