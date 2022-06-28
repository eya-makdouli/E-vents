import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    TouchableHighlight,
    Dimensions,
    useWindowDimensions,
    ActivityIndicator
} from 'react-native';
import {TouchableOpacity} from "react-native";
import moment from 'moment';
import {AntDesign, Entypo} from '@expo/vector-icons';
import {Touchable} from "react-native-web";
const UserSearchCard = ({user,event,userConnected,participated, id,setDeleted ,deleted, forDelete})=> {
    const [padding, setPadding] =useState(false);
    const [flag , setFlag]=useState(false);
    const [confirmer , setConfirmer]=useState(false);
    const Invite = async ()=>{
        setPadding(true);
        setFlag(true);
        await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
            method: 'POST',
            body: JSON.stringify({
                type : "Invitation",
                action : "Vous invite de rejoindre son évenement",
                solved : false,
                accepted: false,
                refused : false,
                user : { id : userConnected.id},
                event : {id : parseInt(event.id)},
                org : {id : user.id}
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

    useEffect(async ()=>{
        const res =await fetch("http://192.168.43.198:5555/api/v1/notification/organisateur/"+user.id+"/"+event.id+"/"+false+"/Invitation");
        const r = await res.json();
        if (r.length>0){
            setPadding(true)
        }else{
            setPadding(false)
        }
    },[padding]);

    const onDelete =async ()=>{
        setDeleted(true);
        await fetch('http://192.168.43.198:5555/api/v1/notification/delete/'+id, {
            method: 'DELETE'
            ,
        }).then(async res => await res.json())
            .then(async (res)=> {
            });


    }


    return (
        <View style={userConnected.id != user.id&&{width:"100%",minHeight:100,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'space-evenly', marginBottom:10 , marginLeft:10, backgroundColor:"#f1f1f1"}}>
            {userConnected.id != user.id&&<View style={{ display:"flex" , alignItems:"center" , flexDirection:"row", justifyContent:"space-between"}}>
                <View style={{ display:"flex" , flexDirection:"row", justifyContent:"space-between"}}>
                    <Image source={{uri: user.picture}} style={{height :47 , width: 47, borderRadius: 100}}/>
                    <View style={{alignSelf:"flex-start", marginLeft:5, display:"flex", justifyContent:"center"}}>
                        <Text style={{fontWeight:"700"}}>{user.firstname + " " + user.lastname}</Text>
                        {user.location &&<Text style={{fontWeight:"400"}}>{user.location.city} , {user.location.region}</Text>}
                        {user.isStaff&&<Text style={{color:"#00AD61", fontWeight:"400"}}>Staff</Text>}
                    </View>
                </View>

                {!padding && !participated&&<TouchableOpacity onPress={()=>Invite()} style={{height:"auto", width:"auto" ,padding: 15,borderRadius:10, backgroundColor:"#00AD61",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}><Text style={{fontWeight:"700", color:"#fff"}}>Inviter</Text></TouchableOpacity>}
                {padding && !participated&& <TouchableOpacity disabled={true} onPress={()=>Invite()} style={{height:"auto", width:"auto" ,padding: 10,borderRadius:10, backgroundColor:"rgba(0,173,97,0.62)", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}><Text style={{fontWeight:"700", color:"#fff"}}>Invité </Text><AntDesign name="check" size={24} color="white" /></TouchableOpacity> }
                {participated &&!confirmer &&<TouchableOpacity style={{height:"auto", width:"auto" ,padding: 15,borderRadius:10, backgroundColor:"#760000",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} onPress={()=> {setConfirmer(true) ; setTimeout(()=>{setConfirmer(false)},3000)}}><Text style={{fontWeight:"700", color:"#fff"}}>Retiré</Text></TouchableOpacity>}
                {forDelete && confirmer ? <TouchableOpacity style={{height:"auto", width:"auto" ,padding: 5, paddingTop:8, paddingBottom:8,borderRadius:5, marginLeft:3, backgroundColor:"#760000",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} onPress={()=> onDelete()}><Text style={{fontWeight:"700", color:"#fff"}}>Confirmer?</Text></TouchableOpacity>: null}
            </View>}
        </View>

    )
}

export default UserSearchCard;

const styles = StyleSheet.create({

    container: {

    },
});