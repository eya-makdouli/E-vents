import React, {useEffect, useState} from "react";
import {ActivityIndicator, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EventDetailsScreen from "../Screens/EventDetailsScreen";
import Homeheader from "./Shared/Homeheader";
import Notifications from "./Notifications";
import ProfileComponent from "./ProfileComponent";
import HomeBody from "./HomeBody";
import MenuSideBar from "./MenuSideBar";
import ActivityComponent from "./ActivityComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateEvent from "./CreateEvent";
import ViewAllComponent from "./ViewAllComponent";
import ProfileDetailComponent from "./ProfileDetailComponent";
import StaffRequests from "./StaffRequests";
import NotificationsRequests from "./NotificationsRequests";
import {LinearGradient} from "expo-linear-gradient";
import NotificationRecruitment from "./NotificationRecruitment";
import CategoryManagement from "./CategoryManagement";
import LocationManagement from "./LocationManagement";
import ServiceManagement from "./ServiceManagement";
import ProfileManagement from "./ProfileManagement";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();


const MainScreen = (props) => {
    const [Notificationopened, setNotificationOpened] = useState(false);
    const [ProfileOpened , setProfileOpened] = useState(false)
    const [EventDetailOpened , setEventDetailOpened] = useState(false);
    const [sideMenuOpened , setSideMenuOpened] = useState(true);
    const [testOpened , settestOpened]= useState(false);
    const [OpenedActivity , setOpenedActivity]= useState(false);
    const [createEventOpened , setCreateEventOpened]= useState(false);
    const [user , setUser] = useState([]);
    const [category ,setCategory]= useState({});
    const [event , setEvents]= useState({})
    const [Loading, setLoading] = useState(true);
    const [userType, setUserType]= useState(null);
    const [notifications , setNotifications] = useState(null)
    const [length , setLength] =useState(0);
    const [length2 , setLength2] =useState(0);
    const [length3 , setLength3] =useState(0);
    const [viewAll, setViewAll] = useState(false);
    const [consults, setConsults] = useState(false);
    const [data , setData]= useState({});
    const [selectedUser , setSelectedUser]= useState(null);
    const [profileDetailOpened , setProfileDetailOpened]= useState(false);
    const [staffRequesOpened , setStaffRequestOpened]= useState(false);
    const [EditTemplate , setEditTemplate]= useState(false);
    const [staffRequests , setStaffRequests]= useState([]);
    const [savedCategory , setSavedCategory]= useState(null);
    const [recruitmentRequests , setRecruitmentRequests]= useState([])

    const [categoriesOpened , setCategoriesOpened]= useState(false);
    const [locationOpened , setLocationOpened]= useState(false);
    const [staffServiceOpened , setStaffServiceOpened]= useState(false);
    const [profileEdit , setProfileEdit]= useState(false);

    useEffect(async ()=> {
        await AsyncStorage.getItem('@user').then(async user => {await setUser(JSON.parse(user))});
    }, [Loading]);

    useEffect(async ()=> {
        const response = await fetch("http://192.168.43.198:5555/api/v1/notification/org/id/"+user.id);
        const items = await response.json();
        setNotifications(items.reverse());
        const length = notifications.filter(n => n.solved === false).length;
        setLength(length);
    },[notifications]);


    useEffect(async ()=> {
        const response = await fetch("http://192.168.43.198:5555/api/v1/staffRequest/all");
        setStaffRequests(await response.json());
        const length2 = staffRequests.filter(r => r.solved === false).length;
        setLength2(length2);
    },[staffRequests])


    useEffect(async ()=> {
            const response = await fetch("http://192.168.43.198:5555/api/v1/recruitment/user/"+user.id);
            let req = await response.json();
            setRecruitmentRequests(req.reverse());
        const length3 = recruitmentRequests.filter(r => r.solved === false).length;
            setLength3(length3);
    },[recruitmentRequests]);





    const [eventD, setEventD]= useState(null);

    useEffect(()=> {

        setSideMenuOpened(testOpened);
    },[sideMenuOpened ])
    useEffect(async ()=> {
        setLoading(true);
        const response = await fetch("http://192.168.43.198:5555/api/v1/category/all");
        const cat = await response.json()
        setCategory(cat);
        const res = await fetch("http://192.168.43.198:5555/api/v1/event/all");
        const events = await res.json()
        setEvents(events);

    },[savedCategory]);

    setTimeout(()=>{
        setLoading(false);
    },1000);
    if(Loading){
        return (<View style={{height:300, width:300, display:"flex", justifyContent:"center", alignItems:"center", alignSelf:"center"}}><ActivityIndicator size="small" color="black" /></View>)
    }else{
        return(

      <View style={styles.Container}>
          {!EventDetailOpened &&<Homeheader setProfileEdit={setProfileEdit} profileEdit={profileEdit} staffServiceOpened={staffServiceOpened} locationOpened={locationOpened} categoriesOpened={categoriesOpened} setStaffServiceOpened={setStaffServiceOpened} setLocationOpened={setLocationOpened} setCategoriesOpened={setCategoriesOpened} setStaffRequestOpened={setStaffRequestOpened} staffRequestOpened={staffRequesOpened} setConsults={setConsults} consults={consults} Activity={setOpenedActivity} activityState={OpenedActivity} not={setNotificationOpened} state={Notificationopened} profile={setProfileOpened} profileState ={ProfileOpened} menu={sideMenuOpened} stateMenu={setSideMenuOpened} testfn={settestOpened} testval={testOpened} createEvent={createEventOpened} setCreateEvent={setCreateEventOpened} notSize={length+ length2+ length3} setViewAll={setViewAll} setProfileDetailOpened={setProfileDetailOpened} profileDetailOpened={profileDetailOpened}/>}
          {/*<StaffManagement user={user}/>*/}
          {staffServiceOpened && !Notificationopened &&<ServiceManagement/>}
          {locationOpened&& !Notificationopened &&<LocationManagement/>}
          {categoriesOpened && !Notificationopened &&<CategoryManagement  category={category} setSavedCategory={setSavedCategory}/>}
          {profileEdit&&<ProfileManagement selectedUser={user} setConsults={setConsults} consults={consults}/>}
          {profileDetailOpened&&<ProfileDetailComponent selectedUser={selectedUser} setProfileDetailOpened={setProfileDetailOpened} setConsults={setConsults} consults={consults}/>}
          {OpenedActivity && !Notificationopened &&<ActivityComponent setEditTemplate={setEditTemplate} setEventDetailOpened={setEventDetailOpened} setProfileOpened={setProfileOpened} setOpenedActivity={setOpenedActivity} user={user} eventDetail={setEventDetailOpened} setEventD={setEventD} eventD={eventD} eventDetailState={EventDetailOpened} setType={setUserType} user={user}/>}
          {staffRequesOpened && !Notificationopened && !OpenedActivity &&<StaffRequests user={user}/>}
          {sideMenuOpened && <MenuSideBar setProfileEdit={setProfileEdit} setStaffServiceOpened={setStaffServiceOpened} setLocationOpened={setLocationOpened} setCategoriesOpened={setCategoriesOpened} setCreateEventOpened={setCreateEventOpened} setStaffRequestOpened={setStaffRequestOpened} staffRequestOpened={staffRequesOpened} setUser={setUser} user={user} Activity={setOpenedActivity} activityState={OpenedActivity} notif={setNotificationOpened} navigation={props.navigation} ProfileOpened={ProfileOpened} setProfileOpened={setProfileOpened}/>}
          {EventDetailOpened && !Notificationopened  && !profileDetailOpened &&<EventDetailsScreen setEditTemplate={setEditTemplate} editTemplate={EditTemplate} category={category} state={setEventDetailOpened} eventDetails={eventD} type={userType} setType={setUserType} user={user}  /> }
          {viewAll && !createEventOpened &&!Notificationopened && !ProfileOpened && !OpenedActivity && <ViewAllComponent user={user} eventDetail={setEventDetailOpened} eventDetailState={EventDetailOpened} eventD={eventD} setEventD={setEventD} item={data}/>}
          {ProfileOpened && !EventDetailOpened && !OpenedActivity &&<ProfileComponent setEditTemplate={setEditTemplate} setEventDetailOpened={setEventDetailOpened} setProfileOpened={setProfileOpened} setOpenedActivity={setOpenedActivity} user={user} eventDetail={setEventDetailOpened} setEventD={setEventD} eventD={eventD} eventDetailState={EventDetailOpened} setType={setUserType}/>}
          {!profileEdit&&!staffServiceOpened&& !locationOpened && !categoriesOpened&&!profileDetailOpened &&!viewAll && !createEventOpened && !Notificationopened && !ProfileOpened && !EventDetailOpened && !OpenedActivity && !staffRequesOpened &&<HomeBody notifications={notifications} events={event} eventDetailState={EventDetailOpened} eventDetail={setEventDetailOpened} user={user} setEventD={setEventD} eventD={eventD} viewAll={viewAll} setViewAll={setViewAll} setData={setData}/> }
          {createEventOpened && !Notificationopened && !ProfileOpened && !EventDetailOpened && !OpenedActivity &&<CreateEvent category={category} user={user} setUser={setUser}/>}
          {!profileEdit&&!locationOpened && !categoriesOpened && !staffServiceOpened && !staffRequesOpened &&!profileDetailOpened&&!createEventOpened &&!Notificationopened && !ProfileOpened && !EventDetailOpened && !OpenedActivity &&<TouchableOpacity onPress={()=>{ setProfileDetailOpened(false) ;setCreateEventOpened(true);}} style={styles.cont}>
              <LinearGradient
                  colors={['#4ce7ae', 'rgb(157,255,217)']} style={{width: 50, height: 50, display: "flex", alignItems: "center", justifyContent:"center" , borderRadius:25}}><Text style={{color: "#fff", fontWeight:"700", fontSize: 18}}>+</Text></LinearGradient>
          </TouchableOpacity>}
              {Notificationopened&&<ScrollView style={{backgroundColor:"#fff", height:"100%"}}>
                  {user.isAdmin&&staffRequests.map(item =>
                      <NotificationsRequests item={item} key={item.id} setSelectedUser={setSelectedUser} setProfileDetailOpened={setProfileDetailOpened} setNotificationOpened={setNotificationOpened}/>)
                  }
                  {notifications.map(item =>
                      <Notifications item ={item} key={item.id} setSelectedUser={setSelectedUser} setProfileDetailOpened={setProfileDetailOpened} setNotificationOpened={setNotificationOpened} />)
                  }
                  {recruitmentRequests.map(item =>
                      <NotificationRecruitment item={item} key={item.id} setSelectedUser={setSelectedUser} setProfileDetailOpened={setProfileDetailOpened} setNotificationOpened={setNotificationOpened} req={true}/>)
                  }
          </ScrollView>}
      </View>
    );}}




export default MainScreen;
const styles = StyleSheet.create({
    Container : {
        display: "flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        zIndex:-1,
        height:"100%",
        backgroundColor:"#fff"
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    cont : {
        height:55,
        width: 55,
        position: "absolute",
        bottom: 20,
        right: 20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        overflow: 'hidden',
        shadowOffset: {width: .2,height: 3},shadowOpacity: 0.18,shadowRadius: 1.00, elevation: 1,
        zIndex: 1


    }

})
