import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import moment from "moment";
import * as WebBrowser from "expo-web-browser";
import {Video} from 'expo-av';
import {Feather, Ionicons} from "@expo/vector-icons";
import {Picker} from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import dimensions from "react-native-web/dist/exports/Dimensions";
import {ActivityIndicator} from "react-native";


const EditEvent = ({eventDetails, type,organisateur,user,category,setEditTemplate}) => {
    const [selectedJob ,setSelectedJob]= useState(null);
    const [jobs , setJob]= useState([]);
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
    const [staff , setStaff]= useState([]);
    const [editTitle , setEditTitle]= useState(false);
    const [editCategory , setEditCategory]= useState(false);
    const [editDesc , setEditDesc]= useState(false);
    const [editLocationDate , setEditLocationDate]= useState(false);
    const [editVideo , setEditVideo]= useState(false);
    const [video1 , setVideo] = useState(null)
    const [editedTitle , setEditedTitle]= useState(null);
    const [editedDesc , setEditedDesc]= useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null);
    const [locations , setLocations]= useState(null);
    const [suggestionsList, setSuggestionsList] = useState(null)
    const dropdownController = useRef(null)
    const searchRef = useRef(null)
    const [selectedItem, setSelectedItem] = useState(null);
    const [locationRegion, setLocationRegion] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [selectedCategory ,setSelectedCategory]= useState(null);
    const [genre ,setGenre]= useState(null);
    const [Edited ,setEdited]= useState(false);
    const [loader , setLoader]= useState(false);





    const Edit = async () => {

        setLoader(true);
        setTimeout(()=>{
            setEdited(true);
            setLoader(false);
        }, 2000)
        if(eventDetails.type !== 'enligne'){
        await fetch('http://192.168.43.198:5555/api/v1/location/create', {
            method: 'POST',
            body: JSON.stringify({
                city: selectedItem,
                region: locationRegion,
                name: locationName,
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        }).then(async res => selectedItem && locationName && locationRegion?await res.json(): res = null)
            .then(async (res) => {
                await fetch('http://192.168.43.198:5555/api/v1/event/update/' + eventDetails.id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...eventDetails,
                        eventName: editedTitle ? editedTitle : eventDetails.eventName,
                        category: {id: selectedCategory ? selectedCategory : eventDetails.category.id},
                        description: editedDesc ? editedDesc : eventDetails.description,
                        startDate: date ? date : eventDetails.startDate,
                        video: video1 ? video1.toString() : eventDetails.video,
                        organisateur: {id: organisateur.id},
                        location : {id : res ?res.id: eventDetails.location.id}

                    })
                    , headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json'
                    }

                    ,
                }).then(async res => await res.json())
                    .then(async (res) => {
                        setTimeout(()=>{
                            setEdited(false)
                        },5000)
                        setEditCategory(false);
                        setEditLocationDate(false);
                        setEditTitle(false);
                        setEditVideo(false);
                        setEditDesc(false);
                        setEditTemplate(false);
                        setLocationName(null);
                        setLocationRegion(null);

                    });

            });
        }else{
            await fetch('http://192.168.43.198:5555/api/v1/event/update/' + eventDetails.id, {
                method: 'PUT',
                body: JSON.stringify({
                    ...eventDetails,
                    eventName: editedTitle ? editedTitle : eventDetails.eventName,
                    category: {id: selectedCategory ? selectedCategory : eventDetails.category.id},
                    description: editedDesc ? editedDesc : eventDetails.description,
                    organisateur: {id: organisateur.id}
                })
                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }

                ,
            }).then(async res => await res.json())
                .then(async (res) => {
                    console.log('error'+res.status)
                    setTimeout(()=>{
                        setEdited(false)
                    },5000)
                    setEditCategory(false);
                    setEditLocationDate(false);
                    setEditTitle(false);
                    setEditVideo(false);
                    setEditDesc(false);
                    setEditTemplate(false);
                    setLocationName(null);
                    setLocationRegion(null);

                });
        }
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const pickVideo = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        if (!result.cancelled) {
            setVideo(result.uri);
        }
    };


    const getSuggestions = useCallback(async (q) => {
            if (typeof q !== "string" || q.length < 1) {
                setSuggestionsList(null)
                return
            }
            setLoading(true)
            const response = await fetch("http://192.168.43.198:5555/api/v1/location/citylike/" + q)
            const items = await response.json()
            const arr = [];
            items.filter((v, i, a) => {
                if (a.findIndex(v2 => (v2.city === v.city)) === i) {
                    arr.push(v)
                }
            });
            setLocations(arr);
            const suggestions = arr.map((item) => ({
                id: item.id,
                title: item.city
            }))
            setSuggestionsList(suggestions)
            setLoading(false)
        },
        [])


    if (!newUser){
        return <View></View>;
    }else{
        return(

            <View style={styles.Container}>
                <View style={styles.header}>
                    <View>
                        {!editTitle&&<TouchableOpacity onPress={()=>{setEditTitle(true)}}><Text style={styles.filmTitle}>{eventDetails.eventName}</Text></TouchableOpacity>}
                        {editTitle&&<TextInput style={styles.filmTitle} editable={true} selectTextOnFocus={true}  placeholder="Nouveau titre" placeholderTextColor="#a1a1a1" onChangeText={(editedTitle)=>{setEditedTitle(editedTitle)}}></TextInput>}

                        <Text style={styles.subTitle}>{"Organisé par "+organisateur.user[0].firstname + " " + organisateur.user[0].lastname}</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <TouchableOpacity onPress={()=>{setEditCategory(true); setModalVisible(true)}}><Text style={[styles.category , {marginBottom:10}]}>Catégorie {!genre?eventDetails.category.genre: genre}</Text></TouchableOpacity>
                    {!editDesc&&<TouchableOpacity onPress={()=>{setEditDesc(true)}}><Text style={styles.desc}>{eventDetails.description}</Text></TouchableOpacity>}
                    {editDesc&&<TextInput multiline={true} numberOfLines={4} style={styles.desc} placeholder="Description de l'évenement" placeholderTextColor="#a1a1a1" editable={true} selectTextOnFocus={false} onChangeText={(editedDesc)=>{setEditedDesc(editedDesc)}} />}




                    {eventDetails.type!="enligne" ?<TouchableOpacity onPress={()=>{setEditLocationDate(true);setModalVisible(true)}}><Text style={[styles.desc, {marginTop:10}]}>À {locationName? locationName:eventDetails.location.name} {" " +selectedItem? selectedItem: eventDetails.location.city}, le {moment(eventDetails.startDate).format("YYYY/MM/DD")} à {moment(eventDetails.startDate).hours()+":"+moment(eventDetails.startDate).minutes()}</Text></TouchableOpacity>: accepted && <TouchableOpacity style={{marginTop:15,marginLeft:20, marginBottom:10, backgroundColor:"#6c6c6c", width:250, display:"flex" ,padding : "2%", flexDirection:"row", justifyContent:"space-evenly"}} onPress={()=>WebBrowser.openBrowserAsync(eventDetails.link)}><Text style={{color:"#fff"}}>Google Meet Live Stream </Text><Image style={{height:20, width:20}} source={require("../assets/googlem.png")}/></TouchableOpacity>}
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
                                {editLocationDate&&<View style={{display:"flex", justifyContent:"center"}}>
                                <TouchableOpacity onPress={()=>{setDatePickerVisibility(true)}}><View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center"}}>
                                    <TouchableOpacity onPress={()=>{setDatePickerVisibility(true)}}><TextInput style={{ width: 'auto', height:30 , fontSize:15, alignSelf:"center"}} editable={false} selectTextOnFocus={false}  placeholder="Date d'événement" placeholderTextColor="#a1a1a1"  ><Text>{!date?moment(eventDetails.startDate).format("YYYY/MM/DD") +" à "+ moment(eventDetails.startDate).hours()+":"+moment(eventDetails.startDate).minutes(): moment(date.toString()).format("YYYY/MM/DD") +" à "+ moment(date.toString()).hours()+":"+moment(date.toString()).minutes()}</Text></TextInput></TouchableOpacity>
                                </View></TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="datetime"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                                    <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center"}}>
                                    <AutocompleteDropdown
                                    ref={searchRef}
                                    controller={(controller) => {
                                        dropdownController.current = controller
                                    }}
                                    dataSet={suggestionsList}
                                    onChangeText={getSuggestions}
                                    onSelectItem={(item) => {
                                        item && setSelectedItem(item.title);
                                    }}
                                    debounce={900}
                                    suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
                                    // onClear={onClearPress}
                                    //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                                    // onOpenSuggestionsList={onOpenSuggestionsList}
                                    loading={loading}
                                    useFilter={false} // prevent rerender twice
                                    textInputProps={{
                                        placeholder: "Lieux d'évenement par ville",
                                        autoCorrect: true,
                                        autoCapitalize: "none",
                                        style: {

                                        }
                                    }}
                                    rightButtonsContainerStyle={{
                                        borderRadius: 25,
                                        right: 8,
                                        height: 30,
                                        top: 10,
                                        alignSelfs: "center",
                                        backgroundColor: "#383b42",
                                    }}

                                    inputContainerStyle={Platform.OS === 'ios'?{
                                        backgroundColor: "transparent",
                                    }: {
                                        backgroundColor: "transparent",
                                        paddingBottom: 45
                                    }}
                                    suggestionsListContainerStyle={{
                                        backgroundColor: "#383b42",
                                    }}
                                    containerStyle={{ flexGrow: 1, flexShrink: 1,  }}
                                    renderItem={(item, text) => (
                                        <Text style={{ color: "#fff", padding: 15 }}>{item.title}</Text>
                                    )}
                                    ChevronIconComponent={
                                        <Feather name="x-circle" size={18} color="#fff" />
                                    }
                                    ClearIconComponent={
                                        <Feather name="chevron-down" size={20} color="#fff" />
                                    }
                                    inputHeight={30}
                                    showChevron={false}
                                    //  showClear={false}
                                />
                                    </View>
                                    <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center" , zIndex: -1}}>
                                <TextInput style={{ width: 'auto', height:30 , fontSize:15, alignSelf:"flex-start"}} editable={true} selectTextOnFocus={true}  placeholder="Region" placeholderTextColor="#a1a1a1"  onChangeText={(region)=>{setLocationRegion(region)}}></TextInput>
                                    </View>
                                    <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center" ,zIndex: -1}}>
                                    <TextInput style={{ width: 'auto', height:30 , fontSize:15, alignSelf:"flex-start"}} editable={true} selectTextOnFocus={true}  placeholder="Nom" placeholderTextColor="#a1a1a1" onChangeText={(name)=>{setLocationName(name)}}></TextInput>
                                    </View>


                                </View>}

                                {editCategory&&<View style={{display:"flex", justifyContent:"center"}}>
                                    <Picker selectedValue={selectedCategory}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                setSelectedCategory(itemValue); setGenre(category[itemIndex].genre)}}

                                    >
                                        {category.map(c =>
                                            <Picker.Item label={c.genre} value={c.id} key={c.id}></Picker.Item>)}
                                    </Picker>

                                </View>}
                                <TouchableOpacity style={[styles.deconnect, {zIndex: -1}]} onPress={()=>{setModalVisible(false); setEditLocationDate(false); setEditCategory(false)}}><Text style={styles.btnText}>Valider</Text></TouchableOpacity>
                                <Pressable
                                    style={[styles.button]}

                                    onPress={() => {setModalVisible(false);setEditLocationDate(false); setEditCategory(false)}}
                                >
                                    <Ionicons name="close" size={32} color="green"  />
                                </Pressable>
                            </View>
                        </View>
                    </Modal>


                </View>
                <View style={styles.params}>



                    <View style={styles.duration}>
                        <Text style={styles.category}>Durée</Text>
                        <Text style={styles.desc}>120min</Text>
                    </View>
                    <View style={styles.social}>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{setEditVideo(true); pickVideo()}} style={{alignSelf:"center"}}><Text style={{ color:"#fff", fontWeight:"700"}}>Modifier la video</Text></TouchableOpacity>

                    {eventDetails.video || video1 ?<Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: video1? video1 :eventDetails.video,
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />: null}

                {(editTitle || editDesc ||editVideo || genre || editLocationDate ||selectedItem || locationName ||locationRegion) && !Edited && !loader?<TouchableOpacity onPress={()=> {Edit()}} style={[styles.deconnect, {marginBottom : 10}]}><Text style={styles.btnText}>Modifier</Text></TouchableOpacity> : loader ?  <TouchableOpacity disabled={true} style={[styles.deconnect, {marginBottom : 10}]}><ActivityIndicator size="small" color="white" /></TouchableOpacity>: null}
                        {Edited ?<TouchableOpacity disabled={true} style={[styles.deconnect, {marginBottom : 10}]}><Text style={styles.btnText}>Modification avec succés</Text></TouchableOpacity>: null}

            </View>

        )};
}



export default EditEvent;
const styles = StyleSheet.create({
    Container : {
        height:"88%",
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
        paddingTop : 20,
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
        height: 40,
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
        alignItems:"center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 120
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        paddingTop:40,
        width:"90%",
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
        fontSize:16,
        fontWeight: "500",
        color: "#fff"
    },deconnect : {
        marginTop: "3%",
        width : "90%",
        height: 36,
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        alignSelf:"center",
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
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    indicator : {
        position:"absolute",
        zIndex:9999,
        top:0,
        left:0,
        bottom: 0,
        right: 0,
        width: dimensions.get("window").width,
        height: dimensions.get("window").height,
        backgroundColor:"rgba(94,94,94,0.25)"
    }


})