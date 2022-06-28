import React, {useCallback, useRef, useState} from 'react'
import {Button, Dimensions, Image, Platform, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {Feather} from "@expo/vector-icons";


const SignUpStepTwo = ({signUpDetails, navigation}) => {
    const [user , setUser]= useState(signUpDetails);
    const [image, setImage] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const [locations , setLocations]= useState(null);
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [region, setRegion] = useState(null)
    const [zipCode, setZipCode] = useState(null)
    const [bios, setBio] = useState(null);
    const dropdownController = useRef(null);

    const signUp = async () =>{
        await fetch('http://192.168.43.198:5555/api/v1/location/create', {
            method: 'POST',


            body: JSON.stringify({
                region : region,
                city : locations[0].city,
                zipCode : zipCode,
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
                    console.log("Location Created");
                    await fetch('http://192.168.43.198:5555/api/v1/user/update/'+user.id, {
                        method: 'PUT',


                        body: JSON.stringify({
                            ...user,
                            picture : image.toString(),
                            location : {id :responseJson.id},
                            bio : bios,
                        })


                        , headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        }

                        ,
                    }).then( res => { res.json() })
                        .then(async (res) => {
                        navigation.replace("LoginScreen");
                        });




                }})
    }



    const getSuggestions = useCallback(async (q) => {
        if (typeof q !== "string" || q.length < 1) {
            setSuggestionsList(null)
            return
        }
        setLoading(true)
        const response = await fetch("http://192.168.43.198:5555/api/v1/location/citylike/"+q)
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
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return(
        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {image?<Button title="Modifier l'image" onPress={pickImage} /> : <Button title="Importer une Image" onPress={pickImage} />}
                {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:100,shadowOffset: {width: 2,height: 2,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 }} /> : <View style={{ width: 200, height: 200, borderRadius:100 ,shadowOffset: {width: 2,height: 2,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1, backgroundColor:"#ffffff"}}></View>}
            </View>
            <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start", zIndex:9999, marginTop:30}}>
                <AutocompleteDropdown
                    ref={searchRef}
                    controller={(controller) => {
                        dropdownController.current = controller
                    }}
                    dataSet={suggestionsList}
                    onChangeText={getSuggestions}
                    onSelectItem={(item) => {
                        item && setSelectedItem(item.id)
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
            </View>
            <View style={Platform.OS === 'ios'?{marginBottom: 9,alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto"  , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}: {marginBottom: 9,alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto"  , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="Region" placeholderTextColor="#a1a1a1" onChangeText={(region) => setRegion(region)}  />
            </View>
            <View style={Platform.OS === 'ios'?{marginBottom: 9,alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto"  , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}: {marginBottom: 9,alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto"  , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                <TextInput style={{ width: 'auto', height:30 , fontSize:15}} placeholder="zipCode" placeholderTextColor="#a1a1a1" onChangeText={(zipcode) => setZipCode(zipcode)}  />
            </View>
            <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                <TextInput multiline={true} numberOfLines={4} style={{ width: 'auto', height:70 , fontSize:15}} placeholder="Saisir votre Bio..." placeholderTextColor="#a1a1a1"  onChangeText={(bios) => setBio(bios)}/>
            </View>






            {/* Button S'inscrire */}
            <TouchableHighlight

                onPress={signUp}
                style={styles.suiv}
                underlayColor='#fff'>
                 <Text style={{color:"#fff",fontWeight:"bold", fontSize:18 }}>S'inscrire</Text>
            </TouchableHighlight>




        </View>
    );
}
export default SignUpStepTwo;

const styles = StyleSheet.create({
    TextCheck: {

    },
    logoStyle: {
        width:229,
        height:95
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width:"90%",



    },
    checkbox : {
        display : "flex",
        width : "auto",

    },
    normalText: {
        fontWeight:"bold",
        display: "flex",
    },
    linkText: {
        color: '#004869',
        fontWeight:"bold",

    },

    textInput: {
        height: 'auto',
        width: "80%",
        fontSize: 15,
        display : "flex",
        flexDirection : "row",
        marginLeft : 20,
    },
    TextInputContainer: {

        height : 350,
        width :"auto",
        display : "flex",
        flexDirection : "column",
        justifyContent : "space-evenly",
        position : "relative"

    },
    TextInputStyle : {

        width :345,
        height:51 ,
        borderRadius:22,
        display: "flex",
        flexDirection : "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:"#F5F5F5"

    },
    fieldError : {
        width:"100%",
        marginLeft:10
    },
    errors: {
        fontSize:12,
        color:"#8b0000"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        overflow: "hidden",

    },
    demi_cercle: {
        height:500,
        width:500,
        backgroundColor: "#F8CECF",

        transform : ([{rotate:'45deg'}]),
        position: 'absolute',
        top: -150,
        left: -100,
        borderBottomRightRadius:1000,



    },
    img_start : {
        opacity:1,
        width:280,
        height:200,
        top:0,
        right:5



    },
    bien : {
        marginTop:100,
    },
    lines_container : {
        display:"flex",
        flexDirection: "row",
        width:309, height: 30,
        marginTop:-100,
        alignItems: 'center',
        justifyContent: 'center',
        top:45

    },
    suiv : {
        backgroundColor:"#00AD61",
        opacity: 0.7,
        width:244,
        height:65,
        top:25,
        borderRadius:30,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    }

});