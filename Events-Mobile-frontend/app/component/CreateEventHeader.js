import React from 'react'
import { StyleSheet, View,Image,Text,Button, TouchableHighlight ,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
const CreateEventHeader= ()=> {
  return (
    <LinearGradient
        colors={['#68D7A680', '#DCF6EA80', '#DCF6EB',"#FFFFFF"]}
        style={styles.container} blurRadius={50}>
            <View style={{display: 'flex', flexDirection: 'row' ,alignItems:"center", justifyContent: 'space-evenly',width:375}}>
           <View style={{display: 'flex', flexDirection: 'row', alignItems:"center"}}>
            <Image style={styles.profile} source={require('../assets/profile.png')}/>
            <Text style={{color:'#004869', fontWeight:"900", marginLeft:5, fontSize:12}}>Med Amine</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', alignItems:"center", width:150,justifyContent: 'space-evenly'}}>
              <View style={{width:"auto", height:"auto", position: 'relative'}}>
            <Image style={{width:28 , height:28}} source={require('../assets/messages.png')}/>
            <View style={{width:14, height:14 , borderRadius:5 , backgroundColor:"#004869" , position: 'absolute', bottom:0, left:0, display: 'flex',justifyContent: 'center', alignItems: 'center'}} ><Text style={{fontSize:9, fontWeight:"700", color:"#fff"}}>6</Text></View>
            </View>
            <View style={{width:"auto", height:"auto", position: 'relative'}}>
            <Image style={{width:28 , height:28}} source={require('../assets/notification.png')}/>
            <View style={{width:14, height:14 , borderRadius:5 , backgroundColor:"#004869" , position: 'absolute', bottom:0, left:0, display: 'flex',justifyContent: 'center', alignItems: 'center'}} ><Text style={{fontSize:9, fontWeight:"700", color:"#fff"}}>6</Text></View>
            </View>

            
            <Image style={{width:28 , height:28}} source={require('../assets/qrcode.png')}/>
            <View style={{height:20, width:20 , display: 'flex', justifyContent: 'space-between'}}>
                <View style={{width:30, height:4, backgroundColor:'#7BACE6', borderRadius:3}}></View>
                <View style={{width:30, height:4, backgroundColor:'#7BACE6', borderRadius:3}}></View>
                <View style={{width:30, height:4, backgroundColor:'#7BACE6', borderRadius:3}}></View>

            </View>


            </View>
            
            </View>


            <View>
                <Text style={{color:"#004869", fontWeight:"800", fontSize:21, top:20}}>Créer un évemenement</Text>
            </View>
    
            
     
      </LinearGradient>
  )
}

export default CreateEventHeader

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