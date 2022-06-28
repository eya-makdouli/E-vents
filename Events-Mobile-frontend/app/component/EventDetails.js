import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import moment from "moment";
import * as WebBrowser from "expo-web-browser";
import {Video} from 'expo-av';
import {Feather, Ionicons} from "@expo/vector-icons";
import StaffCard from "./SaffCard";
import UserSearchCard from "./userSearchCard";
import {Picker} from "@react-native-picker/picker";


const EventDetails = ({eventDetails, type,organisateur,user}) => {
    const [selectedJob ,setSelectedJob]= useState(null);
    const [modalOpened , setModalOpened]= useState(false);
    const [jobs , setJob]= useState([]);
    const [selectedStaff , setSelectedStaff]= useState(false);
    const [likedStaff , setLikedStaff]= useState({});
    const [usersPerService , setUsersPerService]= useState([])
    const [loading, setLoading] = useState(false)
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [deleted , setDeleted]= useState(false);

    const [newUser , setNewUser]= useState({});
        const [notifications , setNotifications] =useState([]);
        const [participated , setParticipated] = useState(false);
        const [flag , setFlag]= useState(false);
        const [accepted , setAccepted] = useState(false);
        const [modalVisible, setModalVisible] = useState(false);
        const [search, setSearch] = useState(null);
        const [searchedUser, setSearchedUser] = useState({});
        const [participatedUsers , setParticipatedUsers]= useState([]);
        const [allParticipents, setAllParticipents]= useState([]);
        const [modal , setModal]= useState(false);
        const [staff , setStaff]= useState([]);
    const [need1, setNeed1] = React.useState(null);
    const [need2, setNeed2] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [recruted, setRecruted] = React.useState(false);
    const [partInvite, setPartInvite] = React.useState(false);
    const [recrutedStaffs, setRecrutedStaffs] = useState([]);
    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/recruitment/staff/"+user.id+"/"+true+"/"+eventDetails.id);
        const staff = await response.json()
        setStaff(staff);
    },[staff]);

    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/recruitment/duplicated/false/"+eventDetails.id);
        const s = await response.json();
        setRecrutedStaffs(s);
    },[])




    const recrut = async () => {
        setTimeout(()=>{
            setRecruted(true);
        }, 1000);
        await fetch('http://192.168.43.198:5555/api/v1/recruitment/create', {
            method: 'POST',


            body: JSON.stringify({
                user : {id : likedStaff.user.id},
                org : {id :organisateur.user[0].id},
                price : price,
                staffJob: {id :likedStaff.staffJob.id},
                event: {id : eventDetails.id},
                need1 : need1 ? need1 : null,
                need2 : need2 ? need2 : null,
                solved: false,
                accepted : false,
                refused : false,
            })

            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        })
            .then( res1 => res1.json())
            .then( async (res1) => {
                setTimeout(()=>{
                    setRecruted(false);
                    setModalOpened(false);
                },5000)

            });
    }





    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staffjob/all");
        const job = await response.json()
        setJob(job);
    },[jobs.length <= 0])


    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staff/staffjob/"+selectedJob);
        const user = await response.json();
        user.length = 1;
        setUsersPerService(user);
    },[selectedJob])

    useEffect(async ()=>{
        const response =await fetch("http://192.168.43.198:5555/api/v1/notification/eventpart/"+eventDetails.id+"/"+true);
        const p = await response.json();
        setParticipatedUsers(p);
    },[participatedUsers])

    useEffect(async ()=>{
            if(search.length===0){
            const response =await fetch("http://192.168.43.198:5555/api/v1/user/all");
            await setSearchedUser(await response.json());
            }
    },[search]);


    useEffect(async ()=>{
        if(search.length>2){
        const response =await fetch("http://192.168.43.198:5555/api/v1/user/firstname/"+search);
        await setSearchedUser(await response.json());
        }
    },[search]);

    setTimeout(()=>{
        setDeleted(false);
    },2000);



        useEffect(async ()=>{
            const response =await fetch("http://192.168.43.198:5555/api/v1/user/id/"+organisateur.user[0].id);
            await setNewUser(await response.json());
            setFlag(true)
        },[]);

    const participate= async () => {

            setFlag(true);
        await fetch('http://192.168.43.198:5555/api/v1/notification/create', {
            method: 'POST',
            body: JSON.stringify({
                type : "paticipation",
                action : "Veux participer à votre évenement",
                solved : false,
                accepted: false,
                refused : false,
                user : { id : user.id},
                event : {id : parseInt(eventDetails.id)},
                org : {id : organisateur.user[0].id}
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        }).then(async res => await res.json())
            .then(async (res)=> {
            });
    }
    useEffect(async ()=>{
        const response =await fetch("http://192.168.43.198:5555/api/v1/notification/event/"+user.id+"/"+eventDetails.id+"/"+false+"/paticipation");
        const p = await response.json();
        setFlag(p);
        if(p.length>0){
        setParticipated(true);
        }else{
            setParticipated(false);
        }
        const res =await fetch("http://192.168.43.198:5555/api/v1/notification/accepted/"+user.id+"/"+eventDetails.id+"/"+true+"/paticipation");
        const r = await res.json();
        if (r.length>0){
            setAccepted(true)
        }else{
            setAccepted(false)
        }


    },[flag])

    useEffect(async ()=>{
        const q =await fetch("http://192.168.43.198:5555/api/v1/notification/accepted/"+user.id+"/"+eventDetails.id+"/"+true+"/acceptedInvite")
        const e = await q.json();
        if(e.length>0){
        setPartInvite(true)
        }else{
            setPartInvite(false)
        }
    }, [partInvite])

    if (!newUser){
        return <View></View>;
    }else{
    return(

      <View style={styles.Container}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
              }}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <View style={styles.searchContainer}>
                          <View style={styles.searchContainerForInput}>
                              <View style={styles.searchInput}>
                                  <View style={{display:"flex",flexDirection:"row"}}>
                                      <Feather name="search" size={21} color="black" />
                                      <TextInput placeholder={"Rechercher"} style={{marginLeft: "6%", width: "60%"}} onChangeText={(search)=>setSearch(search)} />
                                  </View>
                                  <Text>Par : Nom</Text>
                              </View>
                          </View>
                      </View>
                      <ScrollView style={{width:"100%", marginTop:20}}>
                      {searchedUser.length>0 && searchedUser.map(u =>
                          searchedUser.id !== user.id&&<UserSearchCard user={u} event={eventDetails} userConnected={user} key={user.id} forDelete={false}/>
                      )}
                      </ScrollView>




                      <Pressable
                          style={[styles.button]}
                          onPress={() => setModalVisible(!modalVisible)}
                      >
                          <Ionicons name="close" size={32} color="green"  />
                      </Pressable>
                  </View>
              </View>
          </Modal>
          <View style={styles.header}>
              <View>
              <Text style={styles.filmTitle}>{eventDetails.eventName}</Text>
                  <Text style={styles.subTitle}>{"Organisé par "+organisateur.user[0].firstname + " " + organisateur.user[0].lastname}</Text>
              </View>
              <View style={styles.participate}>
                <TouchableOpacity disabled={participated || (eventDetails.isPrivate && organisateur.user[0].id!=user.id)} style={styles.btn} onPress={()=>{organisateur.user[0].id!=user.id? participate(): setModalVisible(true)}}>
                    <LinearGradient
                        colors={!eventDetails.isPrivate || organisateur.user[0].id==user.id || accepted || participated || partInvite?['#00E894', '#DCF6EA80']: ['#515151', 'rgba(238,249,245,0.5)']} style={styles.btn} locations={[0.0, 1.0]} start={{ x: .5, y: 0.2 }} end={{ x: 1, y: 0.2 }}>

                        {!participated&& (!accepted && !partInvite)?<Text style={[styles.desc , {fontSize: 18 , fontWeight: "400"}]}>{organisateur.user[0].id==user.id ? "Inviter": eventDetails.isPrivate? "Privé":"Participer" }</Text>: !accepted && !partInvite ? <Text style={[styles.desc , {fontSize: 18 , fontWeight: "400"}]}>En attente</Text>:<Text style={[styles.desc , {fontSize: 18 , fontWeight: "400"}]}>Accepté</Text>  }
                    </LinearGradient>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.description}>
              <Text style={[styles.category , {marginBottom:10}]}>Catégorie {eventDetails.category.genre}</Text>
              <Text style={styles.desc}>{eventDetails.description}
              </Text>
              {eventDetails.type!="enligne" ?<Text style={[styles.desc, {marginTop:10}]}>À {eventDetails.location.name} {" " +eventDetails.location.city}, le {moment(eventDetails.startDate).format("YYYY/MM/DD")} à {moment(eventDetails.startDate).hours()+":"+moment(eventDetails.startDate).minutes()}</Text>: accepted || organisateur.user[0].id==user.id && <TouchableOpacity style={{marginTop:15,marginLeft:20, marginBottom:10, backgroundColor:"#6c6c6c", width:250, display:"flex" ,padding : "2%", flexDirection:"row", justifyContent:"space-evenly"}} onPress={()=>WebBrowser.openBrowserAsync(eventDetails.link)}><Text style={{color:"#fff"}}>Google Meet Live Stream </Text><Image style={{height:20, width:20}} source={require("../assets/googlem.png")}/></TouchableOpacity>}
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modal}
                  onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModal(!modal);
                  }}
              >
                  <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                          {deleted &&<View style={styles.error}><Text style={{color:"#fff"}}>Le participant est retiré avec succés</Text></View>}
                          <ScrollView style={{width:"100%", marginTop:20}}>
                              {participatedUsers.length>0 && participatedUsers.map((u,i) =>(
                                  <UserSearchCard participated={true} user={u.user} event={eventDetails} userConnected={user} key={i} id={u.id} setDeleted={setDeleted} deleted={deleted} forDelete={true}/>)
                              )}
                          </ScrollView>
                          <Pressable
                              style={[styles.button]}
                              onPress={() => setModal(!modal)}
                          >
                              <Ionicons name="close" size={32} color="green"  />
                          </Pressable>
                      </View>
                  </View>
              </Modal>
              <TouchableOpacity onPress={()=>user.id == participatedUsers[0].org.id&&setModal(true)}><View style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:20}}>
                  <Text style={{fontWeight:"700", color:"#fff"}}>Utilisateurs Participés : </Text>
                  {participatedUsers.length >0 ?participatedUsers.map((p,index)=>
              index<=3&&<Image source={{uri : p.user.picture}} style={{height:30, width:30 , borderRadius:100}} key={index}/>
              ):<Text style={{fontWeight:"300", color:"#fff", fontSize:10}}>aucun utilisateur participé</Text>}
                  {participatedUsers.length>= 3&&<Text style={{fontWeight:"700", color:"#fff", fontSize: 18, alignSelf:"flex-end", marginLeft:5}}>...</Text>}
              </View></TouchableOpacity>

              {organisateur.user[0].id==user.id&&<TouchableOpacity><View style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:20}}>
                  <Text style={{fontWeight:"700", color:"#fff"}}>les staffs récruté : </Text>
                  {staff.length>0 ?staff.map((p,index)=>
                      index<=3&&<Image source={{uri : p.user.picture}} style={{height:30, width:30 , borderRadius:100}} key={index}/>
                  ):<Text style={{fontWeight:"300", color:"#fff", fontSize:10}}>aucun staff récruté</Text> }
                  {participatedUsers.length>= 3&&<Text style={{fontWeight:"700", color:"#fff", fontSize: 18, alignSelf:"flex-end", marginLeft:5}}>...</Text>}
              </View></TouchableOpacity>}

          </View>
          <View style={styles.params}>
              {eventDetails.endDate&&<View style={styles.duration}>
                <Text style={styles.category}>Durée</Text>
                  <Text style={styles.desc}>{(moment.duration(moment(eventDetails.startDate.toString()).diff(moment(eventDetails.endDate.toString()))).asMinutes() * -1) < 120 ? moment.duration(moment(eventDetails.startDate.toString()).diff(moment(eventDetails.endDate.toString()))).asMinutes()*-1 + "min" : (moment.duration(moment(eventDetails.startDate.toString()).diff(moment(eventDetails.endDate.toString()))).asHours() * -1)+ " Hours"}</Text>
              </View>}
              <View style={styles.social}>
                  <View style={styles.title}>
                      <Text style={[styles.category]}>Partager</Text>
                  </View>
                  <View style={styles.logos}>
                      <Image source={require("../assets/facebook.png")} style={{height: 38, width : 38}}/>
                      <Image source={require("../assets/instagram.png")} style={{height: 38, width : 38}}/>

                  </View>
              </View>
          </View>
          {eventDetails.video &&<View style={styles.video}>
              <Video
                  ref={video}
                  style={styles.video}
                  source={{
                      uri: eventDetails.video,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
              <View style={styles.buttons}>
              </View>
          </View>}
          <Modal
              scrollHorizontal={true}
              propagateSwipe={true}
              animationType="slide"
              transparent={true}
              visible={modalOpened}
              onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalOpened(!modalOpened);
              }}
          >

              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Picker  selectedValue={selectedJob}
                               onValueChange={(itemValue, itemIndex) =>{
                                   setSelectedJob(itemValue)}}
                               style={styles.picker}

                      >
                          {jobs.map(j =>
                              <Picker.Item label={j.nameService} value={j.id} key={j.id}></Picker.Item>)}
                      </Picker>
                      {!selectedStaff?<ScrollView style={{width : "100%"}}>
                          {usersPerService.map(u =>
                             <TouchableOpacity onPress={()=>{u.available&& setLikedStaff(u) ; u.available&&setSelectedStaff(true)}}>
                                  <StaffCard user={u} currentUser={user.id}/></TouchableOpacity>
                          )}
                      </ScrollView>: <View style={{backgroundColor: "rgba(0,173,97,0.9)", padding: 10, minHeight: 100 , width:"100%" ,marginBottom: 20, borderRadius:10 ,display:"flex", alignSelf:"flex-start", flexDirection:"row" , alignItems:"center"}}><Image style={{height:47, width:47, borderRadius:100}} source={{ uri : likedStaff.user.picture}}/><View style={{display:"flex", flexDirection:"column", marginLeft: 20}}><Text style={{fontWeight:"700", color:"#fff"}}>{likedStaff.user.firstname + " " + likedStaff.user.lastname}</Text><Text style={{fontWeight:"700", color:"#fff"}}>{likedStaff.staffJob.nameService}</Text><Text style={{ color:"#fff"}}>{likedStaff.user.location.city}</Text></View><TouchableOpacity style={{position: "absolute", top:5, right: 5}} onPress={()=> {setSelectedStaff(false); setLikedStaff({})}}><Ionicons name="close" size={24} color="#fff"  /></TouchableOpacity><Text style={{position:"absolute", top:5 , left:5,fontWeight:"300", color:"#fff", fontSize:12}}>Staff Sélectionner</Text></View>}
                      {selectedStaff  &&<View style={{width : "100%",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                          <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Proposer un prix" placeholderTextColor="#a1a1a1" onChangeText={(price) => setPrice(price)}/>
                      </View>}
                      {selectedStaff && selectedJob== 2095 &&<View style={{width : "100%",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                          <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Nombre des tables" placeholderTextColor="#a1a1a1" onChangeText={(need1) => setNeed1(need1)}/>
                      </View>}
                      {selectedStaff &&selectedJob== 2095 &&<View style={{width : "100%",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                          <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Nombre total des participant" placeholderTextColor="#a1a1a1" onChangeText={(need2) => setNeed2(need2)}/>
                      </View>}


                      <Pressable
                          style={[styles.button]}
                          onPress={() => setModalOpened(!modalOpened)}
                      >
                          <Ionicons name="close" size={32} color="green"  />
                      </Pressable>

                      {!recruted&&<View style={{width: "90%", justifyContent:"center" , alignSelf:"center"}}>
                          <TouchableOpacity style={styles.deconnect} onPress={()=>{
                              recrut();
                          }} >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Récruté le staff</Text>}</TouchableOpacity>
                      </View>}

                      {recruted&&<View style={{width: "90%", justifyContent:"center" , alignSelf:"center"}}>
                          <TouchableOpacity style={styles.deconnect} onPress={()=>{
                              recrut();
                          }} >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={[styles.btnText, {fontSize: 14 , fontWeight: "500"}]}>Invitation envoyé avec succés</Text>}</TouchableOpacity>
                      </View>}

                  </View>
              </View>
          </Modal>

          {organisateur.user[0].id==user.id && eventDetails.type !== 'enligne' &&<TouchableOpacity onPress={()=>setModalOpened(true)} style={styles.btn2}>
              <LinearGradient
                  colors={['#004869', 'rgba(220,246,234,0.24)']} style={[styles.btn2, {marginBottom:10}]} locations={[0.0, 1.0]} start={{ x: .5, y: 0.2 }} end={{ x: 1, y: 0.2 }}>
                  <Text style={[styles.desc , {fontSize: 15 , fontWeight: "400"}]}>Récruter un Staff</Text>
              </LinearGradient>
          </TouchableOpacity>}

      </View>

    )};
}



export default EventDetails;
const styles = StyleSheet.create({
    Container : {
        height:"95%",
        minHeight: "85%",
        maxHeight: "90%",
        width : "90%",
        position : "absolute",
        bottom : 0,
        display: "flex",
        flexDirection : "column",
        backgroundColor :"rgba(74, 81, 106, .8)",
        alignSelf: "center",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        paddingTop : 54,
        justifyContent: "space-around"
    },
    header: {
        display: "flex",
        flexDirection : "row",
        alignItems: "center" ,
        justifyContent: "space-between",
        paddingLeft: 10,
        height: "auto",
        width : "100%"
    },
    description : {
        height :"auto",
        width : "90%",
        display : "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: 15

    },
    params : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",

    },
    filmTitle: {
        color: "#fff",
        fontSize : 24,
        fontWeight : "900",
    },
    subTitle : {
        color: "#fff",
        fontWeight :"300",

    },
    category : {
        color: "#fff",
        fontWeight:"500"
    },
    desc : {
        color: "#fff",
        fontWeight :"300",
    },
    btn : {
        height: 40,
        width : 110,
        display: "flex",
        alignSelf: "flex-end",
        alignItems:"center",
        justifyContent:"center",
        left:0,


    },
    btn2 : {
        height: 30,
        marginTop:10,
        width : "80%",
        display: "flex",
        alignSelf: "center",
        alignItems:"center",
        justifyContent:"center",


    },
    logos : {
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        justifyContent: "space-between",
        width:70,
    },
    title : {
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    video : {
        position:"relative",
        height : 164,
        width : 272,
        backgroundColor:"#000",
        alignSelf:"center",
        opacity:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        paddingTop:40,
        width:"90%",
        maxHeight:"90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
        button: {
            position:"absolute",
            top: 0,
            right : 3,
            borderRadius: 20,
            padding: 10,
            elevation: 2
        },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    searchContainer :{
        height : "auto",
        width : "100%",
        display:"flex",
        flexDirection : "column",
        justifyContent:"center",
        alignItems:"center",
        marginTop : "3%",
        alignSelf:"center"
    },
    searchContainerForInput :{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        width: "90%",

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
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    picker: {
        width: "100%",
        marginTop:-70
    },
    btnText : {
        fontSize:18,
        fontWeight: "700",
        color: "#fff"
    },deconnect : {
        marginTop: "3%",
        width : "100%",
        height: 36,
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#00AD61",
        borderRadius: 3
    },error : {
        height : "auto",
        width : "90%",
        borderRadius: 5,
        backgroundColor: "#cb0000",
        display: "flex",
        justifyContent: "flex-start",
        padding: 10,
        alignSelf:"center",
    }


})