import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import styles from "./SingleRoom.module.css";
import RoomsAssets from '../../components/Rooms/RoomsAssetsBox/RoomsAssets';
import useFetch from '../../hooks/useFetch';
import {  Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import { format } from 'timeago.js';
import { getFilebyRoomId, getRoomByIdApi } from '../../utils/api';
import { AiFillSetting } from 'react-icons/ai';
import {BiSolidChevronRight} from "react-icons/bi"
import { useSelector } from 'react-redux';
import { State } from '../../redux/Reducers';
import { FileTye, RoomType } from '../../utils/Types';

const SingleRoom = ({backItem}) => {

  const {id} = useParams()
  const {getFetch}  = useFetch();
  const [roomData,setRoomData] =useState<RoomType | null>(null)
  const {refresh} = useSelector((state:State)=>state.other)
  const {user} = useSelector((state:State)=>state.user)
  const [filesArr,setFilesArr] =useState<FileTye[]|null>(null)
  const navigate =useNavigate()
  const location = useLocation()
  const [path,setPath] =useState("")

  console.log(roomData,user)


  useEffect(()=>{
    setPath(location.pathname.split("/")[2])

    
  },[location])
  console.log(path)

  useEffect(()=>{
    getFetch(getRoomByIdApi,[id],(err,data)=>{
      if(err)return;
      setRoomData(data[0])
    })
  },[id,refresh])

useEffect(()=>{
    getFetch(getFilebyRoomId,[id],(err,data)=>{
      if(err)return;
      setFilesArr(data)
    })
  },[id,refresh])



  return (
    <div className={styles.singleRoom}>
        <div className={styles.roomHeader}>
                <div className={styles.headerLeft}>
                  <div className={styles.roomNameBox}>
                    <h1  onClick={()=>navigate(-1)} className={`${styles.roomName} ${styles.backName}`}>{backItem}</h1>   
                    <BiSolidChevronRight/>
                    <h1 className={styles.roomName}>{roomData?.name}</h1>
                  </div>
                    <div className={styles.headerLeftBottom}>
                    <p className={styles.infoText}>{moment(roomData?.createdAt).format('lll')}</p>
                    <p className={styles.infoText}>{filesArr?.length} Files</p>
                    </div>
                </div>
        
            <div className={styles.headerRight}>
            <div className={styles.headerRightTop}>
                    <AvatarGroup size='sm' max={3}>
          {
            roomData?.collaborators?.map(cb=> <Avatar key={cb?._id}  name={cb.username} src={cb.image} />
          )
          }
                    </AvatarGroup>
          {
      roomData &&  (user?._id === roomData.user?._id )&& <Link to={"../settings"}>
          <AiFillSetting/>
        </Link>
}
                </div>
                <p className={styles.infoText}>Edited - {format(roomData?.updatedAt??"")}</p>
            </div>
        </div>
          <RoomsAssets filesArr={filesArr}/>
    </div>
  )
}

export default SingleRoom

// ctrl r  to redo
// u to undo
