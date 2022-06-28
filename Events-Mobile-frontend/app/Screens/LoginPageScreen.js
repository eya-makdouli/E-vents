import React, {useState} from 'react'
import {View , StyleSheet, TouchableHighlight, Text , TextInput ,Image,ActivityIndicator } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginError from "../component/LoginError";
import AsyncStorage from '@react-native-async-storage/async-storage';




const LoginPageScreen = ({navigation}) => {


         const [userEmail , SetEmail] = useState("");
         const [userPassword , SetUserPassword] = useState("");
         const [userEmailError , setEmailError] = useState(null)
        const [userPasswordError , SetPasswordError] = useState(null)
        const [Loading , SetLoading] = useState(false);
        const [show , setShow] = useState(true)
        const [HttpResponse , SetHttpResponse] = useState(0);
        const [Error , SetError] = useState("");

    const storeToken = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@token', jsonValue)
        } catch (e) {
        }
    }

    const storeUserData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@user', jsonValue).done();
        } catch (e) {
        }
    }


    const GetUserDetails = async () => {
        if (userEmail.includes("@")) {
            await fetch('http://192.168.43.198:5555/api/v1/user/username/' + userEmail, {
                method: 'GET'
                , headers: {
                    'Accept': 'application/json',
                }
            })
                .then(response => response.json())
                .then((responseJS) => {
                    SetLoading(false);
                    storeUserData(responseJS);
                }).catch((err) => {
                    SetError(err.message);
                })
        }else{
            await fetch('http://192.168.43.198:5555/api/v1/user/username/' + userEmail, {
                method: 'GET'
                , headers: {
                    'Accept': 'application/json',
                }
            })
                .then(response => response.json())
                .then((responseJS) => {
                    SetLoading(false);
                    storeUserData(responseJS);
                }).catch((err) => {
                    SetError(err.message);
                })
        }
    }

      const hundleSubmitPress = async () => {
          GetUserDetails();

          if (!userEmail) {
              setEmailError("Veuillez saisir votre e-mail");

          } else if (userEmail.length <= 3) {
              setEmailError("Email doit étre plus que 3 caractéres");
              return;
          }
          if (!userPassword) {
              SetPasswordError("Veuillez saisir votre mot de passe");
              return;
          } else if (userPassword.length < 6) {
              SetPasswordError("Mot de passe doit étre plus que 6 caractéres");
              return;
          }
          if (userEmailError != null)
              return;
          else if (userPasswordError != null)
              return;


          SetError("");
          SetHttpResponse(0);


          setTimeout(() => {

              setShow(false)

          }, 4000);


          SetLoading(true);

          await fetch('http://192.168.43.198:5555/user/login', {
              method: 'POST',


              body: JSON.stringify({
                  username: userEmail,
                  password: userPassword
              })


              , headers: {
                  'Accept': 'application/json',
                  'content-type': 'application/json'
              }

              ,
          })
              .then(response => response.json())
              .then((responseJson) => {
                  SetLoading(false);
                  SetHttpResponse(responseJson.status);
                  storeToken(responseJson.access_token);
                  setShow(true);
                  if (responseJson.status == null)
                      navigation.reset({
                          index: 0,
                          routes: [{ name: "homeScreen" }],
                      })
              }).catch((err) => {
                  SetError(err.message);
                  setShow(true);
              })

      }





    return(

        <View style={styles.container}>
            {HttpResponse != 0  || Error.length>0? <LoginError http={HttpResponse} error ={Error} show={show}/> : null}
            <View>
                <Image style={styles.logoStyle} source={require('../assets/logo.png')}/>
            </View>
            <View style={styles.TextInputContainer}>
                {userEmailError!=null && <View style={styles.fieldError}><Text style={styles.errors}>{userEmailError}</Text></View>}
        <View style={styles.TextInputStyle}>
        <TextInput placeholderTextColor="#a1a1a1" style={styles.textInput} onChangeText={(userEmail) => SetEmail(userEmail)} onChange={(userEmailError) => setEmailError(null)} placeholder="Saisir votre email"/>{userEmail.length<=3 ?  <Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='red' /> :  <Ionicons name='md-checkmark-circle' style={{marginRight : 10}} size={32} color='green' />}
        </View>

                {userPasswordError!=null &&  <View style={styles.fieldError}><Text style={styles.errors}>{userPasswordError}</Text></View>}
        <View style={styles.TextInputStyle}>
        <TextInput placeholderTextColor="#a1a1a1" style={styles.textInput} onChangeText={(userPassword) => SetUserPassword(userPassword)} onChange={(userPasswordError) => SetPasswordError(null)} placeholder="Saisir votre mot de passe" secureTextEntry={true} />{userPassword.length<6 ?  <Ionicons name='md-alert-circle' style={{marginRight : 10}} size={32} color='red' /> : <Ionicons name='md-checkmark-circle' style={{marginRight : 10}} size={32} color='green' />}
        </View>
        <View style={styles.checkboxContainer}>
        <View >
        <Text style={styles.TextCheck}>Vous avez pas un compte
        <Text style={styles.linkText} onPress={()=> navigation.navigate("SignupScreen")}> s'inscrire </Text></Text>
        </View>
        </View>
        
        </View>




        {/* Button S'inscrire */}
        <TouchableHighlight
        onPress={hundleSubmitPress}
            style={styles.suiv}
            underlayColor='#fff'>
            {Loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{color:"#fff",fontWeight:"bold", fontSize:18 }}>Se Connecter</Text>}
        </TouchableHighlight>

        


   </View>
  )


}
const styles = StyleSheet.create({
    errors: {
      fontSize:12,
      color:"#8b0000"
    },
    TextCheck: {
        
    },
    logoStyle: {
        width:229,
         height:95,
        marginBottom:55
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
    fieldError : {
       width:"100%",
        marginLeft:10
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

         height : 180,
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
export default LoginPageScreen;