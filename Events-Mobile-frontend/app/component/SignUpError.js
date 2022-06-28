import React, {useState,useRef, useEffect} from "react";
import {StyleSheet} from "react-native";
import {View,Text ,Animated} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons';



const LoginError = (props) => {
    const [closed , setClosed]= useState(true)
    const fadeAnim = useRef(new Animated.Value(-200)).current
    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }
        ).start();
    }, [])


    if (props.http==400) {
        return(

            props.show && closed &&
            <Animated.View style={[styles.container,{transform: [{translateY: fadeAnim}]}]}>
                <AntDesign name="close" size={24} color="#cb0000" style={styles.closeBtn} onPress={(closed) => setClosed(false)} />
                <Ionicons name='md-alert-circle' style={{marginRight : 0}} size={32} color='#cb0000' /><Text style={styles.ErrorText}>{props.error[0]}</Text>
            </Animated.View>

        );
    }else if(props.http == 401){
        return(
            props.show &&  <View style={styles.container}>
                <Text style={styles.ErrorText}>Unauthorized</Text><Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='white' />
            </View>
        )
    }else if (props.error != null && props.http !=null){
        return(
            props.show && closed &&  <Animated.View style={[styles.container,{transform: [{translateY: fadeAnim}]}]}>
                <AntDesign name="close" size={24} color="#cb0000" style={styles.closeBtn} />
                <Ionicons name='md-alert-circle' style={{marginRight : 0}} size={32} color='#cb0000' /><Text style={styles.ErrorText} >Network Connection Failed</Text>
            </Animated.View>
        )
    }else {
        return(
            props.show && closed && <Animated.View style={[styles.container,{transform: [{translateY: fadeAnim}]}]} >
                <AntDesign name="close" size={24} color="#00AD61" style={styles.closeBtn} onPress={(closed) => setClosed(false)} />
                <Ionicons name='md-checkmark-circle' style={{marginRight : 0}} size={32} color='#00AD61' /><Text style={[styles.ErrorText,{color: "#00AD61"}]}>Inscription avec succés</Text>
            </Animated.View>

        );
    }


}
export default LoginError
const styles = StyleSheet.create({
    container : {
        zIndex :99999,
        height: "auto",
        width: "90%",
        backgroundColor:"white",
        borderRadius : 15,
        display: "flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems : "center",
        padding:10,
        position: "absolute",
        top:25,
        shadowOffset: {width: 2,height: 3,},shadowOpacity: 0.05,shadowRadius: 2.00, elevation: 1


    },
    ErrorText : {
        color: "#cb0000",
        fontWeight:"bold",
        fontSize:15
    },
    Valid : {
        height: "auto",
        width: "90%",
        backgroundColor:"white",
        borderRadius : 10,
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems : "center",
        padding:10,
        position:"absolute",
        top:25

    },
    closeBtn: {
        position : "absolute",
        right:5,
        top: 2
    }

})