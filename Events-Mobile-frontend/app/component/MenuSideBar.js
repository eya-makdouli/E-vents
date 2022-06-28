import React, {useEffect, useRef, useState} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    TouchableHighlight,
    Dimensions,
    Animated,
    useWindowDimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity} from "react-native";
import {ScrollView, Touchable} from "react-native";
import MenuHeader from "./MenuHeader";
import MenuBody from "./MenuBody";




const MenuSideBar = ({setCreateEventOpened,staffRequestOpened, setStaffRequestOpened,setUser,Menu , state, Activity , activityState , notif, navigation, user, setProfileOpened, ProfileOpened, setCategoriesOpened , setLocationOpened, setStaffServiceOpened,setProfileEdit})=> {
    const [Opened , setOpened] = useState(false);
    const [dark , setDark] = useState(true);
    const width = useWindowDimensions();
    const transformAnim = useRef(new Animated.Value(width.width)).current;
    const transformAnimX = useRef(new Animated.Value(0)).current;
    const Opacity = useRef(new Animated.Value(.2)).current;
    const transformOut = () => {

        Animated.timing(transformAnimX, {
            toValue: width.width,
            duration: 500,
            useNativeDriver: true
        }).start();

    };
    const transformIn = () => {

        Animated.timing(transformAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
        Animated.timing(Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();

    }
    useEffect(()=> {
        transformIn();

    },[])
    return(
        <Animated.View
        style={Opened ? {transform:[transformAnimX?{translateX : transformAnimX}:{translateX : width.width}], position:"absolute", bottom:0, top:0, left: 0, right: 0, zIndex: 9999, backgroundColor: "#fff"} : {transform:[{translateX : transformAnim}], opacity : Opacity , position:"absolute", bottom:0, top:0, left: 0, right: 0, zIndex: 9999, backgroundColor: "#fff"} }>

            <MenuHeader setProfileOpened={setProfileOpened} ProfileOpened={ProfileOpened} opened={setOpened} op={Opened}  annimation={transformOut} dark={dark} setDark ={setDark} user={user} />
            <MenuBody setProfileEdit={setProfileEdit} setStaffServiceOpened={setStaffServiceOpened} setLocationOpened={setLocationOpened} setCategoriesOpened={setCategoriesOpened} setCreateEventOpened={setCreateEventOpened} setProfileOpened={setProfileOpened} ProfileOpened={ProfileOpened} staffRequestOpened={staffRequestOpened} setStaffRequestOpened={setStaffRequestOpened} connectedUser={user} user={setUser} dark={dark} setDark={setDark} Activity={Activity} activityState={activityState} annimation={transformOut} opened={setOpened} op={Opened} notif={notif} navigation={navigation}/>

            </Animated.View>


        )
}
export default MenuSideBar

const styles = StyleSheet.create({
    container : {
        height:177,
        width: Dimensions.get('window').width,
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent: "center",
        zIndex: 999
    },

    profile: {
        width: 49,
        height:48,
        borderRadius:500

    },
    parameters: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf: "center",
        padding: 8,
        backgroundColor: "#F2F2F2",
        borderRadius: 3,
        paddingLeft: "8%",
        paddingRight: "8%"
    },
    paramContainer : {
        marginTop: "5%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        alignSelf: "center"
    },
    icon : {
        width: 29,
        height: 29
    },
    description : {
        marginTop : "2%",
        fontSize : 14,
        width: "80%",
        fontWeight: "100",
        alignSelf: "flex-start"
    },
    param : {
        fontSize: 18,
        fontWeight: "700"
    },
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
    btnText : {
        fontSize:18,
        fontWeight: "700",
        color: "#fff"
    }


})