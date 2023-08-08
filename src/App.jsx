import * as THREE from "three";
import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "@react-three/fiber";
import {
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { BsFillEyeFill } from "react-icons/bs";
import { Water } from "three/examples/jsm/objects/Water.js";
import ColorContainer from "./Components/ColorContainer";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import useColorStore from "./Utils/store";
import "./App.css";
import { Skifour } from "./Components/skimmer-skiff-fourteen";
import Menu from "./Components/Menu/Menu";


 function Loader() {
   const { progress } = useProgress();
   return (
     <Html
       style={{
         position: "absolute",
         maxWidth: "100vw",
         height: "100vh",
         border: "1px solid red",
       }}
       center
     >
       <img
         src='/Landau_gif.gif'
         alt='Loading animation'
         style={{ height: "100vh", width: "100vw" }}
       />
     </Html>
   );
 }

//extend
extend({ Water });

function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(2000, 2000), []);
  const config = useMemo(
    () => ({
      textureWidth: 256,
      textureHeight: 256,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x112232,
      waterNormals,
      distortionScale: 1.5,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame(
    (state, delta) =>
      (ref.current.material.uniforms.time.value += delta * 0.155)
  );
  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, -0.45, 0]}
    />
  );
}

export default function App() {
  const [showColorContainer, setShowColorContainer] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [scene, setScene] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false); 
  const setActiveState = useColorStore((state) => state.setActiveState);
  const canvasRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
    setShowColorContainer(false);
  };

  const captureScreenshot = () => {
    const canvas = document.querySelector(".print");

    html2canvas(canvas).then((canvas) => {
      var imgData = canvasRef.current
        .toDataURL("image/png", 1.0)
        .replace("image/png", "image/octet-stream");
      var pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      pdf.save("download.pdf");
    });
  };

  const handleColorClick = () => {
    if (showColorContainer) setActiveState(0);

    setShowColorContainer((prevShow) => !prevShow);
    setShowMenu(false);
  };

  return (
    <div id='canvasComponent' style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        ref={canvasRef}
        className='print'
        camera={{ position: [0, 5, 100], fov: 45, near: 1, far: 20000 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader/>}>
          {scene ? (
            <Environment
              background={true}
              files={"/Environment/kloofendal_48d_partly_cloudy_puresky_2k.hdr"}
            />
          ) : (
            <Environment
              background={true}
              files={"/Environment/kloppenheim_07_puresky_2k.hdr"}
            />
          )}
          <Ocean />

          <Skifour setModelLoaded={setModelLoaded} />
        </Suspense>

        <OrbitControls
          maxPolarAngle={Math.PI * 0.45}
          rotateSpeed={0.6}
          panSpeed={0.6}
          enableZoom={true}
          minDistance={3.8}
          maxDistance={10}
          enablePan={false}
        />
      </Canvas>

     {
        modelLoaded && (
          <>
           {/*download pdf button*/}
      <div className='icon-container'>
        <div
          className='icon'
          onClick={() => {
            if (!previewMode) setActiveState(0);
            setPreviewMode(!previewMode);
          }}
        >
          <BsFillEyeFill size={22} style={{ padding: "3px" }} />
        </div>
        {!previewMode && (
          <>
            {" "}
            <div onClick={handleColorClick} className='icon'>
              <img src='/color.png' alt='arrow' />
            </div>
            <div className='icon' onClick={() => setScene(!scene)}>
              <img
                src={scene ? "/sun_icon.png" : "/sunset_icon.png"}
                alt='arrow'
              />
            </div>
          </>
        )}
      </div>

      {/*download pdf button*/}
      <div
        className='download-pdf'
        style={{
          position: "fixed",
          bottom: "50px",
          left: "50px",
        }}
      >
        <button onClick={captureScreenshot} className='button-pdf'>
          Download PDF
        </button>
      </div>

      {/*menu button*/}
      <div
        className='menu-button'
        style={{
          position: "fixed",
          bottom: "45px",
          right: "200px",
        }}
      >
        <button onClick={toggleMenu} className='button-menu'>
          Edit Features
        </button>
      </div>
          </>
        )
     }

      {showColorContainer && !previewMode && (
        <ColorContainer show={showColorContainer} />
      )}

      {showMenu && <Menu />}
    </div>
  );
}
