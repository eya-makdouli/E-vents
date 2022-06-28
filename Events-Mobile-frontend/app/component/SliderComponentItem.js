import React from "react";
import {View , Text , StyleSheet ,Image , useWindowDimensions} from "react-native";

const SliderComponentItem = ({item}) => {
    const width = useWindowDimensions();
            return (
    <View style={[{width : width.width , height: width.height} , {alignItems : "center" }]}>
        {item.id == "1" &&  <View style={ {position: "absolute" , top :0, backgroundColor: "#00AD61", height: "50%", width: "100%" } }></View>}
        {item.id == "2" &&  <View style={ {position: "absolute", backgroundColor: "#F8CECF", height: "50%", width: "100%"} }></View>}
        {item.id == "3" &&  <View style={ {position: "absolute", backgroundColor: "#455A64", height: "50%", width: "100%"} }></View>}
        {item.id == "4" &&  <View style={ {position: "absolute", backgroundColor: "#ECEFFC", height: "50%", width: "100%"} }></View>}
        {item.id == "1" &&  <Image source ={item.image} style={[styles.image , {resizeMode: "contain"} , item.id == "1" ? {width:90, height : 200 ,top : 40} : {width : width.width , height: width.height} ]} />}
        {item.id == "2" &&  <Image source ={item.image} style={[styles.image , {resizeMode: "contain"} , item.id == "1" ? {width:100, height : 300} : {width : width.width , height: width.height} ]} />}
        {item.id == "3" &&  <Image source ={item.image} style={[styles.image , {resizeMode: "contain"} , item.id == "1" ? {width:100, height : 300} : {width : width.width , height: width.height} ]} />}
        {item.id == "4" &&  <Image source ={item.image} style={[styles.image , {resizeMode: "contain"} , item.id == "1" ? {width:100, height : 300} : {width : width.width , height: width.height} ]} />}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
    </View>
)

}
export default SliderComponentItem;
const styles = StyleSheet.create({
        image : {
            flex: 0.60,
            justifyContent : "center",
            alignItems: "center"
        },
    title : {
            fontWeight : '800',
        fontSize : 28 ,
        marginBottom : 10 ,
        color : '#493d8a',
        textAlign : "center",
        zIndex : 1000
    },
    description : {
            fontWeight : '300',
        color : '#62656b',
        textAlign : "center",
        paddingHorizontal : 64,
        zIndex : 1000
    },


    })