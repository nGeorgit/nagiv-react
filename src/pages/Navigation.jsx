import {
    Box,
    Button,
    Select,
    Stack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { MapContainer, TileLayer, useMap, ImageOverlay } from 'react-leaflet'
  import { useState, useRef } from "react";
  import { mapData } from "../assets/mapData.js";
  //import MapCords from "../components/MapCords";
  import { useEffect } from "react";
  //import maps from '../maps/0.png'
  import { bounds, map, CRS, L } from "leaflet";
  import {Navig} from "../navigation/navigation.js"
  import { MapContrl } from "../navigation/mapContrl.js";




  function NavPage() {
    const [curMap, setCurMap] = useState("0");
    const [value, setValue] = useState("");
    const [sampleObject, setSampleObject] = useState([]);
    const navig = new Navig(mapData);
    const mapContrl = new MapContrl();
    mapContrl.setNavig(navig);

    const handleChange = (e) => {
      setCurMap(e.target.value);
    };
  
    mapContrl.start = true;
    mapContrl.markerFromPlace('a')
    mapContrl.start = false;
    mapContrl.markerFromPlace('c')
    navig.find()
    console.log(navig.pathD)

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
            {Object.keys(mapData['floors']).map((ma) => (<option value={ma}>{mapData['floors'][ma]['name']}</option>))}
          </select>
        </label>
        <MapContainer crs={simpleCRS} center={[imageBounds[1][0]/2,imageBounds[1][1]/2]} zoom={-3} minZoom={-5}  ref={mapRef} style={{height:500+'px'}}>
          <ImageOverlay url={"maps/"+curMap+".png"} bounds={imageBounds}  ref={imageOv} ></ImageOverlay>
        </MapContainer>
      </Box>
    );
  }
  
  export default NavPage;
  