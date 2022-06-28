import React, {useEffect, useState} from 'react'
import CheckBox from 'expo-checkbox'
import {View, StyleSheet, TouchableHighlight, Text, TextInput, Image, ActivityIndicator} from 'react-native'
import Loader from '../component/Loader';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import SignUpError from "../component/SignUpError";
import SignUpStepTwo from "./SignUpStepTwo";



const SignUpScreen = ({navigation}) => {
    const [userEmailError , setEmailError] = useState(null)
    const [userPasswordError , SetPasswordError] = useState(null)
    const [phoneError , setPhoneError] = useState(null)
    const [lNameError , SetLNameError] = useState(null)
    const [fNameError , SetFNameError] = useState(null)
    const [checkedError , setCheckedError] = useState(false)
      const [isChecked , setChecked] = useState(false);
      const [userFirstName , SetUserFirstName] = useState("");
      const [userLastName , SetUserLastName] = useState("");
      const [userEmail , SetEmail] = useState("");
      const [userPhoneNumber , SetPhoneNumber] = useState("");
      const [userPassword , SetUserPassword] = useState("");
      const [errorText , SetErrorText] = useState(""); 
      const [Loading , SetLoading] = useState(false);
    const [HttpResponse , SetHttpResponse] = useState(0);
    const [show , setShow] = useState(true)
    const [Error , SetError] = useState("");
    const [signUpDetails , SetSignUpDetails] = useState({});
    const [stepTwoOpened , setStepTwoOpened]= useState(false);
    var phoneno = /^\d{10}$/;

      const hundleSubmitPress = () => {

          setEmailError(null);
          setCheckedError(false);
          setPhoneError(null);
          SetFNameError(null);
          SetLNameError(null);
          SetPasswordError(null);
          if (!userEmail) {
              setEmailError("Veuillez saisir votre email");

          }else if (userEmail.length<=3 || !validate(userEmail)){
              setEmailError("Il faut respecter le fromat d'email");
              return;
          }
          if (!userPassword) {
              SetPasswordError("Veuillez saisir votre mot de passe");

          }else if (userPassword.length<6){
              SetPasswordError("Mot de passe doit dépasse 6 caractéres");
              return;
          }
          if (!userPhoneNumber) {
              setPhoneError("Veuillez saisir votre numéro de telephone");

          }else if (userPhoneNumber.length!=8){
              setPhoneError("Le numéro de télephone doit étre 8 numéros");
              return;
          }
          if (!userLastName) {
              SetLNameError("Veuillez saisir votre prénom");

          }else if (userLastName.length<3){
              SetLNameError("Votre prénom doit dépasse 3 caractéres");
              return;
          }
          if (!userFirstName) {
              SetFNameError("Veuillez saisir votre nom");

          }else if (userFirstName.length<3){
              SetFNameError("Votre nom doit dépasse 3 caractéres");
              return;
          }
          if (isChecked == false ){
              setCheckedError(true);
          }


          if (userEmailError!= null || userPasswordError!= null || phoneError!= null || lNameError!= null || fNameError!= null || checkedError)
              return;



          SetError("")
        SetErrorText("");
          SetHttpResponse(0);


          setTimeout(() => {

              setShow(false)

          }, 4000);




          if (!valid()){
              SetLoading(true);
      fetch('http://192.168.43.198:5555/api/v1/user/create',{method: 'POST' ,
        
        
        body: JSON.stringify({ username: userEmail, 
        firstname : userFirstName,
        lastname : userLastName,
        email : userEmail,
        password :userPassword
        })
        
        
        , headers : {
            'Accept': 'application/json',
            'content-type': 'application/json'}
        
        ,})
        .then(response => response.json())
        .then((responseJson) => {

            SetLoading(false);
            SetHttpResponse(responseJson.httpCode);
            SetError(responseJson.errors);
            setShow(true)
            if (!responseJson.status){
            const obj = {
                "id" : responseJson.id,
                "firstname" : userFirstName,
                "lastname": userLastName,
                "email" : userEmail,
                "username": userEmail,
                "password" :userPassword
            }
            SetSignUpDetails(obj);
            setTimeout(()=>{
            setStepTwoOpened(true);
            },2000)
            }
        }).catch((err) => {
            console.log(err)
          SetError(err.message);
          setShow(true);

        })
          }else{
              return;
          }



      }
    const valid = () => {
        return !userFirstName || !userLastName || !userPhoneNumber || !userEmail || !userPassword || checkedError;
    }

    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase())
    }
    if (stepTwoOpened){
        return <SignUpStepTwo signUpDetails={signUpDetails} navigation={navigation}/>
    }else{
    return(


        <View style={styles.container}>
            {HttpResponse != 0  || Error.length>0? <SignUpError http={HttpResponse} error ={Error} show={show}/> : null}
            <View>
                <Image style={styles.logoStyle} source={require('../assets/logo.png')}/>
            </View>
            <View style={styles.TextInputContainer}>
                {fNameError!=null && <View style={styles.fieldError}><Text style={styles.errors}>{fNameError}</Text></View>}
            <View style={styles.TextInputStyle}>
        <TextInput placeholderTextColor="#a1a1a1" style={styles.textInput} onChangeText={(userFirstName) => SetUserFirstName(userFirstName)} onChange={(fNameError) => SetFNameError(null)} placeholder="Saisir votre nom"/>{userFirstName.length<3?  <Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='red' /> : <Ionicons name='md-checkmark-circle' style={{marginRight : 10}} size={32} color='green' />}
        
        </View>
                {lNameError!=null && <View style={styles.fieldError}><Text style={styles.errors}>{lNameError}</Text></View>}
        <View style={styles.TextInputStyle}>
        <TextInput placeholderTextColor="#a1a1a1" style={styles.textInput} onChangeText={(userLastName) => SetUserLastName(userLastName)} placeholder="Saisir votre prenom" onChange={(lNameError) => SetLNameError(null)}/>{userLastName.length<3 ?  <Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='red' /> : <Ionicons name='md-checkmark-circle' style={{marginRight : 10}} size={32} color='green' />}
        </View>
                {phoneError!=null && <View style={styles.fieldError}><Text style={styles.errors}>{phoneError}</Text></View>}
        <View style={styles.TextInputStyle}>
        <TextInput placeholderTextColor="#a1a1a1" keyboardType="numeric" style={styles.textInput} onChangeText={(userPhoneNumber,) => SetPhoneNumber(userPhoneNumber)} onChange={(phoneError) => setPhoneError(null)} placeholder="Saisir votre numéro de telephone"/>{userPhoneNumber.length<8 ||  userPhoneNumber.length>=9?  <Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='red' /> : <Ionicons name='md-checkmark-circle' style={{marginRight : 10}} size={32} color='green' />}
        </View>
                {userEmailError!=null && <View style={styles.fieldError}><Text style={styles.errors}>{userEmailError}</Text></View>}
        <View style={styles.TextInputStyle}>
            <TextInput placeholderTextColor="#a1a1a1" style={styles.textInput} onChangeText={(userEmail) => SetEmail(userEmail)} onChange={(userEmailError) => setEmailError(null)} placeholder="Saisir votre email"/>{validate(userEmail) ?  <Ionicons name='md-checkmark-circle' style={{marginRight : 10}} size={32} color='green' />:  <Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='red' />}
        </View>
                {userPasswordError!=null && <View style={styles.fieldError}><Text style={styles.errors}>{userPasswordError}</Text></View>}
        <View style={styles.TextInputStyle}>
            <TextInput placeholderTextColor="#a1a1a1" style={styles.textInput} onChangeText={(userPassword) => SetUserPassword(userPassword)} onChange={(userPassword) => SetPasswordError(null)} placeholder="Saisir votre mot de passe" secureTextEntry={true} />{userPassword.length<=6 ?  <Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='red' /> : <Ionicons name='md-checkmark-circle' style={{marginRight : 10}} size={32} color='green' />}

        
        </View>
        <View style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
            {checkedError ?<CheckBox value={isChecked} onValueChange={setChecked} style={{borderColor:"red"}} /> : <CheckBox value={isChecked} onValueChange={setChecked} /> }
        </View>
        <View >
        <Text style={styles.TextCheck}>Accepter nos
        <Text style={styles.linkText}> politique et 
            confidentialité </Text></Text>
        </View>
        </View>
        
        </View>




        {/* Button S'inscrire */}
        <TouchableHighlight

        onPress={hundleSubmitPress}
            style={styles.suiv}
            underlayColor='#fff'>
            {Loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{color:"#fff",fontWeight:"bold", fontSize:18 }}>1/2 Continuer</Text>}
        </TouchableHighlight>
     
        


   </View>
  )}


}
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
export default SignUpScreen;