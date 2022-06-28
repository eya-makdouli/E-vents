import React from 'react'
import { StyleSheet, View,Image,Text,Button, TouchableHighlight ,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
const VisitorHomeheader = ({navigator})=> {
  return (
     
    <View >
     <LinearGradient
        colors={['#68D7A680', '#DCF6EA80', '#DCF6EB',"#FFFFFF"]}
        style={styles.container} blurRadius={50}>
        <View style={{width: '100%', height:"auto", display:"flex", flexDirection: "row" , justifyContent: "flex-end"}}>
            <View style={{display: "flex", flexDirection: "row" , alignItems: "center"}}>
                <Text style={{color:"#60BCDF", fontWeight:"700", left:-25} } onPress={()=> navigator.navigate('LoginScreen')}>Se connecter</Text>
            <TouchableHighlight style={{backgroundColor:"#00AD61" , padding:5, paddingLeft:10,paddingRight:10, left:-15, display: "flex", alignItems: "center"}}
  underlayColor='#fff' onPress={()=> navigator.navigate('SignupScreen')}>
    <Text style={{color:"#fff",fontWeight:"700", fontSize:12 }}>S'inscrire</Text>
</TouchableHighlight>
            </View>

        </View>
        <View style={{height : "35%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Text style={{color:"#004869", fontWeight:"800", fontSize:21}}> Accueil</Text>
            </View>
         <View style={{width:375, display:"flex",justifyContent: 'center', alignItems: 'center' ,top:20}}>
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
         </View>
      </LinearGradient>
        
    </View>
   
  )
}

export default VisitorHomeheader

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