import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: "0",
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src="https://i.ibb.co/dLyThpw/image.png" alt="logo" height={60} width={150} className="responsive"/>
      </Link>
      <SearchBar></SearchBar>
    </Stack>
  );
};

export default Navbar;
