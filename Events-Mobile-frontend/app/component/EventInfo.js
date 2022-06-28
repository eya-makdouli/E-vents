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
const EventInfo = ({item , eventDetail , eventDetailState, eventD,setEventD,user} ,)=> {

    const width = useWindowDimensions();

    return (
      
    <View style={{width:width.width - 15,minHeight:151,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'space-evenly', marginBottom:10 , marginLeft:10, backgroundColor:"#fafafa", shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1}}>
        <TouchableOpacity onPress={()=> {user ? eventDetail(!eventDetailState) : null; user?  setEventD(item.organisateur): null  }}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent:"space-between"}}>
        <View style={{ height:30}}>
          <Text style={{fontSize:14 , fontWeight:'bold', color:"#000"}}>{item.eventName}</Text>
          </View>
            <View style={{height:"auto",position: 'relative'}}>
                <Text style={{fontSize:12, fontWeight:"bold", color:"#00AD61" }}>{item.category.genre}</Text>
            </View>
          <View style={{ height:"auto",position: 'relative'}}>
          <Text style={item.type !="enligne"?{fontSize:12, color:"#004869" }: {fontSize:12, color:"#00AD61", fontWeight: "700" }}>{item.type !="enligne" ?item.location.name + " " +item.location.city: "Google Meet"}</Text>
        </View>
        </View>
        <View style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
        <View style={{width:71, height:"auto"}}>
          <Image style={{width:71, height:71, borderRadius:500}} source={{uri : item.picture}}/>
        </View>

        <View style={{width:165, height:"auto", marginLeft:10}}><Text style={{fontSize:14, fontWeight:"300"}}>{item.description}</Text></View>
        
        
       
        </View>

        <View style={{width:"100%",display: 'flex', flexDirection:'row', alignItems: "flex-end" , justifyContent:"flex-end"}}>
        <View style={{ height:18, marginLeft:10,left:-28 }}><Text style={{fontSize:12, fontWeight:"300",color:"#464545"}}>Le {moment(item.startDate).format("YYYY-MM-DD")} a {moment(item.startDate).hours() + "h" + moment(item.startDate).minutes()}</Text></View>
        <View style={{ height:20, marginLeft:10}}><Text style={{fontSize:15, fontWeight:"600",color:"#998001"}}>Planifié</Text></View>

        </View>
        </TouchableOpacity>
    </View>
    
  )
}

export default EventInfo

const styles = StyleSheet.create({
   
      container: {
      
      },
    });