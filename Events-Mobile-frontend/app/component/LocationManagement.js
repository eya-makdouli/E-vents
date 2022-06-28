import React, {useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';


const LocationManagement = ({category}) => {
    const [location , setLocation]= useState([]);
    const [locationName , setLocationName]= useState([]);
    const [loadingBtn , setLoadingBtn]= useState(false);
    const [deletedSuccess, setDeletedSuccess]= useState(false);
    const [addSuccess, setAddSuccess]= useState(false);
    const [updateSuccess, setUpdateSuccess]= useState(false);
    const [cityName, setCityName]= useState(null);
    const [flag, setFlag]= useState();

    useEffect(async ()=>{
            const response = await fetch("http://192.168.43.198:5555/api/v1/location/all");
            const r =  await response.json();
            const arr = [];
        r.filter((v,i,a)=>{if(a.findIndex(v2=>(v2.city===v.city))===i) {arr.push(v)}});
        setLocation(arr);
    },[location]);


    const addLocation= async ()=>{
        setLoadingBtn(true);
        await fetch('http://192.168.43.198:5555/api/v1/location/create', {
            method: 'POST',
            body: JSON.stringify({
                city : cityName
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        }).then(async res => await res.json())
            .then(async (res)=> {
                setLoadingBtn(false);
                setAddSuccess(true)
                setFlag(res);
            });
    }


    const deleteLocation = async ()=> {
        setLoadingBtn(true);
        await fetch('http://192.168.43.198:5555/api/v1/location/deletecity/'+selectedLocation, {
            method: 'DELETE'
            ,
        }).then(async res => {if (res.status ==200){setDeletedSuccess(true); setLoadingBtn(false)}})
    }



    const [selectedLocation ,setSelectedLocation]= useState(-1);
    const [categoryName ,setCategoryName]= useState(null);
    const [loading ,setLoading]= useState(null);
    return(
        <View style={{flex: 1}}>

            <Picker selectedValue={selectedLocation}
                    onValueChange={(itemValue, itemIndex) =>{
                        setSelectedLocation(itemValue);
                    }
                    }

            >
                <Picker.Item label={""} value={-1} key={-1}></Picker.Item>
                {location.map(c =>(
                    <Picker.Item label={c.city} value={c.city} key={c.id}></Picker.Item>))}
            </Picker>
            {deletedSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Suppriméé avec succés</Text>}
            {addSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Ajoutée avec succés</Text>}
            {updateSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Modifiée avec succés</Text>}
            <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "flex-start"}}>
                <TextInput style={{ width: 'auto', height:20 , fontSize:15}} placeholder="Nom de la ville" placeholderTextColor="#a1a1a1" editable={true} selectTextOnFocus={false}  onChangeText={(cityName) => setCityName(cityName)}/>
            </View>

            <View style={{width: "90%", justifyContent:"center" , alignSelf:"center",marginTop: 150}}>
                {selectedLocation == -1&&<TouchableOpacity onPress={()=> addLocation()} style={styles.deconnect}  >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Ajouter une ville</Text>}</TouchableOpacity>}
                <View style={{display: "flex", flexDirection:"row",width : "100%", justifyContent:"space-evenly"}}>
                    {selectedLocation != -1&&<TouchableOpacity style={styles.modify}  >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Modifier</Text>}</TouchableOpacity>}
                    {selectedLocation != -1&&<TouchableOpacity onPress={()=>deleteLocation()} style={styles.delete}  >{loading? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Supprimer</Text>}</TouchableOpacity>}
                </View>
            </View>


        </View>
    )

}
export default LocationManagement;


const styles= StyleSheet.create({
    deconnect : {
        marginTop: "3%",
        width : "100%",
        height: 36,
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#00AD61",
        borderRadius: 3
    },
    btnText : {
        fontSize:18,
        fontWeight: "700",
        color: "#fff"
    },
    delete : {
        width: "40%",
        height:36,
        backgroundColor:"#820101",
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 3

    },
    modify : {
        width: "40%",
        height:36,
        backgroundColor:"#003800",
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 3
    }

});