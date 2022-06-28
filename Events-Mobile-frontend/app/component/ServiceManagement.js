
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from "react-native";


const ServiceManagement = () => {
    const [loading ,setLoading]= useState(null);
    const [duplicated , setDuplicated]= useState(false);
    const [loadingBtn , setLoadingBtn]= useState(false);
    const [deletedSuccess, setDeletedSuccess]= useState(false);
    const [addSuccess, setAddSuccess]= useState(false);
    const [updateSuccess, setUpdateSuccess]= useState(false);
    const [jobName, setJobName]= useState(null);
    const [selectedJob ,setSelectedJob]= useState(-1);
    const [jobs, setJob]= useState([]);


    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staffjob/all");
        const job = await response.json()
        setJob(job);
    },[jobs]);




    const updateJob=async ()=>{
        await fetch('http://192.168.43.198:5555/api/v1/category/update/'+selectedJob, {
            method: 'PUT',
            body: JSON.stringify({
                nameService : jobName
            })
            , headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }

            ,
        }).then(async res => await res.json())
            .then(async (res)=> {
                setLoadingBtn(false);
                setUpdateSuccess(true);
            });
    }
    const deleteJob = async ()=> {
        setLoadingBtn(true);
        await fetch('http://192.168.43.198:5555/api/v1/staffjob/delete/'+selectedJob, {
            method: 'DELETE'
            ,
        }).then(async res => {if (res.status ===200){setDeletedSuccess(true); setLoadingBtn(false);}})
    }

    const addJob= async ()=>{
        setLoadingBtn(true);
        await fetch('http://192.168.43.198:5555/api/v1/staffjob/create', {
            method: 'POST',
            body: JSON.stringify({
                nameService : jobName
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
            });
    }



    return(
        <View style={{flex: 1}}>
            <ScrollView>
                <Picker selectedValue={selectedJob}
                        onValueChange={(itemValue, itemIndex) =>{
                            setSelectedJob(itemValue);
                        }
                        }

                >
                    <Picker.Item label={""} value={-1} key={-1}></Picker.Item>
                    {jobs.map(c =>
                        <Picker.Item label={c.nameService} value={c.id} key={c.id}></Picker.Item>)}
                </Picker>
                {deletedSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Supprimé avec succés</Text>}
                {addSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Ajouté avec succés</Text>}
                {updateSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Modifié avec succés</Text>}
                {duplicated &&<Text style={{marginLeft:20, color:"red" , marginBottom:5 }}>Cet nom de catégorie est déja existe</Text>}
                <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "space-between", flexDirection:"row"}}>
                    <TextInput style={{ width: '80%', height:20 , fontSize:15}} placeholder="Nom de catégorie" placeholderTextColor="#a1a1a1" editable={true} selectTextOnFocus={false}  onChangeText={(jobName) => setJobName(jobName)}/>{loading&&<ActivityIndicator size="small" color="black" />}
                </View>
                <View style={{height:70}}>

                </View>

                <View style={{width: "90%", justifyContent:"center" , alignSelf:"center",marginTop: 150}}>
                    {selectedJob == -1&&<TouchableOpacity style={styles.deconnect} onPress={()=> addJob()} disabled={duplicated} >{loadingBtn? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Ajouter un service</Text>}</TouchableOpacity>}
                    <View style={{display: "flex", flexDirection:"row",width : "100%", justifyContent:"space-evenly"}}>
                        {selectedJob != -1&&<TouchableOpacity disabled={duplicated} style={styles.modify} onPress={()=> updateJob()} >{loadingBtn? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Modifier</Text>}</TouchableOpacity>}
                        {selectedJob != -1&&<TouchableOpacity style={styles.delete} onPress={()=> deleteJob()}>{loadingBtn? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Supprimer</Text>}</TouchableOpacity>}
                    </View>
                </View>

            </ScrollView>
        </View>
    )

}
export default ServiceManagement;


const styles= StyleSheet.create({
    deconnect : {
        marginTop: "3%",
        width : "100%",
        height: 36,
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#00AD61",
        borderRadius: 3,
        marginBottom:30
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
        borderRadius: 3,
        marginBottom:30

    },
    modify : {
        width: "40%",
        height:36,
        backgroundColor:"#003800",
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 3,
        marginBottom:30
    }

});