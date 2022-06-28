import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VisitorHomeScreen from './app/Screens/VisitorHomeScreen';
import SignUpScreen from './app/Screens/SignUpScreen';
import LoginPageScreen from "./app/Screens/LoginPageScreen";
import SliderComponent from "./app/component/SliderComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventDetailsScreen from "./app/Screens/EventDetailsScreen";
import MainScreen from "./app/component/MainScreen";
import SignUpStepTwo from "./app/Screens/SignUpStepTwo";
import signUpStepTwo from "./app/Screens/SignUpStepTwo";

export default function App() {
    const [loading , setLoading] = useState(true);
    const [viewedSlider, setViewedSlider] = useState(false);
    const checkSlider = async () =>{
        try{
            const value = await AsyncStorage.getItem("@viewedSlider");
            if (value !== null){
                setViewedSlider(false)
            }else{
                setViewedSlider(true)
            }
        }catch (err){

        }finally {
            setLoading(false)
        }


    }
    const [user , setUser] = useState({});
    useEffect(async ()=> {
        await AsyncStorage.getItem('@user').then(user => {setUser(JSON.parse(user))}).done();
    }, [user?user.length<=0: null]);

    useEffect(async ()=> {
        checkSlider();

    },[])
    const Stack = createNativeStackNavigator();
    const [category , setCategory]= useState({});
    // useEffect(async ()=> {
    // await fetch('http://192.168.1.4:5555/api/v1/category/all', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //     }
    // }).then(response => response.json())
    //     .then((responseJson) => {
    //         setCategory(responseJson);
    //         console.log(category)
    //     }).catch((err) => {
    //     console.log(err)
    // })
    // },[category])

    return (
        // <MainScreen category={category}/>
        <NavigationContainer>
            <Stack.Navigator>
                {!viewedSlider &&  <Stack.Screen name="SliderScreen" style={{display:"none"}} component={SliderComponent} options={{headerShown: false}}/>}
                {!user&& <Stack.Screen name="VisitorScreen" style={{display:"none"}} component={VisitorHomeScreen} options={{headerShown: false}} />}
                {!user&&<Stack.Screen name="LoginScreen" style={{display:"none"}} component={LoginPageScreen} options={{headerShown: false}}/>}
                {!user&& <Stack.Screen name="SignupScreen" style={{display:"none"}} component={SignUpScreen} options={{headerShown: false}}/>}
                <Stack.Screen name="homeScreen" style={{display:"none"}} component={MainScreen} options={{headerShown: false}}/>
                <Stack.Screen name="EventDetail" style={{display:"none"}} component={EventDetailsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUpStepTwo" style={{display:"none"}} component={signUpStepTwo} options={{headerShown: false}}/>
            </Stack.Navigator>


        </NavigationContainer>

        // <View style={{flex: 1 , justifyContent:"center" , alignItems:"center"}}>
        // {loading ? null : viewedSlider ? <VisitorHomeScreen navigation={navigation}/> : <SliderComponent/>}
        // </View>
    );

}

const styles = StyleSheet.create({

});
