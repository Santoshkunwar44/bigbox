import { Link, useLocation } from "react-router-dom";
import styles from "./Room.module.css";
import {format} from "timeago.js"
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const RoomItem = ({room}) => {


    const location = useLocation()
    const [path,setPath] =useState();
    



    useEffect(()=>{
            const pathname = location.pathname;
            let name = pathname.split("/")[2]
            setPath(name);
            

    },[location])


    return (
        <Link to={`../rooms/${room?._id}/${path}`} className={styles.room}>
           
            <div className={styles.room_details}>
                <div className={styles.details_header}>
                  <div className={styles.name}>
                    {
                        room.isPublic ?       <img width={"30px"} src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/null/external-global-freelancer-xnimrodx-lineal-color-xnimrodx-2.png" /> : <img width={"30px"} src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-private-key-privacy-flaticons-flat-flat-icons-2.png" /> 
                    }
                     <h5 className={styles.room_name}>{room.name}</h5>
                    </div> 

                <div className={styles.collabAvatars}>
                              <AvatarGroup size="xs" max={3}>
           
          {
              room?.collaborators?.map(cb=><Avatar borderColor={"#646cff"} key={cb?._id}  name={cb.username} src={cb.image} />
              )
            }
</AvatarGroup>
            </div>
                </div>
                <div className={styles.details_top}>
                    <span className={styles.size}>{(room.totalSize/1024/1024/1024).toFixed(5)} GB used</span>
                    <div className={styles.updatedTime} >
                        <p>Collaborators : &nbsp; </p> <span>{room.collaborators?.length}</span>
                    </div>
                    <div className={styles.updatedTime} >
                        <p>Last updated : &nbsp;</p> <span>{format(room.updatedAt)}</span>
                    </div>
                </div>


            </div>
        </Link>
    )
}

export default RoomItem