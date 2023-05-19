import {
    Box,
    Button,
    Select,
    Stack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { MapContainer, TileLayer, useMap, ImageOverlay, Polyline, Marker } from 'react-leaflet'
  import { useState, useRef } from "react";
  import { mapData } from "../assets/mapData.js";
  //import MapCords from "../components/MapCords";
  import { useEffect } from "react";
  //import maps from '../maps/0.png'
  import { bounds, map, CRS, L } from "leaflet";
  import {Navig} from "../navigation/navigation.js"
  import { MapContrl } from "../navigation/mapContrl.js";


  const navig = new Navig(mapData);
  const mapContrl = new MapContrl(navig);

  function NavPage() {
    const [curMap, setCurMap] = useState("0");
    const [text, setText] = useState("");
    const [nav, setNav] = useState(null);
    const [imageBounds, setImageBounds] = useState([[0,0],[mapData.floors[0].res.height , mapData.floors[0].res.width]])
    const start = useRef()
    const end = useRef()
    const maps = [0,1,2]
    const simpleCRS = CRS.Simple;
    var imageOv = useRef()
    const mapRef = useRef(null)
    //const imageBounds = [[0,0],[1943, 2907]]//[1943, 2907]


    const handleChange = (e) => {
      console.log(e.target.value)
      setCurMap(mapData.places[e.target.value].floorId);
      setNav(null)
    };

    const handleChangeMap = (e) => {
      console.log(e.target.value)
      setCurMap(e.target.value);
      setNav(null)
    };
  

    
    const setLeafMap = (floorid) => {
      setImageBounds([[0,0],[mapData.floors[floorid].res.height , mapData.floors[floorid].res.width]])
      setCurMap(floorid)
    }

    const go = () => {
      mapContrl.start = true;
      mapContrl.markerFromPlace(start.current.value)
      mapContrl.start = false;
      mapContrl.markerFromPlace(end.current.value)
      navig.find()
      setLeafMap(navig.getCurMapId())
      setNav(navig.showCur())
      setText(navig.getText())
    }

    const next = () => {
      navig.next()
      setLeafMap(navig.getCurMapId())
      setText(navig.getText())
      setNav(navig.showCur())

    }

    const prev = () => {
      navig.prev()

      setLeafMap(navig.getCurMapId())
      setText(navig.getText())
      setNav(navig.showCur())
    }


    return (
      <Box align="center" marginTop="1em" fontFamily="Syne">
        <h3>{text}</h3>
        <text>start: </text>
        <select onChange={handleChange} defaultValue={"default"} ref={start}> 
          {Object.keys(mapData.places).map((ma) => (<option value={ma}>{ma}</option>))}
        </select>
        <text>end: </text>
        <select onChange={handleChange} defaultValue={"default"} ref={end}> 
          {Object.keys(mapData.places).map((ma) => (<option value={ma}>{ma}</option>))}
        </select>
        <label>
        <text>map: </text>
          <select onChange={handleChangeMap} defaultValue={"default"}>
            {Object.keys(mapData['floors']).map((ma) => (<option value={ma}>{mapData['floors'][ma]['name']}</option>))}
          </select>
        </label>
        <Button onClick={go}>Go</Button>
        <Button onClick={next}>Next</Button>
        <Button onClick={prev}>Prev</Button>
        <MapContainer   crs={simpleCRS} center={[imageBounds[1][0]/2,imageBounds[1][1]/2]} zoom={-3} minZoom={-3}  ref={mapRef} style={{height:500+'px'}}>
          <ImageOverlay  url={"maps/"+curMap+".png"} bounds={imageBounds}  ref={imageOv} ></ImageOverlay>
          {nav && nav}
        </MapContainer>
      </Box>
    );
  }
  
  export default NavPage;
  