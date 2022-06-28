import React, {useState, useEffect} from 'react'
import { StyleSheet, View,Image,Text,Button, TouchableHighlight ,Dimensions,TextInput,LogBox,ImageBackground, Picker,ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
const CreateEventBody= ()=> {
    const [date,setDate] = useState(new Date());
    const [selectedValue, setSelectedValue] = useState("java");
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])
    const [image, setImage] = useState(null);
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
    
  return (
     
    <LinearGradient style={styles.container} blurRadius={500} colors={['#F9F9F9','#e1e1e1']}>
         <ScrollView style={{height:900}}>
             <View style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
        <View style={{borderRadius:7,backgroundColor: "#F5F5F5",padding:10 ,marginBottom:5,height: "auto" , width:"90%" ,shadowOffset: {width: 2,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
          <TextInput style={{ width: 'auto', height:30 , fontSize:18}} placeholder="Nom d’évenement" />
          </View>
          <View style={{borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto",marginBottom:5 , width:"90%" ,shadowOffset: {width: 2,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
          <TextInput style={{ width: 'auto', height:30 , fontSize:18}} placeholder="Description" />
          </View>

          <View style={{borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: 50, width :"90%",marginBottom:5 ,shadowOffset: {width: 2,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , flexDirection: "row",justifyContent: "space-between", alignItems: "center"}} >
           <View style={{width:"50%", height:"auto"}}><Text style={{ fontSize:15}}>Date de l'évenement</Text></View><DatePicker
          style={styles.datePickerStyle}
          date={date} 
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate={date}
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
            
          </View>
          <View style={{borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:5 , width:"90%" ,shadowOffset: {width: 2,height: 1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
          <TextInput style={{ width: 'auto', height:30 , fontSize:18}} placeholder="Lieux d'événement" />
          </View>
          
          <View style={{ height: 150 , width:150 , backgroundColor:"#fff", borderRadius:106 ,shadowOffset: {width: 2,height: 4,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "center" , alignItems: "center", overflow: "hidden"}}>
          {image== null ? <Button title={ "Select image" } onPress={pickImage} style={{}}/> : null }
      {image && <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}><ImageBackground source={{ uri: image }} resizeMode="cover" style={{position:"absolute", width: 190, height: 190 ,borderRadius:106 , zIndex:9999   }} /></View>}
          </View>
          <View style={{height: 40, top:15}}>
          {image!= null ? <Button title={image==null? "Select image" : "Changer l'image"} onPress={pickImage} style={{}}/> : null }
          </View>
          <View style={{height:100 , width:"90%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Picker
        selectedValue={selectedValue}
        style={{ height: 150, width:150 , zIndex:999, left:8}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="En Ligne" value="enligne" style={{color:"#004869"}} />
        <Picker.Item label="Présentiel" value="Presentiel" style={{color:"#004869"}} />
      </Picker>
      </View>
      <View style={{width:"100%",height:350 , display:"flex" , flexDirection:"row", justifyContent:"space-evenly" ,bottom:-50}}>
      <TouchableHighlight
  style={{backgroundColor:"#00AD61" , width:147 , height: 37 , borderRadius: 10 , display:"flex", justifyContent:"center" , alignItems: "center"}}
  underlayColor='#fff' >
    <Text style={{color:"#fff",fontWeight:"bold", fontSize:18 }}>Créer</Text>
</TouchableHighlight>
<TouchableHighlight
  style={{backgroundColor:"#111111" , width:147 , height: 37 , borderRadius: 10 , display:"flex", justifyContent:"center" , alignItems: "center"}}
  underlayColor='#fff' >
    <Text style={{color:"#fff",fontWeight:"bold", fontSize:18 }}>Annuler</Text>
</TouchableHighlight>


      </View>
      </View>
      </ScrollView>
      </LinearGradient>
     
  )
}

export default CreateEventBody

const styles = StyleSheet.create({
   
    container: {
     height:Dimensions.get('window').height,
     width:Dimensions.get('window').width,
      backgroundColor: 'rgba(153, 151, 151, 0.5)',
      display: 'flex',
      
      
      alignItems: 'center',
    },title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
      },
      datePickerStyle: {
        width: 150,
        
      },
  });