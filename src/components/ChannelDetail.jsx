import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Box} from '@mui/material';
import {Videos,ChannelCard} from "./";
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail,setChannelDetail]=useState(null);
  const [videos,setVideos]=useState([]);
  const {id}=useParams();
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=>setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=>setVideos(data.items));
  },[id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{background: "linear-gradient(90deg, rgba(255,0,0,1) 16%, rgba(7,0,255,1) 44%, rgba(22,255,0,1) 73%",zIndex:10,height:"300px"}}></div>
        <ChannelCard channelDetail={channelDetail} marginTop="-110px"></ChannelCard>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr:{sm:"100px"}}} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail