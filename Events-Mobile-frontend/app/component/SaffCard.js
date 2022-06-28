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
import { Entypo } from '@expo/vector-icons';
const StaffCard = ({user, currentUser} ,)=> {
    if(user.user.id === currentUser){
        return <View></View>
    }else{
    return (

        <View style={{width:"100%",minHeight:100,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'space-evenly', marginBottom:10 , marginLeft:10, backgroundColor:"#f1f1f1"}}>
            {user.available?<Text style={{position:"absolute", top:5, right:20, color:"#00AD61" ,fontWeight:"500"}}>Disponible</Text>: <Text style={{position:"absolute", top:5, right:20,color:"#8b0101"}}>Non Disponible</Text>}
        <View style={{ display:"flex" , alignItems:"center" , flexDirection:"row"}}>
            <View >
                <Image source={{uri : user.user.picture}} style={{height :47 , width: 47, borderRadius: 100}}/>
        </View>
            <View style={{alignSelf:"flex-start", marginLeft:20}}>
                <Text style={{fontWeight:"700"}}>{user.user.firstname + " " + user.user.lastname}</Text>
                <Text style={{fontWeight:"700"}}>{user.staffJob.nameService}</Text>
                <Text >{user.user.location.city + " " + user.user.location.region}</Text>
            </View>

        </View>
            <View style={{justifySelf:"flex-end", alignSelf:"flex-end", display:"flex", flexDirection:"row"}}><Entypo name="star" size={24} color="#00AD61" /><Entypo name="star" size={24} color="#00AD61" /><Entypo name="star" size={24} color="#00AD61" /><Entypo name="star" size={24} color="#00AD61" /></View>
        </View>

    )}
}

export default StaffCard;

const styles = StyleSheet.create({

    container: {

    },
});