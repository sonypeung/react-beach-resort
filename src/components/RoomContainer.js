import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { withRoomConsumer } from "../context";
import Loading from "../components/Loading";

function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);

// import React from 'react';
// import RoomFilter from "./RoomFilter";
// import RoomList from "./RoomList";
// import {RoomConsumer} from '../context';
// import Loading from "../components/Loading";

// export default function RoomsContainer() {
//     return (
//         <RoomConsumer>
// {
//     value => {
//         const {loading, sortedRooms, rooms} = value;
//         if(loading) {
//             return <Loading></Loading>
//         }
//         return (
//             <div>
//                 Hello rooms container
//                 <RoomFilter rooms={rooms}/>
//                 <RoomList rooms={sortedRooms}/>
//             </div>
//         )
//     }
// }

//         </RoomConsumer>

//     )
// }
