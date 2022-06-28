import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    ActivityIndicator, Alert,
    Button,
    Dimensions,
    Image, Modal, Platform, Pressable,
    ScrollView,
    StyleSheet, Switch,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {Feather, Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import dimensions from "react-native-web/dist/exports/Dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {TouchableOpacity} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import StaffCard from "./SaffCard";
import {Video} from "expo-av";
import {Touchable} from "react-native-web";


const CreateEvent = ({category, user}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const [date, setDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [image, setImage] = useState(null);
    const [imageBack, setImageBack] = useState(null);
    const [eventName , SetEventName]= useState(null);
    const [eventDesc,SetEventDesc]= useState(null)
    const [locations , setLocations]= useState(null);
    const [appLoading , setAppLoading] = useState(false);
    const [added , setAdded] = useState(null);
    const [newUser , setNewUser]= useState(null);
    const [link, setLink]= useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedJob ,setSelectedJob]= useState(null);
    const [jobs , setJob]= useState([]);
    const [selectedStaff , setSelectedStaff]= useState(false);
    const [likedStaff , setLikedStaff]= useState({});
    const [usersPerService , setUsersPerService]= useState([])
    const [allStaffJobs , setAllStaffJobs]= useState([])
    const [check , setCheck]= useState(false);
    const [video , setVideo] = useState(null)
    const videos = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [need1, setNeed1] = React.useState(null);
    const [need2, setNeed2] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [locationRegion, setLocationRegion] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [picture , setPicture] = useState(null);
    const [errorDate , setErrorDate]= useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [index , setIndex]= useState(0);
    const toggleSwitch = () => {setIsPrivate(previousState => !previousState)};
    const [selectedCategory ,setSelectedCategory]= useState(0);

    const handleUpData = async (photo) => {
        const formData = new FormData();
        let base64Img = `data:image/jpg;base64,${photo.base64}`;

            formData.append('file', base64Img);
            formData.append('upload_preset', 'Events');
             formData.append("cloud_name", "dgatphkpd")

        const data = await fetch('https://api.cloudinary.com/v1_1/dgatphkpd/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json()).then(res => console.log(res));
    }



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


    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/category/"+selectedCategory);
        const job = await response.json();
        console.log(job);
        if(job.staffJobs.length<=0){
            console.log("if worked");
        const res = await fetch("http://192.168.43.198:5555/api/v1/staffjob/all");
        const j = await res.json();
        console.log(j);
        setJob(j);
        }else{
            setJob(job.staffJobs);
        }
    },[selectedCategory])

    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staffjob/all");
        const job = await response.json();
        setAllStaffJobs(job);
    },[selectedCategory])

    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staff/staffjob/"+selectedJob);
        const user = await response.json()
        user.length=1;
        setUsersPerService(user);
    },[selectedJob]);

    const storeUserData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@user', jsonValue).done();
        } catch (e) {
        }
    }

    useEffect(async ()=>{
        const response =await fetch("http://192.168.43.198:5555/api/v1/user/id/"+user.id);
        setNewUser(await response.json());
    },[]);


    const hundleSubmitPress = async () => {


        setAppLoading(true);
        if(selectedType !=="enligne") {
            if(!image || !imageBack  || !locations || !eventDesc || !eventName || !date || !endDate ){
                setCheck(true);
                setAppLoading(false);
                return;
            }else if (date > endDate && date < new Date()){
                setErrorDate(true);
                setAppLoading(false);
                return
            }
            await fetch('http://192.168.43.198:5555/api/v1/location/create', {
                method: 'POST',


                body: JSON.stringify({
                    city : selectedItem,
                    region : locationRegion,
                    name : locationName
                })


                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }

                ,
            })
                .then( response => response.json())
                .then( async (resp) => {
                    await fetch('http://192.168.43.198:5555/api/v1/event/create', {
                        method: 'POST',


                        body: JSON.stringify({
                            eventName : eventName,
                            description : eventDesc,
                            startDate : new Date(date),
                            picture : image.toString(),
                            isPrivate : isPrivate,
                            type: selectedType,
                            backgroundImage: imageBack.toString(),
                            video : video?video.toString():null,
                            endDate: new Date(endDate),
                            location :{
                                id : resp.id
                            },
                            category : {id : parseInt(selectedCategory)}
                        })


                        , headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        }

                        ,
                    })
                        .then( response => response.json())
                        .then( async (responseJson) => {
                            if (responseJson) {
                            }
                            if(selectedStaff){
                            await fetch('http://192.168.43.198:5555/api/v1/recruitment/create', {
                                method: 'POST',


                                body: JSON.stringify({
                                    user : {id : likedStaff.user.id},
                                    org : {id :user.id},
                                    price : price,
                                    staffJob: {id :likedStaff.staffJob.id},
                                    event: {id : responseJson.id},
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

                                });
                            }


                            // setTimeout(() => {
                            //
                            //     setAdded(null)
                            //
                            // }, 4000)

                            await fetch('http://192.168.43.198:5555/api/v1/organisateur/create', {
                                method: 'POST',
                                body: JSON.stringify({
                                    user : [{id : user.id}],
                                    events : [{id : parseInt(responseJson.id)}],
                                })
                                , headers: {
                                    'Accept': 'application/json',
                                    'content-type': 'application/json'
                                }

                                ,
                            }).then( resultat => resultat.json())
                                .then(async (resultat)=> {

                                    await fetch('http://192.168.43.198:5555/api/v1/event/update/'+responseJson.id, {
                                        method: 'PUT',


                                        body: JSON.stringify({
                                            ...responseJson,
                                            organisateur : {id: resultat.id}

                                        })


                                        , headers: {
                                            'Accept': 'application/json',
                                            'content-type': 'application/json'
                                        }

                                        ,
                                    }).then( r => { r.json() })
                                        .then( (r) => {

                                        })


                                    resultat.id ? setAdded(true): setAdded(false);





                                    setNewUser(newUser.organisateur.push({id : parseInt(resultat.id)}));
                                    await fetch('http://192.168.43.198:5555/api/v1/user/update/'+user.id, {
                                        method: 'PUT',


                                        body: JSON.stringify({
                                            ...newUser
                                        })


                                        , headers: {
                                            'Accept': 'application/json',
                                            'content-type': 'application/json'
                                        }

                                        ,
                                    }).then( res => { res.json() })
                                        .then(async (res) => {
                                            if (res){
                                            }


                                            setTimeout(() => {

                                                setAdded(null)

                                            }, 4000)})}

                                ).catch((e)=> {setTimeout(() => {

                                    setAdded(false)

                                }, 4000); return})
                        }).catch((err) => {
                            setAdded(false);
                        })

                });
        }else{
            if(!image || !imageBack  || !link || !eventDesc || !eventName || !date || !endDate){
                setCheck(true);
                setAppLoading(false);
                return;
            }
            // else if (date < endDate){
            //     setErrorDate(true);
            //     setAppLoading(false);
            //     return
            // }
            await fetch('http://192.168.43.198:5555/api/v1/event/create', {
                method: 'POST',


                body: JSON.stringify({
                    eventName : eventName,
                    description : eventDesc,
                    endDate: new Date(endDate),
                    startDate : new Date(date),
                    isPrivate : isPrivate,
                    picture : image.toString(),
                    link:link,
                    type: selectedType,
                    video : video?video.toString(): null,
                    backgroundImage: imageBack.toString(),
                    category : {id : parseInt(selectedCategory)}
                })


                , headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }

                ,
            })
                .then( response => response.json())
                .then( async (responseJson) => {
                    if (responseJson) {
                    }


                    // setTimeout(() => {
                    //
                    //     setAdded(null)
                    //
                    // }, 4000)

                    await fetch('http://192.168.43.198:5555/api/v1/organisateur/create', {
                        method: 'POST',
                        body: JSON.stringify({
                            user : [{id : user.id}],
                            events : [{id : parseInt(responseJson.id)}],
                        })
                        , headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        }

                        ,
                    }).then( resultat => resultat.json())
                        .then(async (resultat)=> {

                            await fetch('http://192.168.43.198:5555/api/v1/event/update/'+responseJson.id, {
                                method: 'PUT',


                                body: JSON.stringify({
                                    ...responseJson,
                                    organisateur : {id: resultat.id}

                                })


                                , headers: {
                                    'Accept': 'application/json',
                                    'content-type': 'application/json'
                                }

                                ,
                            }).then( r => { r.json() })
                                .then( (r) => {

                                })


                            resultat.id ? setAdded(true): setAdded(false);





                            setNewUser(newUser.organisateur.push({id : parseInt(resultat.id)}));
                            await fetch('http://192.168.43.198:5555/api/v1/user/update/'+user.id, {
                                method: 'PUT',


                                body: JSON.stringify({
                                    ...newUser
                                })


                                , headers: {
                                    'Accept': 'application/json',
                                    'content-type': 'application/json'
                                }

                                ,
                            }).then( res => { res.json() })
                                .then(async (res) => {
                                    if (res){
                                    }


                                    setTimeout(() => {

                                        setAdded(null)

                                    }, 4000)})}

                        ).catch((e)=> {setTimeout(() => {

                            setAdded(false)

                        }, 4000); return})
                }).catch((err) => {
                    setAdded(false);
                })
        }
        setAppLoading(false);


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


    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleEndConfirm = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

    const [loading, setLoading] = useState(false)
    const [suggestionsList, setSuggestionsList] = useState(null)
    const dropdownController = useRef(null)
    const searchRef = useRef(null)

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


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    const pickImageBack = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageBack(result.uri);
        }
    };

    const [selectedType ,setSelectedType]= useState("enligne");
    if(!newUser){
            return <View style={{flex:1}}></View>
    }else{
        return (
            <ScrollView style={{backgroundColor:"#fff", height:"100%"}}>
                <View>
                    <Picker selectedValue={selectedType}
                            onValueChange={(itemValue, itemIndex) =>{
                                setSelectedType(itemValue); setLink(null)}}

                    >
                        <Picker.Item label={"En Ligne"} value={"enligne"} key={0}></Picker.Item>
                        <Picker.Item label={"Présentiel"} value={"Présentiel"} key={1}></Picker.Item>
                    </Picker>
                    <View style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", marginTop: 10, marginBottom:10}}>
                    <Text style={!isPrivate&&{color: "#004869", fontWeight:"700"}}>Èvenement publique</Text><Switch  trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={isPrivate ? "#67f54b" : "#f4f3f4"} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isPrivate}/><Text style={isPrivate&&{color: "#004869", fontWeight:"700"}}>Èvenement Privé</Text>
                    </View>
                </View>
                {!locations && check&& selectedType !== "enligne" && <View style={styles.fieldError}><Text style={styles.errors}>Veuillez selectionné une location</Text></View>}
                {selectedType !== "enligne" ?<View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start", zIndex:9999}}>
                    <AutocompleteDropdown
                    ref={searchRef}
                    controller={(controller) => {
                        dropdownController.current = controller
                    }}
                    dataSet={suggestionsList}
                    onChangeText={getSuggestions}
                    onSelectItem={(item) => {
                        item && setSelectedItem(item.title)
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
                    inputHeight={50}
                    showChevron={false}
                    //  showClear={false}
                />
                    <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center" , zIndex: -1}}>
                        <TextInput style={{ width: 'auto', height:30 , fontSize:15, alignSelf:"flex-start"}} editable={true} selectTextOnFocus={true}  placeholder="Region" placeholderTextColor="#a1a1a1"  onChangeText={(region)=>{setLocationRegion(region)}}></TextInput>
                    </View>
                    <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center" ,zIndex: -1}}>
                        <TextInput style={{ width: 'auto', height:30 , fontSize:15, alignSelf:"flex-start"}} editable={true} selectTextOnFocus={true}  placeholder="Nom" placeholderTextColor="#a1a1a1" onChangeText={(name)=>{setLocationName(name)}}></TextInput>
                    </View>
                </View>: <View>
                    <TouchableOpacity style={{marginLeft:20, marginBottom:10, backgroundColor:"#6c6c6c", width:250, display:"flex" ,padding : "2%", flexDirection:"row", justifyContent:"space-evenly"}} onPress={()=>WebBrowser.openBrowserAsync("https://meet.google.com/new")}><Text style={{color:"#fff"}}>Génerer un Google Meet code </Text><Image style={{height:20, width:20}} source={require("../assets/googlem.png")}/></TouchableOpacity>
                    {!link && check&& <View style={styles.fieldError}><Text style={styles.errors}>Veuillez génerer un lien Google Meet</Text></View>}
                    <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                    <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Lien de l'évenement sur Google meet" placeholderTextColor="#a1a1a1" editable={true}  onChangeText={(link) => setLink(link)}/>
                </View></View>}
                {!eventName && check&& <View style={styles.fieldError}><Text style={styles.errors}>Veuillez saisir le nom d'évenement</Text></View>}
                <View style={Platform.OS === 'ios'?{marginBottom: 9,alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto"  , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}: {marginBottom: 9,alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto"  , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                    <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Nom d'événement" placeholderTextColor="#a1a1a1" onChangeText={(eventName) => SetEventName(eventName)}  />
                </View>
                {!eventDesc && check&& <View style={styles.fieldError}><Text style={styles.errors}>Veuillez écrire une déscription pour votre événement</Text></View>}
                <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                    <TextInput multiline={true} numberOfLines={4} style={{ width: 'auto', height:50 , fontSize:15}} placeholder="Description de l'évenement" placeholderTextColor="#a1a1a1" editable={true} selectTextOnFocus={false}  onChangeText={(eventDesc) => SetEventDesc(eventDesc)}/>
                </View>
                <Picker selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>{
                            setSelectedCategory(itemValue);
                            setIndex(itemIndex);
                        }
                }

                >
                    {category.map(c =>
                        <Picker.Item label={c.genre} value={c.id} key={c.id}></Picker.Item>)}
                </Picker>

                <View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                {!date && check&& <View style={styles.fieldError}><Text style={styles.errors}>Veuillez ajouter une date de votre évenement</Text></View>}
                {errorDate && <View style={styles.fieldError}><Text style={styles.errors}>La date de debut doit être superieur a la date de la fin </Text></View>}
                <TouchableOpacity onPress={showDatePicker}><View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center"}}>
                    <TextInput style={{ width: 'auto', height:30 , fontSize:15, alignSelf:"center"}} editable={false} selectTextOnFocus={false}  placeholder="Date d'événement" placeholderTextColor="#a1a1a1"  ><Text>{date?moment(date.toString()).format("YYYY/MM/DD") + "  "+moment(date.toString()).hour()+" : "+moment(date.toString()).minutes() : null}</Text></TextInput>
                </View></TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleEndConfirm}
                    onCancel={hideEndDatePicker}
                />
                {!endDate && check&& <View style={styles.fieldError}><Text style={styles.errors}>Veuillez ajouter une date fin de votre évenement</Text></View>}
                <TouchableOpacity onPress={showEndDatePicker}><View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center"}}>
                    <TextInput style={{ width: 'auto', height:30 , fontSize:15, alignSelf:"center"}} editable={false} selectTextOnFocus={false}  placeholder="Date d'événement" placeholderTextColor="#a1a1a1"  ><Text>{endDate?moment(endDate.toString()).format("YYYY/MM/DD")+ "  " +moment(endDate.toString()).hour()+" : "+moment(endDate.toString()).minutes() : null}</Text></TextInput>
                </View></TouchableOpacity>

                {!image && check&& <View style={styles.fieldError}><Text style={styles.errors}>Veuillez sélectionner une image de votre évenement</Text></View>}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10  }}>
                    {image?<TouchableOpacity onPress={pickImage} ><Text>Modifier l'image</Text></TouchableOpacity> : <TouchableOpacity title="Importer une Image" onPress={pickImage}><Text>Importer une Image</Text></TouchableOpacity>}
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                {!imageBack && check&& <View style={styles.fieldError}><Text style={styles.errors}>Veuillez sélectionner une image de background de votre évenement</Text></View>}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10  }}>
                    {imageBack ? <TouchableOpacity  onPress={pickImageBack} ><Text>Modifier l'affiche</Text></TouchableOpacity>: <TouchableOpacity  onPress={pickImageBack} ><Text>Importer une affiche</Text></TouchableOpacity>}
                    {imageBack && <Image source={{ uri: imageBack }} style={{ width: 200, height: 200 }} />}
                </View>


                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:10 }}>
                    {video ? <TouchableOpacity onPress={pickVideo} ><Text>Modifier la video</Text></TouchableOpacity>: <TouchableOpacity onPress={pickVideo} ><Text>Importer une video</Text></TouchableOpacity>}
                    {video &&  <Video
                        ref={videos}
                        style={styles.video}
                        source={{uri :video}}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />}
                </View>



                {selectedStaff&&<View style={{marginTop: 40,backgroundColor: "rgba(0,173,97,0.9)", padding: 10, minHeight: 100 , width:"100%" ,marginBottom: 20, borderRadius:10 ,display:"flex", alignSelf:"flex-start", flexDirection:"row" , alignItems:"center"}}><Image style={{height:47, width:47, borderRadius:100}} source={{ uri : likedStaff.user.picture}}/><View style={{display:"flex", flexDirection:"column", marginLeft: 20}}><Text style={{fontWeight:"700", color:"#fff"}}>{likedStaff.user.firstname + " " + likedStaff.user.lastname}</Text><Text style={{fontWeight:"700", color:"#fff"}}>{likedStaff.staffJob.nameService}</Text><Text style={{ color:"#fff"}}>{likedStaff.user.location.city}</Text></View><TouchableOpacity style={{position: "absolute", top:5, right: 5}}></TouchableOpacity><Text style={{position:"absolute", top:5 , left:5,fontWeight:"300", color:"#fff", fontSize:12}}>Staff Selectionné</Text></View>}
                {selectedType !=="enligne"&&<TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{marginLeft:20, marginBottom:10, marginTop: 20 , backgroundColor:"#6c6c6c", width:250, display:"flex" ,padding : "2%", flexDirection:"row", justifyContent:"center", alignSelf:"center"}}><Text style={{color:"#fff"}}>Recruter un staff </Text></TouchableOpacity>}

                <Modal
                    scrollHorizontal={true}
                    propagateSwipe={true}
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
                            {!selectedStaff &&<Picker  selectedValue={selectedJob}
                                    onValueChange={(itemValue, itemIndex) =>{
                                        setSelectedJob(itemValue)
                                    }
                            }
                                    style={styles.picker}

                            >
                                {jobs&&jobs.map(j =>
                                    <Picker.Item label={j.nameService} value={j.id} key={j.id}></Picker.Item>)}
                            </Picker>}
                            {!selectedStaff?<ScrollView style={{width : "100%"}}>
                                {usersPerService.map(u =>
                                    <TouchableOpacity onPress={()=>{u.available&&setSelectedStaff(true);u.available&&setLikedStaff(u) ; }}>
                                        <StaffCard user={u} currentUser={user.id}/></TouchableOpacity>

                                )}
                            </ScrollView>: <View style={{marginTop: 40,backgroundColor: "rgba(0,173,97,0.9)", padding: 10, minHeight: 100 , width:"100%" ,marginBottom: 20, borderRadius:10 ,display:"flex", alignSelf:"flex-start", flexDirection:"row" , alignItems:"center"}}><Image style={{height:47, width:47, borderRadius:100}} source={{ uri : likedStaff.user.picture}}/><View style={{display:"flex", flexDirection:"column", marginLeft: 20}}><Text style={{fontWeight:"700", color:"#fff"}}>{likedStaff.user.firstname + " " + likedStaff.user.lastname}</Text><Text style={{fontWeight:"700", color:"#fff"}}>{likedStaff.staffJob.nameService}</Text><Text style={{ color:"#fff"}}>{likedStaff.user.location.city}</Text></View><TouchableOpacity style={{position: "absolute", top:5, right: 5}} onPress={()=> {setSelectedStaff(false); setLikedStaff({})}}><Ionicons name="close" size={24} color="#fff"  /></TouchableOpacity><Text style={{position:"absolute", top:5 , left:5,fontWeight:"300", color:"#fff", fontSize:12}}>Staff Selectionné</Text></View>}
                            {selectedStaff && selectedJob== 2095 && <View style={{width : "100%",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                                    <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Nombre des chaises" placeholderTextColor="#a1a1a1" onChangeText={(need1) => setNeed1(need1)}/>
                                </View>}
                            {selectedStaff && selectedJob== 2095 &&<View style={{width : "100%",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                                <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Nombre des tables" placeholderTextColor="#a1a1a1" onChangeText={(need2) => setNeed2(need2)}/>
                            </View>}
                            {selectedStaff && <View style={{width : "100%",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                                <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Prix proposé" placeholderTextColor="#a1a1a1" onChangeText={(price) => setPrice(price)}/>
                            </View>}



                            <Pressable
                                style={[styles.button]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Ionicons name="close" size={32} color="green"  />
                            </Pressable>


                            <View style={{width: "90%", justifyContent:"center" , alignSelf:"center"}}>
                                {selectedStaff && <TouchableOpacity style={styles.deconnect} onPress={()=>{ setModalVisible(false)}}  >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Sélectionner le staff</Text>}</TouchableOpacity>}
                            </View>

                        </View>
                    </View>
                </Modal>




                {/*<View>*/}
                {/*<Pressable onPress={()=>handleUpData(image)}><Text>Upload</Text></Pressable>*/}
                {/*</View>*/}
                {added===true &&<View style={styles.success}><Text style={{color:"#fff"}}>Evenement créé</Text></View>}
                {added===false &&<View style={styles.error}><Text style={{color:"#fff"}}>Evenement non créé</Text></View>}
                <View style={{width:"100%", display:"flex" , flexDirection:"row", justifyContent:"space-evenly" ,height:60,alignItems: "center", marginTop:20}}>
                    <TouchableHighlight
                        style={{backgroundColor:"#00AD61" , width:147 , height: 37 , borderRadius: 10 , display:"flex", justifyContent:"center" , alignItems: "center"}}
                        underlayColor='#fff' onPress={() =>hundleSubmitPress()} >
                        {appLoading? <ActivityIndicator size="small" color="white" />  : <Text style={{color:"#fff",fontWeight:"bold", fontSize:18 }}>Créer</Text>}
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{backgroundColor:"#111111" , width:147 , height: 37 , borderRadius: 10 , display:"flex", justifyContent:"center" , alignItems: "center"}}
                        underlayColor='#fff' >
                        <Text style={{color:"#fff",fontWeight:"bold", fontSize:18 }}>Annuler</Text>
                    </TouchableHighlight>

                </View>

            </ScrollView>
        )
}}

export default CreateEvent;
const styles= StyleSheet.create({
container : {
    alignItems:"flex-start",
    justifyContent:"flex-start"
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
    },
    success : {
    marginTop: 20,
        marginBottom: 10,
        height : "auto",
        width : "90%",
        borderRadius: 5,
        backgroundColor: "#00AD61",
        display: "flex",
        justifyContent: "flex-start",
        padding: 10,
        alignSelf:"center",
    },
    error : {
        height : "auto",
        width : "90%",
        borderRadius: 5,
        backgroundColor: "#cb0000",
        display: "flex",
        justifyContent: "flex-start",
        padding: 10,
        alignSelf:"center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 3,
        backgroundColor: "white",
        borderRadius: 20,
        padding: "3%",
        width: "90%",
        height : "auto",
        maxHeight :"90%",
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
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    picker: {
        width: "100%"
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
    },
    errors: {
        fontSize:12,
        color:"#8b0000"
    },
    fieldError : {
        width:"90%",
        marginLeft:10,
        alignSelf:"center",
        paddingBottom:5
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
    }

});