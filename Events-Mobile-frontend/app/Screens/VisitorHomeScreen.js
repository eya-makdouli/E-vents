import React, {useState , useEffect} from 'react'
import VisitorHomeheader from '../component/VisitorHomeheader'
import { StyleSheet, View} from 'react-native';
import HomeBody from '../component/HomeBody';
import AsyncStorage from "@react-native-async-storage/async-storage";
import userEvents from "../component/UserEvents";


const VisitorHomeScreen = ({navigation})=> {
    const clearSlider = async () =>{
        try {
            await AsyncStorage.removeItem("@viewedSlider");
        }catch (e) {
            console.log(err)
        }

    };
    clearSlider();
    // useEffect(async ()=>{
    //     await AsyncStorage.setItem('@viewedSlider' , 'true');
    // },[])

    return (

        <View style={styles.container} >

            <VisitorHomeheader navigator={navigation}/>
            <HomeBody navigation={navigation}/>

        </View>
    )
}

export default VisitorHomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,


    }
})