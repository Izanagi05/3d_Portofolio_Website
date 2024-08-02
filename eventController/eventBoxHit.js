import { 
  camera,
  raycaster,
  mouse,  
} from "../threeConfig.js";
import {
  changeTexture,
  playSound,
  setMaterialProperties,
  createVideoTexture,
  animateCamera
} from "../MethodControl/methodControl.js";

import state from "../MethodControl/variableData.js";
const { meshes: meshState, materials, status } = state;
// }
function loadMeshesDataBeforeClick(meshes) {
  console.log("sss", meshes);

  meshState.arcade1 = meshes?.children[0]?.children[0]?.children[5];
  meshState.layararcade1 =
    meshes?.children[0]?.children[0]?.children[5]?.children[0];
  meshState.layarTv1 = meshes?.children[0]?.children[0]?.children[40];
  meshState.layar1Kecil = meshes?.children[0]?.children[0]?.children[41];
  meshState.layar1Lojong = meshes?.children[0]?.children[0]?.children[42];

  meshState.lamin1 = meshes?.children[0]?.children[0]?.children[32];
  meshState.lamin2 = meshes?.children[0]?.children[0]?.children[33];
  meshState.lamin3 = meshes?.children[0]?.children[0]?.children[34];
  meshState.lamin4 = meshes?.children[0]?.children[0]?.children[35];
  meshState.lamin5 = meshes?.children[0]?.children[0]?.children[36];
  meshState.laminJong = meshes?.children[0]?.children[0]?.children[37];

  meshState.laykul = meshes?.children[0]?.children[0]?.children[43];
  meshState.pilkul1 = meshes?.children[0]?.children[0]?.children[55];
  meshState.pilkul2 = meshes?.children[0]?.children[0]?.children[56];
  meshState.pilkul3 = meshes?.children[0]?.children[0]?.children[57];
  meshState.pilkul4 = meshes?.children[0]?.children[0]?.children[58];
  meshState.pilkul5 = meshes?.children[0]?.children[0]?.children[59];
  meshState.pilkul6 = meshes?.children[0]?.children[0]?.children[60];
  meshState.hitback = meshes?.children[0]?.children[0]?.children[23];
  meshState.hitresult = meshes?.children[0]?.children[0]?.children[53];

  meshState.hitstack = meshes?.children[0]?.children[0]?.children[73];
  meshState.hitinterest = meshes?.children[0]?.children[0]?.children[27];
  meshState.hitabout = meshes?.children[0]?.children[0]?.children[0];
  meshState.hitig = meshes?.children[0]?.children[0]?.children[26];
  meshState.hitlinkedin = meshes?.children[0]?.children[0]?.children[47];
  meshState.hitgithub = meshes?.children[0]?.children[0]?.children[21];
  meshState.hitgmail = meshes?.children[0]?.children[0]?.children[22];
  meshState.backtvhit = meshes?.children[0]?.children[0]?.children[8];

  meshState.hitProject = meshes?.children[0]?.children[0]?.children[64];
  meshState.hitHome = meshes?.children[0]?.children[0]?.children[69];
  meshState.hitAboutMe = meshes?.children[0]?.children[0]?.children[65];
  meshState.hitArticle = meshes?.children[0]?.children[0]?.children[66];
  meshState.hitCredit = meshes?.children[0]?.children[0]?.children[67];

  meshState.meshbuttonhit = [
    meshState.layararcade1,
    meshState.layarTv1,
    meshState.layar1Kecil,
    meshState.layar1Lojong,
    meshState.lamin1,
    meshState.lamin2,
    meshState.lamin3,
    meshState.lamin4,
    meshState.lamin5,
    meshState.laminJong,
    meshState.laykul,
    meshState.pilkul1,
    meshState.pilkul2,
    meshState.pilkul3,
    meshState.pilkul4,
    meshState.pilkul5,
    meshState.pilkul6,
    meshState.hitback,
    meshState.hitresult,
    meshState.hitstack,
    meshState.hitinterest,
    meshState.hitabout,
    meshState.hitig,
    meshState.hitlinkedin,
    meshState.hitgithub,
    meshState.hitgmail,
    meshState.backtvhit,
    meshState.hitProject,
    meshState.hitHome,
    meshState.hitAboutMe,
    meshState.hitArticle,
    meshState.hitCredit,
  ];

  materials.push(
    meshes?.children[0]?.children[0]?.children[64]?.material,
    // meshes?.children[0]?.children[0]?.children[64]?.children[1]?.material,
    meshes?.children[0]?.children[0]?.children[69]?.material,
    // meshes?.children[0]?.children[0]?.children[69]?.children[1]?.material,
    meshes?.children[0]?.children[0]?.children[65]?.material,
    // meshes?.children[0]?.children[0]?.children[65]?.children[1]?.material,
    meshes?.children[0]?.children[0]?.children[66]?.material,
    // meshes?.children[0]?.children[0]?.children[66]?.children[1]?.material,
    meshes?.children[0]?.children[0]?.children[67]?.material,
    // meshes?.children[0]?.children[0]?.children[67]?.children[1]?.material,
    meshes?.children[0]?.children[0]?.children[55]?.material,
    meshes?.children[0]?.children[0]?.children[56]?.material,
    meshes?.children[0]?.children[0]?.children[57]?.material,
    meshes?.children[0]?.children[0]?.children[58]?.material,
    meshes?.children[0]?.children[0]?.children[59]?.material,
    meshes?.children[0]?.children[0]?.children[60]?.material,
    meshes?.children[0]?.children[0]?.children[23]?.material,
    meshes?.children[0]?.children[0]?.children[53]?.material
  );
  const defaultTextureKulkas = "";
  const defaultTextureLayar1Kecil = "";
  const defaultTextureLayar1 = "";
  const defaultTextureLayarArcade1 = "";

createVideoTexture(meshState.layar1Kecil, '../layar1/tvkecil/vid2.mp4',9,0.5,true);
createVideoTexture(meshState.layar1Lojong, '../layar1/tvkecil/vid1.mp4',3,0.5,false);


  // changeTexture(meshState.layar1Lojong, "../layar1/tvkecil/41.png",  1.43,1,0.4,0.9);
  changeTexture(meshState.laykul, "../kulkas/kpcov.png",  1.43,1,0.4,0.9);
  // changeTexture(meshState.layar1Kecil, "../layar1/tvkecil/3.mp4",  1.43,1,0.4,0.9);
  changeTexture(meshState.layarTv1, "../layar1/cover.png",  1.43,1,0.4,0.9);
  changeTexture(meshState.layararcade1, "../credit/1.png", 1.1,0.9);
  changeTexture(meshState.lamin1, "../layar1/tvkecil/2.png", 1.1,0.6);
  changeTexture(meshState.lamin2, "../layar1/tvkecil/3.png", 1.1,0.6);
  changeTexture(meshState.lamin3, "../layar1/tvkecil/4.png", 1.1,0.5);
  changeTexture(meshState.lamin4, "../layar1/tvkecil/1.png", 1.1,0.6);
  changeTexture(meshState.lamin5, "../layar1/tvkecil/5.png", 1.1,0.6);
  // changeTexture(meshState.layar1Kecil, "../layar1/tvkecil/5.png", 1.1,0.6);
  changeTexture(meshState.laminJong, "../layar1/tvkecil/6.png", 1.1,0.6);

  console.log("asdw2", materials);
  setMaterialProperties(materials);
}
function onMouseClick(meshes, controls) {
  
  window.addEventListener('click', (event) =>
    {
      controls.minDistance = 2;  // Jarak minimum dari kamera ke target
      controls.maxDistance = 50;
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    const pointerOffsetY = 2;  
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY - pointerOffsetY) / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera); 
  meshHitButton(raycaster, meshState.meshbuttonhit);
})
}
function meshHitButton(raycaster, object) {
  const intersects = raycaster.intersectObjects(object); 
  if (intersects.length > 0) {
    const objectDataa = intersects[0]?.object;
    switch (objectDataa.name) {
      case "laykul":
        playSound("audio/kliksound.mp3", false, 2, 1); 
        status.laykulHit = true;
        if (status.laykulHit) {
          console.log("Laykul terkunci");
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        } else {
          console.log("Laykul hit");
        }
        break;
      case "pil1kul":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          status.laykullinkhit = 1;
          console.log("Pilkul 1 hit!");
          if (status.laykulnexthit) {
          } else {
            changeTexture(meshState.laykul, "../kulkas/kp1.png",   1.43,1,0.4,0.9);
          }
          status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
        }
        break;
      case "pil2kul":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          status.laykullinkhit = 2;
          console.log("Pilkul 2 hit!");
          if (status.laykulnexthit) {
          } else {
            changeTexture(meshState.laykul, "../kulkas/kp2.png",  1.43,1,0.4,0.9);
          }
          status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
        }
        break;
      case "pil3kul":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          status.laykullinkhit = 3;
          console.log("Pilkul 3 hit!");
          if (status.laykulnexthit) {
          } else {
            changeTexture(meshState.laykul, "../kulkas/kp3.png",  1.43,1,0.4,0.9);
          }
          status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
        }
        break;
      case "pil4kul":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          status.laykullinkhit = 4;
          console.log("Pilkul 4 hit!");
          if (status.laykulnexthit) {
          } else {
            changeTexture(meshState.laykul, "../kulkas/kp4.png",  1.43,1,0.4,0.9);
          }
          status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
        }
        break;
      case "pil5kul":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          console.log("Pilkul 5 hit!");
          status.laykullinkhit = 5;
          if (status.laykulnexthit) {
          } else {
            changeTexture(meshState.laykul, "../kulkas/kp5.png",  1.43,1,0.4,0.9);
          }
          status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
        }
        break;
      case "pil6kul":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          status.laykullinkhit = 6;
          console.log("Pilkul 6 hit!");
          if (status.laykulnexthit) {
          } else {
            changeTexture(meshState.laykul, "../kulkas/kp6.png",  1.43,1,0.4,0.9);
          }
          status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
        }
        break;
      case "hitbackkulk":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          status.laykullinkhit = 0;
          console.log("hitback hit!");
          if (!status.laykulnexthit) {
            status.laykulHit = false;
            changeTexture(meshState.laykul, "../kulkas/kpcov.png",  1.43,1,0.4,0.9);
            animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
            console.log("laykul false out 2kali");
          } else {
            console.log("laykul masih true out 1kali");
            changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          }
          status.laykulnexthit = false;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        }
        break;
      case "nextresultbox":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.laykulHit) {
          console.log("hitresult hit!");
          switch (status.laykullinkhit) {
            case 1:
              window.open("https://rplu18.vercel.app/", "_blank");
              break;
            case 2:
              window.open("https://tictactoeku.vercel.app/", "_blank");
              break;
            case 3:
              window.open(
                "https://myfirstsplinezaa005.framer.website/",
                "_blank"
              );
              break;
            case 4:
              window.open("https://gunting-kertas-batu.vercel.app/", "_blank");
              break;
            case 5:
              // window.open('https://www.example.com', '_blank');
              alert("You are already on this page");
              break;
            case 6:
              window.open("https://myintgameku1.vercel.app/", "_blank");
              break;
            default:
              if (status.laykulnexthit) {
                alert("url not valid");
              }
              break;
          }
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          status.laykulHit = true;
          changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        }
        break;
      case "layar1":
        playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit stack hit!");
        status.layartv1hit = true;
        if (status.layartv1hit) {
          console.log("layar1 terkunci");
          
        animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
          if (status.nextlayartv1hit) {
            console.log("trucy");
          } else {
            console.log("flascy");
            changeTexture(meshState.layarTv1, "../layar1/image1.png",1.43,1,0.4,0.9);
          }
        } else {
          console.log("layar1 hit");
        }
        break;
      case "abouthit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit about hit!");
        if (status.layartv1hit) {
          status.nextlayartv1hit = true;
          console.log("layar1 terkunci");
          changeTexture(meshState.layarTv1, "../layar1/image1.png",1.43,1,0.4,0.9);
        } else {
          console.log("layar1 hit");
          
          status.layartv1hit = true;
        animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
        }
        break;
      case "interesthit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit interest hit!");
        if (status.layartv1hit) {
          status.nextlayartv1hit = true;
          console.log("layar1 terkunci");
          changeTexture(meshState.layarTv1, "../layar1/image2.png", 1.43,1,0.4,0.9);
        } else {
          console.log("layar1 hit");
          
          status.layartv1hit = true;
        animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
        }
        break;
      case "stackhit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit stack hit!");
        if (status.layartv1hit) {
          status.nextlayartv1hit = true;
          console.log("layar1 terkunci");
          changeTexture(meshState.layarTv1, "../layar1/image3.png",1.43,1,0.4,0.9);
        } else {
          console.log("layar1 hit");
          status.layartv1hit = true;
        animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
        }
        break;
      case "backtvhit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Back TV hit!");
        status.layartv1hit = false;
        status.nextlayartv1hit = false;
        changeTexture(meshState.layarTv1, "../layar1/cover.png", 1.43,1,0.4,0.9);
        animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
        break;
      case "ighit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.layartv1hit) {
          window.open("https://www.instagram.com/z.frs_slm05", "_blank");
          console.log("Hit IG hit!");
        }

        break;
      case "linkedinhit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.layartv1hit) {
          window.open(
            "https://www.linkedin.com/in/izanagi-faris-aslam-2b81842a2/",
            "_blank"
          );
          console.log("Hit LinkedIn hit!");
        }else{
          status.layartv1hit = true;
          animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
        }
        break;
      case "githubhit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.layartv1hit) {
          window.open("https://github.com/Izanagi05", "_blank");
          console.log("Hit GitHub hit!");
        }else{
          status.layartv1hit = true;
          animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
        }
        break;
      case "gmailhit":
        playSound("audio/kliksound.mp3", false, 2, 1);
        if (status.layartv1hit) {
          window.open("mailto:izanagifarisaslam@gmail.com", "_blank");
          console.log("Hit Gmail hit!");
        }else{
          status.layartv1hit = true;
          animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
        }
        break;
      case "layararcoren":
        playSound("audio/creditsound.mp3", false, 0.5, 3);
        if (status.layarcadehit == 0) {
          
          status.layarcadehit = 1;
          changeTexture(meshState.layararcade1, "../credit/2.png", 1.1,0.9);
          animateCamera({x: 4.47,y: 4.06, z: 0.76}, {x: -1.46, y: 3.07, z: 0.63}, false)
        } else {
          changeTexture(meshState.layararcade1, "../credit/1.png", 1.1,0.9);
          animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
          status.layarcadehit = 0;
        }
        break;
      case "layar1kecil":
        console.log("Layar 1 kecil hit!");
        break;
      case "layarlonjong1":
        console.log("Layar 1 lonjong hit!");
        break;
      case "lamin1":
        console.log("Lamin 1 hit!");
        break;
      case "lamin2":
        console.log("Lamin 2 hit!");
        break;
      case "lamin3":
        console.log("Lamin 3 hit!");
        break;
      case "lamin4":
        console.log("Lamin 4 hit!");
        break;
      case "lamin5":
        console.log("Lamin 5 hit!");
        break;
      case "laminjong":
        console.log("Laminjong hit!");
        break;
      case "plan1":
        console.log("Hit project hit!");
        playSound("audio/kliksound.mp3", false, 2, 1);
        status.laykulHit = true;
        animateCamera({x: -8.61,y: 3.80, z: -0.34}, { x: 0.62, y: 3.32, z: -0.36}, false)
        changeTexture(meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        break;
      case "planhome": 
      playSound("audio/kliksound.mp3", false, 2, 1);
        animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
        console.log("Hit home hit!");
        break;
      case "plan3":
        // -6.53, 10.03, 3.43
        console.log("Hit about me hit!");
        playSound("audio/kliksound.mp3", false, 2, 1);
        animateCamera({  x: -6.40,y: 10.09, z: 3.51,}, { x: 30.02, y: 9.79, z: 3.07}, false) 
        changeTexture(meshState.layarTv1, "../layar1/image1.png",1.43,1,0.4,0.9);
        break;
      case "planarct":
        console.log("Hit article hit!");
        playSound("audio/kliksound.mp3", false, 2, 1);
        window.open('https://www.youtube.com/watch?v=q-Y0bnx6Ndw','_blank')
        break;
      case "plancredit":
        console.log("Hit credit hit!");
        playSound("audio/kliksound.mp3", false, 2, 1);
        animateCamera({x: 4.47,y: 4.06, z: 0.76}, {x: -1.46, y: 3.07, z: 0.63}, false)
        break;
      default:
        console.log("Unknown hit:", objectDataa);
    }
  }
  // https://www.linkedin.com/in/izanagi-faris-aslam-2b81842a2/
}
// }

// function checkIntersections(raycaster, object) {
//   for (let i = 0; i < object.length; i++) {
//     const intersects = raycaster.intersectObject(object[i]);
//     console.log("ss", intersects);
//     if (intersects.length > 0) {
//       const objectName = intersects[0]?.object?.name;
//       switch (objectName) {
//         case "layar1":
//           console.log("Layar TV 1 hit!");
//           break;
//         case "layar1kecil":
//           console.log("Layar 1 kecil hit!");
//           break;
//         case "layarlonjong1":
//           console.log("Layar 1 lonjong hit!");
//           break;
//         case "lamin1":
//           console.log("Lamin 1 hit!");
//           break;
//         case "lamin2":
//           console.log("Lamin 2 hit!");
//           break;
//         case "lamin3":
//           console.log("Lamin 3 hit!");
//           break;
//         case "lamin4":
//           console.log("Lamin 4 hit!");
//           break;
//         case "lamin5":
//           console.log("Lamin 5 hit!");
//           break;
//         case "laminjong":
//           console.log("Laminjong hit!");
//           break;
//         case "plan1":
//           console.log("Hit project hit!");
//           break;
//         case "planhome":
//           console.log("Hit home hit!");
//           break;
//         case "pipa2":
//           console.log("Hit about me hit!");
//           break;
//         case "planarct":
//           console.log("Hit article hit!");
//           break;
//         case "plancredit":
//           console.log("Hit credit hit!");
//           break;
//         default:
//           console.log("Unknown hit:", objectName);
//       }
//       // changeMeshTexture();
//       // return 0
//     }
//   }
// }

export { onMouseClick, loadMeshesDataBeforeClick };
