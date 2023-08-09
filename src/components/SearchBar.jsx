import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search, Mic, MicOff } from "@mui/icons-material";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  function submitSearch() {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  }
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function changeMic() {
    setMicOn(!micOn);
    console.log(transcript);
    if(!micOn){
      SpeechRecognition.startListening();
    }
    else
    {
      SpeechRecognition.stopListening();
    }
  }
  return (
    <Paper
      components="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2, //padding left
        boxShadow: "none",
        mr: { sm: 5 }, //margin right
      }}
    >
      <input
        className="search-bar"
        placeholder="Search"
        value={searchTerm}
        onChange={(event)=>setSearchTerm(event.target.value || transcript)}
      ></input>
      <IconButton type="submit" sx={{ p: "10px", color: "red" }} onClick={submitSearch}>
        <Search></Search>
      </IconButton>
      <IconButton  sx={{ p: "10px", color: "red" }} onClick={changeMic}>
        {micOn ? <Mic></Mic> :<MicOff></MicOff>}
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
