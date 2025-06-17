import React, { useEffect} from 'react'
import { useRef } from 'react';
import './Home.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import sunImage from './../../../public/sun.jpg'
import earthImage from './../../../public/earth.jpg'
import spaceImage from './../../../public/space.jpg'
import satellite from './../../../public/satellitebg.png'
import { Typography } from '@mui/material';
import TimeLine from './../TimeLine/TimeLine';
import moon from './../../../public/moon.png';
import {SiCplusplus,SiReact,SiJavascript,SiNodedotjs,SiExpress,SiCss3,SiHtml5,SiThreedotjs} from "react-icons/si";
import YoutubeCard from '../youtubeCard/YoutubeCard';
import { MouseOutlined } from '@mui/icons-material';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import music from './../../../public/music.mp3'
import ReactAudioPlayer from 'react-audio-player';

function Home({timelines, youtubes, skills }) {
  const canvasRef = useRef(null);
  const audioRef=useRef(null);
  const [theme,setTheme]=useState(0);
 
  
  async function handleCustomTheme(e) {
    e.preventDefault();
    if (theme == 0) {
      console.log("theme 0");
      const elements=document.getElementsByClassName('homeCanvas');
      //normal mode -> dev mode
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        el.classList.remove('homeCanvas');   
        el.classList.add('homeCanvasAlt');
        }

      e.target.innerHTML='DEV MODE';

      const userChoice = window.confirm("Do you want to play the audio?");
      if (userChoice && audioRef.current) {
        try {
          await audioRef.current.audioEl.current.play();
        } catch (err) {
          console.error("Audio play failed", err);
        }
      }
      setTheme(1);
      

    } else {
      //dev mode -. normal mode
      console.log("theme-1");
      const elements=document.getElementsByClassName('homeCanvasAlt');
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        el.classList.remove('homeCanvasAlt');
        el.classList.add('homeCanvas');    

        }
        try {
          if (audioRef.current) {
            console.log("reached to current audio");
            const audio = audioRef.current.audioEl.current;
            audio.pause();
            audio.currentTime = 0;
          }
        } catch (error) {
          console.log(error);
        }
        e.target.innerHTML='GOD MODE'
        setTheme(0)
      }
      
      
    
    

  }
  


  useEffect(()=>{
    //to pass image as texture material
    
    const textureLoader=new THREE.TextureLoader();
    const moonTexture = textureLoader.load(sunImage);
    const earthTexture=textureLoader.load(earthImage);
    const spaceTexture=textureLoader.load(spaceImage);
    const pointerTexture=textureLoader.load(satellite);
    
    //create scene for animation    
    const scene=new THREE.Scene();
  
    // Load the image (replace with your image path)
    // textureLoader.load(spaceImage, function(texture) {
    //     // Set the background to the loaded texture
    //     scene.background = texture;
    // });
    
  
    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );

    const canvas=document.querySelector(".homeCanvas");
    // if property and id name same can directly refer
    const renderer=new THREE.WebGLRenderer({canvas:canvasRef.current});
    
    const moongeometry=new THREE.SphereGeometry(5,64,64);
    const material=new THREE.MeshBasicMaterial({color:0x00ffff});
    //meshStandard material respond on light
    // const moonMaterial=new THREE.MeshStandardMaterial({color:0xffffff});
    const moonMaterial= new THREE.MeshBasicMaterial({map:moonTexture});

    const earthgeometry=new THREE.SphereGeometry(3,64,64);
    const earthMaterial= new THREE.MeshStandardMaterial({map:earthTexture});

    const pointerGeometry=new THREE.PlaneGeometry(1,1);
    const pointerMaterial=new THREE.MeshBasicMaterial({map:pointerTexture});

    //pointLight or torch
    const pointLight=new THREE.PointLight(0xffffff,20);
    pointLight.position.z=-3; 
    // pointLight.position.x=-1; 
    const pointLightHelper=new THREE.PointLightHelper(pointLight);

    const earth=new THREE.Mesh(earthgeometry,earthMaterial);
    const moon=new THREE.Mesh(moongeometry,moonMaterial);
    const pointer=new THREE.Mesh(pointerGeometry,pointerMaterial);
    
    //controls to change positon of light
    // const controls=new OrbitControls(camera,renderer.domElement);

    scene.add(earth);
    scene.add(pointLight);
    // scene.add(pointLightHelper);
    scene.add(moon);
    scene.add(pointer);
    scene.background=spaceTexture;
    var direction=0.01;
    window.addEventListener('mousemove',(e)=>{
      pointer.position.x = e.clientX/300;
      pointer.position.y = -e.clientY/200;
      if(e.clientX<window.innerWidth/2){
        
        // earth.position.x=5;
        direction=-0.01;
        
      }
      if(e.clientX>window.innerWidth/2){
        // earth.position.x=6;
        // moon.position.x=-7;
        direction=0.01;
      }
      
    });
    
    moon.position.set(-7,0,-3);
    earth.position.set(5,0,-5);
    pointer.position.set(0,0,0);

    camera.position.z=5;
    const transition=()=>{
      requestAnimationFrame(transition);
7
      earth.rotation.y+=direction*3;
      moon.rotation.y+=direction;
      // mesh.position.x+=0.01;
      // mesh.rotation.z+=0.01;
      renderer.setSize(window.innerWidth,window.innerHeight);
      renderer.render(scene,camera);

    };
    transition();
    
  },[]);
  return (
    <div className='home'>
        <canvas ref={canvasRef} className='homeCanvas'></canvas>
        <div className='homeCanvasContainer'>
          <Typography variant='h1' >
          <p>R</p>
          <p>I</p>
          <p>S</p>
          <p>H</p>
          <p>A</p>
          <p>B</p>
          <p>H</p>
          </Typography>

          <div className="homeCanvasBox">
          {/* <Typography variant="h2">DESIGNER</Typography> */}
          <Typography variant="h2">DEVELOPER</Typography>
          <ReactAudioPlayer
        ref={audioRef}
        src={music}  
        preload="auto"   
        loop={true}         
      />
          <Typography variant="h2">FREELANCER</Typography>
          {/* <Typography variant="h2">CONTRIBUTOR</Typography> */}
        </div>
        <button id='checkTheme' onClick={handleCustomTheme}>GOD MODE</button>
          <Link to="/projects" className='viewWork'>VIEW WORK</Link>
          
          
          
        </div>


        <div className="homeScrollBtn">
        <MouseOutlined />
      </div>
        
        <div className='homeContainer'>
          <Typography variant='h3' >TIMELINE</Typography>
          <TimeLine timelines={timelines} />
          
        </div>
        <div className='homeSkills'>
          <Typography variant='h3' className='text-white'>SKILLS</Typography>
          <div className='homeCubeSkills'>
            <div className='homeCubeSkillsFaces homeCubeSkillFace1'>
              <img src={skills.image1.url} alt='Face1' />
              
            </div>
            <div className='homeCubeSkillsFaces homeCubeSkillFace2'>
              <img src={skills.image2.url} alt='Face2' />
              
            </div>
            <div className='homeCubeSkillsFaces homeCubeSkillFace3'>
              <img src={skills.image3.url} alt='Face3' />
              
            </div>
            <div className='homeCubeSkillsFaces homeCubeSkillFace4'>
              <img src={skills.image4.url} alt='Face4' />
              
            </div>
            <div className='homeCubeSkillsFaces homeCubeSkillFace5'>
              <img src={skills.image5.url} alt='Face5' />
              
            </div>
            <div className='homeCubeSkillsFaces homeCubeSkillFace6'>
              <img src={skills.image6.url} alt='Face6' />
              
            </div>
          </div>
          <div className="cubeShadow">  
            
          </div>

          <div className='homeSkillsBox'>
          <SiCplusplus/>
          <SiReact/>
          <SiJavascript/>
          <SiNodedotjs/>
          <SiExpress/>
          <SiCss3/>
          <SiHtml5/>
          <SiThreedotjs/>
          </div>
          
        </div>
        <div className='homeYoutube ' >
          <Typography variant='h3'> FREELANCE PROJECTS</Typography>
          <div className='homeYoutuberWrapper'>
            {
              youtubes.map((item)=>(
                <YoutubeCard
                  image={item.image.url}
                  url={item.url}
                  title={item.title}
                  id={item._id}
                  role={item.role}
                  key={item._id}
              
                    />
              ))
            }
            
            
          </div>
        </div>
        
    </div>
  )
}

export default Home
