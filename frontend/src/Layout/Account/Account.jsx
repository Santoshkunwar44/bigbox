import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import styles from "./Account.module.css"
import {useDispatch, useSelector} from "react-redux"
import { getUserRoomApi, getUsersRoomCountApi, logoutApi } from '../../utils/api'
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import RoomItem from '../../components/Rooms/RoomItem/RoomItem'
import RoomList from '../../components/RoomList/RoomList'
import { Avatar } from '@chakra-ui/react'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import useAlert from '../../hooks/useAlert'


const Account = () => {
    const {user} = useSelector((state)=>state.user);
    const {refresh} = useSelector((state)=>state.other);
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const {AddUserAction} = bindActionCreators(actionCreators,dispatch)
    const {alert} =useAlert()
    const {userId}= useParams()
    const [rooms,setAllRooms] = useState([])
    const [roomCount,setRoomCount] = useState({
        public:0,
        private:0
    })
    const {getFetch} =useFetch()
    useEffect(()=>{
        getRoomsCountOfUser()
    },[user])


    const handleLogout=async()=>{
        try {
              const { status } =   await logoutApi();
              if(status===200){
                AddUserAction(null)
                     alert("success",'Logout successfull')
                navigate("/home/public")
              }
        } catch (error) {
          console.log(error)  
        }

    }

    useEffect(()=>{
        getFetch(getUserRoomApi,[userId],(err,data)=>{
            if(err)return;
            setAllRooms(data)
        })
    },[refresh])

    const getRoomsCountOfUser=async()=>{
        if(!user?._id)return;
        try {
               const {data,status} = await  getUsersRoomCountApi(user?._id)
               if(status===200){
                    setRoomCount(data.message)
               }
        } catch (error) {
                console.log(error)
        }
    }

    return (
        <div
            className={styles.Account_box}>
            <Header img={"/assets/images/user.png"} name={"My Account"} />
            <div className={styles.account_content}>

                <div className={styles.account_personal_details}>

                    <Avatar className={styles.accountImg} size={"lg"} name={user?.username} src={user?.image}/>
                    <div className={styles.account_primary_details_box}>

                        <div className={styles.primary_details}>
                            <p className={styles.username}>{user?.username}</p>
                            <p className={styles.email}>{user?.email}</p>
                            <div className={styles.user_description}> hey !! i am a software developer by profession</div>
                            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                           </div>
                           
                         <div className={styles.secondary_details}>
                            {/* <div className={styles.room_details_box}>
                                <img width={"20px"} src="https://img.icons8.com/officel/40/null/slack.png" alt='roomIcon' />
                                <p>{parseInt(roomCount.private) + parseInt(roomCount.public)} rooms</p>
                            </div> */}
                  
                        </div>
                    


                    </div>

                </div>
                <div className={styles.secondary_details_container}>

                    <div className={styles.account_rooms}>
                        
                        <div>
                            <div>
                            {/* <p className={styles.room_main_text}>You have {parseInt(roomCount?.private) + parseInt(roomCount?.public)} rooms all together</p> */}
                                <div className={`${styles.room_type_info_box} `}>
                                    <img width={"30px"} src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/null/external-global-freelancer-xnimrodx-lineal-color-xnimrodx-2.png" />
                                    <p className={`${styles.global_room}`}>{roomCount.public} public</p>
                                </div>
                                <div className={styles.room_type_info_box} >
                                    <img width={"30px"} src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-private-key-privacy-flaticons-flat-flat-icons-2.png" />

                                    <p className={styles.private_room}>{roomCount.private} private</p>
                                </div>
                            </div>
                            <div className={styles.room_list}>

                                {
                                            rooms.map(r=>(<RoomList room={r} key={r._id}/>))
                                }
                   
                             




                            </div>
                        </div>

                    </div>


                </div>
           

            </div>

        </div >
    )
}

export default Account