import React from 'react'
import Homeheader from '../component/Shared/Homeheader'
import { StyleSheet, View,Image,Text,Button, TouchableHighlight } from 'react-native';
import HomeBody from '../component/HomeBody';
const HomeScreen = ({navigation})=> {
  return (
      <View style={styles.container} >
   <Homeheader navigation={navigation}/>
   <HomeBody navigation={navigation}/>
   </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        
      }
    })