import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Box, Typography, Stack } from '@mui/material'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { CheckCircle } from '@mui/icons-material'
import { Videos } from './'
//The gap property in CSS is a shorthand for row-gap and column-gap
//The toLocaleString() method returns a string with a language-sensitive representation of this number.Basically, it puts the commas in the right places to make it human readable.
const VideoDetail = () => {
  const [VideoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data?.items[0]));
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}type=video`).then((data) => setVideos(data?.items))
  }, [id])

  if (!VideoDetail?.snippet) return 'Loading...'
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = VideoDetail;
  
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant='h5' fontWeight="bold" p={2} >
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: "h6" }} color="#fff">{channelTitle}<CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} /></Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>{parseInt(viewCount).toLocaleString()} views</Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>{parseInt(likeCount).toLocaleString()} likes</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column"></Videos>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail