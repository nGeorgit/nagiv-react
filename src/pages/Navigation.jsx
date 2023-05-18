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

  

  
  function NavPage() {
    const [curMap, setCurMap] = useState("0");
    const [value, setValue] = useState("");
    const [sampleObject, setSampleObject] = useState([]);

    const handleChange = (e) => {
      setCurMap(e.target.value);
    };
  
    const maps = [0,1,2]
    const simpleCRS = CRS.Simple;
    var imageOv = useRef()
    var mapRef = useRef()
    const imageBounds = [[0,0],[1943, 2907]]//[1943, 2907]
    
    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.fitBounds(imageBounds);
        //mapRef.current.setView( [70, 120], -5);
      }
    }, imageBounds);

  

    return (
      <Box align="center" marginTop="1em" fontFamily="Syne">
        <label>
          <select onChange={handleChange} defaultValue={"default"}>
            {maps.map((ma) => (<option value={ma}>{ma}</option>))}
          </select>
        </label>
        <MapContainer crs={simpleCRS} center={[500,500]} zoom={0} minZoom={-5}  ref={mapRef} style={{height:500+'px'}}>
          <ImageOverlay url={"maps/"+curMap+".png"} bounds={imageBounds}  ref={imageOv} ></ImageOverlay>
        </MapContainer>
      </Box>
    );
  }
  
  export default NavPage;
  