import React, {useEffect, useRef, useState} from 'react'
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import EventInfo from './EventInfo';
import EventsJson from "../EventsJson";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigatorDots from "./Shared/NavigatorDots";
import {
    Feather,
    FontAwesome,
    FontAwesome5,
    Fontisto,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import moment from "moment";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeBody = (props)=> {
    const [users , setUsers]= useState({})
    const [enLigneEvents,setEnLigneEvents]= useState({});
    const [presentielEvents,setPresentielEvents]= useState({});
    const [currentIndex , setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [selectedFilm , setSelectedFilm] = useState(false);
    const [selectedMusic , setselectedMusic] = useState(false);
    const [selectedMeeting , setselectedMeeting] = useState(false);
    const [selectedFiancy , setselectedFiancy] = useState(false);
    const [selectedParty , setselectedParty] = useState(false);
    const [selectedGrad , setselectedGrad] = useState(false);
    const [events , setEvents] = useState([]);
    const [eventsPres , setEventsPres] = useState([]);
    const [eventsEnLigne , setEventsEnLigne] = useState([]);
    const [eventsAll , setEventsAll] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [notFound, setNotFound] = React.useState(false);
    const [AllnotFound, setAllNotFound] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);




    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current
    const slidesRef = useRef(null)
    const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;


    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/user/id/"+props.user.id);
        setUsers(await response.json());
    }, []);


    useEffect(async ()=> {
        if (props.user){
            const response = await fetch("http://192.168.43.198:5555/api/v1/event/locationEvent/" + props.user.location.city);
        const allEv = await response.json();
        setEventsAll(allEv);
        setEvents(allEv.reverse());
            }else{
            const response = await fetch("http://192.168.43.198:5555/api/v1/event/all");
            setEventsAll(await response.json())
            await setEvents(eventsAll.reverse());
        }
        },[refreshing]);

    useEffect(async ()=> {
            props.user.events.forEach(e => {
                props.notifications.forEach(async n => {
                        if (!n.notified && n.org.id !== n.user.id && !n.accepted && !n.solved && n.type != "reminder" && moment(e.startDate).format("YYYY/MM/DD") >= moment(Date.now()).format("YYYY/MM/DD") && moment(e.startDate).format("YYYY/MM/DD") >= moment(new Date(new Date().getTime() - 24*60*60*1000)).format("YYYY/MM/DD")){
                            await fetch('http://192.168.43.198:5555/api/v1/notification/update/'+parseInt(n.id), {
                                method: 'PUT',
                                body: JSON.stringify({
                                    ...n,
                                    notified: true
                                })
                                , headers: {
                                    'Accept': 'application/json',
                                    'content-type': 'application/json'
                                }
                                ,}).then((res)=> res.json())
                                .then(async (resJson)=> {
                                    await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            type : "reminder",
                                            action : "que vous avez participé vas commancer bientôt le "+moment(e.startDate).format("YYYY/MM/DD"),
                                            solved : false,
                                            accepted: false,
                                            refused : false,
                                            user : { id : props.user.id},
                                            event : {id : parseInt(e.id)},
                                            org : {id : props.user.id},
                                            notified : true
                                        })
                                        , headers: {
                                            'Accept': 'application/json',
                                            'content-type': 'application/json'
                                        }

                                    })
                                }).then(async res => await res.json())
                                .then(async (res)=> {
                                });
                        }else{
                        }
                })

            })
                // if (moment(e.startDate).format("YYYY/MM/DD") <= moment(Date.now()).format("YYYY/MM/DD") && moment(e.startDate).format("YYYY/MM/DD") >= moment(new Date(new Date().getTime() - 24*60*60*1000)).format("YYYY/MM/DD") && (n.event.id !== e.id && n.user.id !== props.user.id && n.type !== "reminder" && n.org.id !== props.user.id)){

                // }


    },[])

    const reset = async ()=> {
        setselectedGrad(false);
        setselectedFiancy(false);
        setSelectedFilm(false);
        setselectedParty(false);
        setselectedMusic(false);
        setselectedMeeting(false);
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/locationEvent/"+users.location.city);
        const ev = await response.json();
        setEvents(ev.reverse())
const res = await fetch("http://192.168.43.198:5555/api/v1/event/type/presentiel");
        const pev =await res.json();
        setPresentielEvents(pev);
        const r = await fetch("http://192.168.43.198:5555/api/v1/event/type/enligne");
        const eev = await r.json();
        setEnLigneEvents(eev);
    }

    const filmFilter = async () =>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/catLocEvent/Film/"+users.location.city);
        const ev = await response.json();
        setEvents(ev.reverse())
        const res = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/presentiel/Film");
        const pev =await res.json();
        setPresentielEvents(pev);
        const r = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/enligne/Film");
        const eev = await r.json();
        setEnLigneEvents(eev);


    }
    const musicFilter = async () =>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/catLocEvent/Musique/"+users.location.city);
        const ev = await response.json();
        setEvents(ev.reverse())
        const res = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/presentiel/Musique");
        const pev =await res.json();
        setPresentielEvents(pev);
        const r = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/enligne/Musique");
        const eev = await r.json();
        setEnLigneEvents(eev);

    }
    const meetingFilter = async () =>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/catLocEvent/Reunion/"+users.location.city);
        const ev = await response.json();
        setEvents(ev.reverse())
        const res = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/presentiel/Reunion");
        const pev =await res.json();
        setPresentielEvents(pev);
        const r = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/enligne/Reunion");
        const eev = await r.json();
        setEnLigneEvents(eev);
    }

    const mariageFilter = async () =>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/catLocEvent/Fiancaille/"+users.location.city);
        const ev = await response.json();
        setEvents(ev.reverse())
        const res = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/presentiel/Fiancaille");
        const pev =await res.json();
        setPresentielEvents(pev);
        const r = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/enligne/Fiancaille");
        const eev = await r.json();
        setEnLigneEvents(eev);


    }

    const PartyFilter = async () =>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/catLocEvent/Party/"+users.location.city);
        const ev = await response.json();
        setEvents(ev.reverse())
        const res = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/presentiel/Party");
        const pev =await res.json();
        setPresentielEvents(pev);
        const r = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/enligne/Party");
        const eev = await r.json();
        setEnLigneEvents(eev);
    }

    const gradFilter = async () =>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/catLocEvent/Ceremonie/"+users.location.city);
        const ev = await response.json();
        setEvents(ev.reverse())
        const res = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/presentiel/Ceremonie");
        const pev =await res.json();
        setPresentielEvents(pev);
        const r = await fetch("http://192.168.43.198:5555/api/v1/event/typegenre/enligne/Ceremonie");
        const eev = await r.json();
        setEnLigneEvents(eev);
    }

    useEffect(async ()=> {
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/type/enligne");
        const eev = await response.json();
        setEnLigneEvents(eev.reverse());
        setEventsEnLigne(eev);
    },[refreshing])



    useEffect(async ()=> {
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/type/presentiel");
        const pev = await response.json();
        setPresentielEvents(pev.reverse());
        setEventsPres(pev);
    },[refreshing])

    //search input section
    useEffect(async ()=> {
        const response = await fetch("http://192.168.43.198:5555/api/v1/event/searchType/enligne/"+search);
        const eev = await response.json();
        setEnLigneEvents(eev.reverse());
        setEventsEnLigne(eev);


        const res = await fetch("http://192.168.43.198:5555/api/v1/event/searchType/presentiel/"+search);
        const pev = await res.json();
        setPresentielEvents(pev.reverse());
        setEventsPres(pev);

        const r = await fetch("http://192.168.43.198:5555/api/v1/event/search/" + search);
        const allEv = await r.json();
        setEventsAll(allEv);
        setEvents(allEv.reverse());

    },[search]);









    const toggle =  () => {
        if (selectedFilm){
            setselectedMusic(false);
            setselectedParty(false);
            setselectedMeeting(false);
            setselectedGrad(false);
            setselectedFiancy(false);
        }else if(selectedMusic){
            setSelectedFilm(false);
            setselectedParty(false);
            setselectedMeeting(false);
            setselectedGrad(false);
            setselectedFiancy(false);
        }else if(selectedMeeting) {
            setSelectedFilm(false);
            setselectedParty(false);
            setselectedFiancy(false);
            setselectedGrad(false);
            setselectedMusic(false);
        }else if (selectedFiancy){
            setSelectedFilm(false);
            setselectedParty(false);
            setselectedMeeting(false);
            setselectedGrad(false);
            setselectedMusic(false);
        }else if (selectedParty){
            setSelectedFilm(false);
            setselectedFiancy(false);
            setselectedMeeting(false);
            setselectedGrad(false);
            setselectedMusic(false);
        }else if (selectedGrad) {
            setSelectedFilm(false);
            setselectedFiancy(false);
            setselectedMeeting(false);
            setselectedParty(false);
            setselectedMusic(false);
        }
    }




    const width = useWindowDimensions();
    const widthPage = useWindowDimensions().width;
    if((events.length>0 || enLigneEvents.length>0 || presentielEvents.length>0)){
        setTimeout(()=>{
            setAllNotFound(true);
        },5000)
        if(events.length>4)
        events.length = 4;
        if (enLigneEvents.length> 5)
            enLigneEvents.length = 5;
        if (presentielEvents.length>5)
            presentielEvents.length=5;
  return (

        <ScrollView style={{paddingBottom:150, marginTop : 0,backgroundColor:"#fff", height:"100%"}} refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}>
            <View style={styles.searchContainer}>
                <View style={styles.searchContainerForInput}>
                    <View style={styles.searchInput}>
                        <View style={{display:"flex",flexDirection:"row"}}>
                            <Feather name="search" size={21} color="black" />
                        <TextInput placeholder={"Rechercher"} style={{marginLeft: "6%", width: "60%"}} onChangeText={(text)=>setSearch(text)} />

                        </View>
                            <Text>Par : Nom</Text>
                        </View>
                            <View style={{marginLeft: "5%"}}>
                                <Ionicons name="filter-sharp" size={24} color="#4A90E2" />
                            </View>
                        </View>

                <View style={styles.filterContainer}>
                    <View style={[styles.filter , selectedFilm? {backgroundColor:"#68D7A6"} : {backgroundColor : "#E9E9E9"}]} >
                        {!selectedFilm && <Fontisto name="film" size={24} color="#4A90E2" onPress={(selectedFilm) =>{ setSelectedFilm(selectedFilm) ; toggle() ; filmFilter(); }} />}
                        {selectedFilm && <Fontisto name="film" size={24} color="#fff" onPress={(selectedFilm) =>{ setSelectedFilm(!selectedFilm) ; reset(); }} />}
                    </View>
                    <View style={[styles.filter , selectedMusic? {backgroundColor:"#68D7A6"} : {backgroundColor : "#E9E9E9"}]}>
                        {!selectedMusic && <Ionicons name="musical-notes" size={24} color="#4A90E2" onPress={(selectedMusic) =>{ setselectedMusic(selectedMusic); toggle(); musicFilter()}} />}
                        {selectedMusic && <Ionicons name="musical-notes" size={24} color="#fff" onPress={(selectedMusic) =>{ setselectedMusic(!selectedMusic) ; reset(); } }/>}
                    </View>
                    <View style={[styles.filter , selectedMeeting? {backgroundColor:"#68D7A6"} : {backgroundColor : "#E9E9E9"}]}>
                        {!selectedMeeting && <MaterialIcons name="meeting-room" size={24} color="#4A90E2" onPress={(selectedMeeting) =>{ setselectedMeeting(selectedMeeting); toggle(); meetingFilter()}} />}
                        {selectedMeeting && <MaterialIcons name="meeting-room" size={24} color="#fff" onPress={(selectedMeeting) =>{ setselectedMeeting(!selectedMeeting); toggle(); reset();}}/>}
                    </View>

                    <TouchableOpacity style={[styles.filter , selectedFiancy? {backgroundColor:"#68D7A6"} : {backgroundColor : "#E9E9E9"}]} onPress={(selectedFiancy) =>{selectedFiancy&&setselectedFiancy(!selectedFiancy); toggle() ; selectedFiancy&&mariageFilter(); !selectedFiancy&&reset() }}>
                        {!selectedFiancy && <Image style={{width : 21 , height: 21}} source={require('../assets/fian.png')} />}
                        {selectedFiancy && <Image style={{width : 21 , height: 21}} source={require('../assets/fian.png')}/>}
                    </TouchableOpacity>
                    <View style={[styles.filter , selectedParty? {backgroundColor:"#68D7A6"} : {backgroundColor : "#E9E9E9"}]}>
                        {!selectedParty && <MaterialCommunityIcons name="party-popper" size={24} color="#4A90E2" onPress={(selectedParty) =>{ setselectedParty(selectedParty); toggle(); PartyFilter();}} />}
                        {selectedParty && <MaterialCommunityIcons name="party-popper" size={24} color="#fff" onPress={(selectedParty) =>{ setselectedParty(!selectedParty); toggle() ; reset();}}/>}
                    </View>
                    <View style={[styles.filter , selectedGrad? {backgroundColor:"#68D7A6"} : {backgroundColor : "#E9E9E9"}]}>
                        {!selectedGrad && <FontAwesome5 name="graduation-cap" size={20} color="#4A90E2" onPress={(selectedGrad) =>{ setselectedGrad(selectedGrad); toggle(); gradFilter();}}/>}
                        {selectedGrad && <FontAwesome5 name="graduation-cap" size={20} color="#fff" onPress={(selectedGrad) =>{ setselectedGrad(!selectedGrad); toggle(); reset();}}/>}
                    </View>

                </View>


                    </View>
            <View style={{width: "100%" ,height: "auto", display:"flex",flexDirection : "row", justifyContent:"space-between", marginLeft: "6%" ,alignItems:"center", padding : 10 , paddingLeft : 0}}><Text style={{fontWeight : "300"}}>À votre proximité</Text><TouchableOpacity onPress={()=> {props.setViewAll(true); props.setData(eventsAll)}}><View style={{display:"flex", flexDirection: "row" , width: 100 , justifyContent: "space-evenly" , alignItems:"center",marginRight: '6%'}}><Text style={{fontSize: 15 , fontWeight: "500" , color:"#4A90E2"}}>Voir Tout</Text><FontAwesome name="arrow-circle-right" size={24} color="#4A90E2" /></View></TouchableOpacity></View>
            {events.length>0?<FlatList  data={events} renderItem={({item}) => <EventInfo item = {item} eventDetailState={props.eventDetailState} eventDetail={props.eventDetail} eventD={props.eventD} setEventD={props.setEventD} user={props.user}/> }
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      viewabilityConfig={viewConfig}
                      scrollEventThrottle={32}
                      scrollToOverflowEnabled
                      pagingEnabled
                      bounces={true}
                      onViewableItemsChanged={viewableItemsChanged}
                      keyExtractor={(item) => item.id}
                      style={{width: "99%"}}
                      onScroll={Animated.event([{nativeEvent : {contentOffset : {x : scrollX}}}],{
                          useNativeDriver : false
                      })}/>: !AllnotFound?<View style={{width:width.width - 15,height:151,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'center', alignItems:"center", marginBottom:10 , marginLeft:10, backgroundColor:"#fafafa", shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1}}>
                <ActivityIndicator size="small" color="black" />
            </View>: <View style={{width:width.width - 15,height:151,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'center', alignItems:"center", marginBottom:10 , marginLeft:10, backgroundColor:"#fafafa", shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1}}>
                <Text>Il ya pas des évenements a ce filtre</Text>
            </View>}
            <View style={{width: "100%" ,height: "auto", display:"flex",  alignItems: "center" }}><NavigatorDots data={EventsJson} scrollX={scrollX}/></View>
            <View style={{width: "100%" ,height: "auto", display:"flex",flexDirection : "row", justifyContent:"space-between", alignItems:"center", marginLeft: "6%" , padding : 10 , paddingLeft : 0}}><Text style={{fontWeight : "300"}}>Evenement Présentiel</Text><TouchableOpacity onPress={()=> {props.setViewAll(true); props.setData(eventsPres)}}><View style={{display:"flex", flexDirection: "row" , width: 100 , justifyContent: "space-evenly" , alignItems:"center",marginRight: '6%'}}><Text style={{fontSize: 15 , fontWeight: "500" , color:"#4A90E2"}}>Voir Tout</Text><FontAwesome name="arrow-circle-right" size={24} color="#4A90E2" /></View></TouchableOpacity></View>
            {presentielEvents.length>0?<FlatList data={presentielEvents} renderItem={({item}) => <EventInfo item = {item } eventDetailState={props.eventDetailState} eventDetail={props.eventDetail} eventD={props.eventD} setEventD={props.setEventD} user={props.user} /> }
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  viewabilityConfig={viewConfig}
                  scrollEventThrottle={32}
                  pagingEnabled
                  bounces={true}
                  onViewableItemsChanged={viewableItemsChanged}
                  style={{width: "99%"}}
                  keyExtractor={(item) => item.id}
                  />: !AllnotFound?<View style={{width:width.width - 15,height:151,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'center', alignItems:"center", marginBottom:10 , marginLeft:10, backgroundColor:"#fafafa", shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1}}>
                <ActivityIndicator size="small" color="black" />
            </View>: <View style={{width:width.width - 15,height:151,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'center', alignItems:"center", marginBottom:10 , marginLeft:10, backgroundColor:"#fafafa", shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1}}>
                <Text>Il ya pas des évenements a ce filtre</Text>
            </View>}
            <View style={{width: "100%" ,height: "auto", display:"flex",flexDirection : "row", justifyContent:"space-between", marginLeft: "6%" ,alignItems:"center", padding : 10 , paddingLeft : 0}}><Text style={{fontWeight : "300"}}>Evenement En Ligne</Text><TouchableOpacity onPress={()=> {props.setViewAll(true); props.setData(eventsEnLigne)}}><View style={{display:"flex", flexDirection: "row" , width: 100 , justifyContent: "space-evenly" , alignItems:"center",marginRight: '6%'}}><Text style={{fontSize: 15 , fontWeight: "500" , color:"#4A90E2"}}>Voir Tout</Text><FontAwesome name="arrow-circle-right" size={24} color="#4A90E2" /></View></TouchableOpacity></View>
            {enLigneEvents.length>0?<FlatList data={enLigneEvents} renderItem={({item}) => <EventInfo item = {item} eventDetailState={props.eventDetailState} eventDetail={props.eventDetail} eventD={props.eventD} setEventD={props.setEventD} user={props.user}/> }
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  viewabilityConfig={viewConfig}
                  scrollEventThrottle={32}
                  ref={slidesRef}
                  pagingEnabled
                  bounces={true}
                  onViewableItemsChanged={viewableItemsChanged}
                  style={{width: "99%"}}
                  keyExtractor={(item) => item.id}
                  />:!AllnotFound?<View style={{width:width.width - 15,height:151,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'center', alignItems:"center", marginBottom:10 , marginLeft:10, backgroundColor:"#fafafa", shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1}}>
                <ActivityIndicator size="small" color="black" />
            </View>: <View style={{width:width.width - 15,height:151,borderRadius:17,opacity:1,borderWidth:2, borderColor:"#fff",padding:15, display: 'flex', justifyContent: 'center', alignItems:"center", marginBottom:10 , marginLeft:10, backgroundColor:"#fafafa", shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1}}>
                <Text>Il ya pas des évenements a ce filtre</Text>
            </View>}
        </ScrollView>

  )}else{
        setTimeout(()=>{
            setNotFound(true);
            setAllNotFound(false);
        },3000);

        if(!notFound){
        return (<View style={{height:"73%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}><ActivityIndicator size="small" color="black" /></View>);
        }else{
            return (<View style={{height:"73%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}><Text>il ya pas des évenements</Text><TouchableOpacity onPress={()=> reset()}><Text style={{color: "blue"}}>Actualiser</Text></TouchableOpacity></View>)
        }
        }
}

export default HomeBody

const styles = StyleSheet.create({
   
      container: {
       flex: 1,

        backgroundColor: 'rgba(153, 151, 151, 0.5)',
        display: 'flex',

        

      },
    contain :{
          flex : 1,
            display:"flex",
        flexDirection: "column"
    },
    searchContainer :{
          height : "auto",
        width : "90%",
        display:"flex",
        flexDirection : "column",
        justifyContent:"center",
        alignItems:"center",
        marginTop : "3%",
    },
    searchContainerForInput :{
          display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        width: "100%",
        paddingLeft : "5%"

    },
    searchInput : {
          width : 286,
        height : 37,
        borderRadius : 238,
        backgroundColor: "#fff",
        opacity: 0.7,
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft : "4%",
        paddingRight : "4%",
        shadowOffset: {width: 1,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1

    },
    filterContainer : {
          display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width : "100%",
        height : "auto",
        flexDirection:"row",
        padding : 15,
    },
    filter : {

       height: 38,
       width : 38,
       borderRadius : 87,
       backgroundColor:"#E9E9E9",
        marginLeft: 5,
        display:"flex",
        justifyContent: "center",
        alignItems:"center"
    }

    });