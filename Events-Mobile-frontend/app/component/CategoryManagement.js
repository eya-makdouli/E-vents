import React, {useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from "react-native";


const CategoryManagement = ({category,setSavedCategory}) => {
    const [selectedCategory ,setSelectedCategory]= useState(-1);
    const [categoryName ,setCategoryName]= useState(null);
    const [loading ,setLoading]= useState(null);
    const [duplicated , setDuplicated]= useState(false);
    const [loadingBtn , setLoadingBtn]= useState(false);
    const [deletedSuccess, setDeletedSuccess]= useState(false);
    const [addSuccess, setAddSuccess]= useState(false);
    const [updateSuccess, setUpdateSuccess]= useState(false);
    const [Jobs, setJobs]= useState([]);
    const [arr, setArr]= useState([]);
    const [arr2, setArr2]= useState([]);
    const updateCategory=async ()=>{
        await fetch('http://192.168.43.198:5555/api/v1/category/update/'+selectedCategory, {
            method: 'PUT',
            body: JSON.stringify({
                genre : categoryName,
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
                setTimeout(()=>{
                setSavedCategory(res);
                },2000)
            });
    }

    const deleteCategory = async ()=> {
        setLoadingBtn(true);
        await fetch('http://192.168.43.198:5555/api/v1/category/delete/'+selectedCategory, {
            method: 'DELETE'
            ,
        }).then(async res => {if (res.status ==200){setDeletedSuccess(true); setLoadingBtn(false);setTimeout(()=> {setSavedCategory(res)},2000)}})
    }

    const addCategory= async ()=>{
        setLoadingBtn(true);
        await fetch('http://192.168.43.198:5555/api/v1/category/create', {
            method: 'POST',
            body: JSON.stringify({
                genre : categoryName,
                staffJobs: arr
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
                setTimeout(()=>{
                setSavedCategory(res);
                },2000)
            });
    }

    useEffect(async ()=>{
        setLoading(true);
        const response = await fetch("http://192.168.43.198:5555/api/v1/category/genre/"+categoryName);
        const cat = await response.json()
        if (cat.genre === categoryName){
            setDuplicated(true);
            setLoading(false);
        }else{
            setDuplicated(false);
            setLoading(false);
        }
    },[categoryName])

    useEffect(async ()=>{
        const response = await fetch("http://192.168.43.198:5555/api/v1/staffjob/all");
        const jobs = await response.json()
       setJobs(jobs);
    },[])


    return(
        <View style={{flex: 1}}>
            <ScrollView>
            <Picker selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>{
                        setSelectedCategory(itemValue);
                    }
                    }

            >
                <Picker.Item label={""} value={-1} key={-1}></Picker.Item>
                {category.map(c =>
                    <Picker.Item label={c.genre} value={c.id} key={c.id}></Picker.Item>)}
            </Picker>
                {deletedSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Supprimée avec succés</Text>}
                {addSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Ajoutée avec succés</Text>}
                {updateSuccess&&<Text style={{marginLeft:20, color:"green" , marginBottom:5 }}>Modifiée avec succés</Text>}
            {duplicated &&<Text style={{marginLeft:20, color:"red" , marginBottom:5 }}>Cet nom de catégorie est déja existe</Text>}
            <View style={{alignSelf:"center",borderRadius:7,backgroundColor: "#F5F5F5",padding:10,height: "auto" ,marginBottom:9 , width:"90%" ,shadowOffset: {width: .2,height: .1,},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1 , display:"flex" , justifyContent: "space-between", flexDirection:"row"}}>
                <TextInput style={{ width: '80%', height:20 , fontSize:15}} placeholder="Nom de catégorie" placeholderTextColor="#a1a1a1" editable={true} selectTextOnFocus={false}  onChangeText={(categoryName) => setCategoryName(categoryName)}/>{loading&&<ActivityIndicator size="small" color="black" />}
            </View>
                        <ScrollView horizontal={true} style={{marginLeft:20}}>
                            {Jobs.map(j=><TouchableOpacity onPress={()=>{arr.push({"id" : j.id}), arr2.push(j.id)}} style={!arr2.includes(j.id)?{backgroundColor: "#e1e1e1", display:"flex", justifyContent:"center", alignItems:"center", padding:"2%", width:"auto", borderRadius:100}: {backgroundColor: "#00AD61", display:"flex", justifyContent:"center", alignItems:"center", padding:"2%", borderRadius:100, width:"auto"}} disabled={arr2.includes(j.id)}><Text style={arr2.includes(j.id)&&{color:"#fff"}}>{j.nameService}</Text></TouchableOpacity>)}
                        </ScrollView>
            <View style={{width: "90%", justifyContent:"center" , alignSelf:"center",marginTop: 150}}>
                {selectedCategory == -1&&<TouchableOpacity style={styles.deconnect} onPress={()=> addCategory()} disabled={duplicated} >{loadingBtn? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Ajouter une catégorie</Text>}</TouchableOpacity>}
                <View style={{display: "flex", flexDirection:"row",width : "100%", justifyContent:"space-evenly"}}>
                {selectedCategory != -1&&<TouchableOpacity disabled={duplicated} style={styles.modify} onPress={()=> updateCategory()} >{loadingBtn? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Modifier</Text>}</TouchableOpacity>}
                {selectedCategory != -1&&<TouchableOpacity style={styles.delete} onPress={()=> deleteCategory()}>{loadingBtn? <ActivityIndicator size="small" color="white" />  :<Text style={styles.btnText}>Supprimer</Text>}</TouchableOpacity>}
                </View>
                </View>


            </ScrollView>

        </View>
    )

}
export default CategoryManagement;


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