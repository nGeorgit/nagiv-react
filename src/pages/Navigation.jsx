import {
    Box,
    Button,
    Select,
    Stack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { MapContainer, TileLayer, useMap, ImageOverlay } from 'react-leaflet'
  import { useState, useRef } from "react";
  //import { mapData } from "../assets/mapData.js";
  //import MapCords from "../components/MapCords";
  import { useEffect } from "react";
  //import maps from '../maps/0.png'
  import { bounds, map, CRS, L } from "leaflet";

  

  function test() {
    console.log('sad')
    return (
      <h1>Hello</h1>
    );
  }
  
  function NavPage() {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [sampleObject, setSampleObject] = useState([]);

    const handleChange = (e) => {
      setValue(e.target.value);
      setTitle("");
      document.getElementById("title").value = "default";
    };
  

    const simpleCRS = CRS.Simple;
    var imageOv = useRef()
    var mapRef = useRef()
    const imageBounds = [[0,0],[1943, 2907]]//[1943, 2907]
    
    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.fitBounds(imageBounds);
        mapRef.current.setView( [70, 120], 1);
      }
    }, imageBounds);

    return (
      <Box align="center" marginTop="1em" fontFamily="Syne">
        <Button onClick={test}>Tests</Button>
        <MapContainer crs={simpleCRS} center={[500,500]} zoom={0}  ref={mapRef} style={{height:500+'px'}}>
          <ImageOverlay url={"maps/0.png"} bounds={imageBounds}  ref={imageOv} ></ImageOverlay>
        </MapContainer>
      </Box>
    );
  }
  
  export default NavPage;
  