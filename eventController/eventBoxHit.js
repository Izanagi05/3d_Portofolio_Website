import { 
  camera,
  raycaster,
  mouse,  
} from "../threeConfig.js";
import  MethodControl from "../MethodControl/methodControl.js";
import VariableDataMesh from "../MethodControl/variableData.js";
 
// }
class EventBoxHit{
  constructor(){ 
    this.methodControl=new MethodControl()
    this.variableData= new VariableDataMesh()  
    this.objectDataa=null
    this.meshState=this.variableData.state?.meshes;
    this.status=this.variableData.state?.status;
    this.materials=this.variableData.state?.materials;
  }
 loadMeshesDataBeforeClick(meshes) {
  console.log("sss", meshes);

  this.meshState.arcade1 = meshes?.children[0]?.children[0]?.children[5];
  this.meshState.layararcade1 =
    meshes?.children[0]?.children[0]?.children[5]?.children[0];
  this.meshState.layarTv1 = meshes?.children[0]?.children[0]?.children[40];
  this.meshState.layar1Kecil = meshes?.children[0]?.children[0]?.children[41];
  this.meshState.layar1Lojong = meshes?.children[0]?.children[0]?.children[42];

  this.meshState.lamin1 = meshes?.children[0]?.children[0]?.children[32];
  this.meshState.lamin2 = meshes?.children[0]?.children[0]?.children[33];
  this.meshState.lamin3 = meshes?.children[0]?.children[0]?.children[34];
  this.meshState.lamin4 = meshes?.children[0]?.children[0]?.children[35];
  this.meshState.lamin5 = meshes?.children[0]?.children[0]?.children[36];
  this.meshState.laminJong = meshes?.children[0]?.children[0]?.children[37];

  this.meshState.laykul = meshes?.children[0]?.children[0]?.children[43];
  this.meshState.pilkul1 = meshes?.children[0]?.children[0]?.children[55];
  this.meshState.pilkul2 = meshes?.children[0]?.children[0]?.children[56];
  this.meshState.pilkul3 = meshes?.children[0]?.children[0]?.children[57];
  this.meshState.pilkul4 = meshes?.children[0]?.children[0]?.children[58];
  this.meshState.pilkul5 = meshes?.children[0]?.children[0]?.children[59];
  this.meshState.pilkul6 = meshes?.children[0]?.children[0]?.children[60];
  this.meshState.hitback = meshes?.children[0]?.children[0]?.children[23];
  this.meshState.hitresult = meshes?.children[0]?.children[0]?.children[53];

  this.meshState.hitstack = meshes?.children[0]?.children[0]?.children[73];
  this.meshState.hitinterest = meshes?.children[0]?.children[0]?.children[27];
  this.meshState.hitabout = meshes?.children[0]?.children[0]?.children[0];
  this.meshState.hitig = meshes?.children[0]?.children[0]?.children[26];
  this.meshState.hitlinkedin = meshes?.children[0]?.children[0]?.children[47];
  this.meshState.hitgithub = meshes?.children[0]?.children[0]?.children[21];
  this.meshState.hitgmail = meshes?.children[0]?.children[0]?.children[22];
  this.meshState.backtvhit = meshes?.children[0]?.children[0]?.children[8];

  this.meshState.hitProject = meshes?.children[0]?.children[0]?.children[64];
  this.meshState.hitHome = meshes?.children[0]?.children[0]?.children[69];
  this.meshState.hitAboutMe = meshes?.children[0]?.children[0]?.children[65];
  this.meshState.hitArticle = meshes?.children[0]?.children[0]?.children[66];
  this.meshState.hitCredit = meshes?.children[0]?.children[0]?.children[67];

  this.meshState.meshbuttonhit = [
    this.meshState.layararcade1,
    this.meshState.layarTv1,
    this.meshState.layar1Kecil,
    this.meshState.layar1Lojong,
    this.meshState.lamin1,
    this.meshState.lamin2,
    this.meshState.lamin3,
    this.meshState.lamin4,
    this.meshState.lamin5,
    this.meshState.laminJong,
    this.meshState.laykul,
    this.meshState.pilkul1,
    this.meshState.pilkul2,
    this.meshState.pilkul3,
    this.meshState.pilkul4,
    this.meshState.pilkul5,
    this.meshState.pilkul6,
    this.meshState.hitback,
    this.meshState.hitresult,
    this.meshState.hitstack,
    this.meshState.hitinterest,
    this.meshState.hitabout,
    this.meshState.hitig,
    this.meshState.hitlinkedin,
    this.meshState.hitgithub,
    this.meshState.hitgmail,
    this.meshState.backtvhit,
    this.meshState.hitProject,
    this.meshState.hitHome,
    this.meshState.hitAboutMe,
    this.meshState.hitArticle,
    this.meshState.hitCredit,
  ];

  this.materials.push(
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

this.methodControl?.createVideoTexture(this.meshState.layar1Kecil, '../layar1/tvkecil/vid2.mp4',9,0.5,true);
this.methodControl?.createVideoTexture(this.meshState.layar1Lojong, '../layar1/tvkecil/vid1.mp4',3,0.5,false);


  // this.methodControl?.changeTexture(this.meshState.layar1Lojong, "../layar1/tvkecil/41.png",  1.43,1,0.4,0.9);
  this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kpcov.png",  1.43,1,0.4,0.9);
  // this.methodControl?.changeTexture(this.meshState.layar1Kecil, "../layar1/tvkecil/3.mp4",  1.43,1,0.4,0.9);
  this.methodControl?.changeTexture(this.meshState.layarTv1, "../layar1/cover.png",  1.43,1,0.4,0.9);
  this.methodControl?.changeTexture(this.meshState.layararcade1, "../credit/1.png", 1.1,0.9);
  this.methodControl?.changeTexture(this.meshState.lamin1, "../layar1/tvkecil/2.png", 1.1,0.6);
  this.methodControl?.changeTexture(this.meshState.lamin2, "../layar1/tvkecil/3.png", 1.1,0.6);
  this.methodControl?.changeTexture(this.meshState.lamin3, "../layar1/tvkecil/4.png", 1.1,0.5);
  this.methodControl?.changeTexture(this.meshState.lamin4, "../layar1/tvkecil/1.png", 1.1,0.6);
  this.methodControl?.changeTexture(this.meshState.lamin5, "../layar1/tvkecil/5.png", 1.1,0.6);
  // this.methodControl?.changeTexture(this.meshState.layar1Kecil, "../layar1/tvkecil/5.png", 1.1,0.6);
  this.methodControl?.changeTexture(this.meshState.laminJong, "../layar1/tvkecil/6.png", 1.1,0.6);

  console.log("asdw2", this.materials);
  this.methodControl?.setMaterialProperties(this.materials);
}
 onMouseClick(meshes, controls) {
  
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
  this.meshHitButton(raycaster, this.meshState.meshbuttonhit);
})
}
 meshHitButton(raycaster, object) {
  const intersects = raycaster.intersectObjects(object); 
  if (intersects.length > 0) {
    this.objectDataa= intersects[0]?.object;
    switch (this.objectDataa.name) {
      case "laykul":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1); 
        this.status.laykulHit = true;
        if (this.status.laykulHit) {
          console.log("Laykul terkunci");
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        } else {
          console.log("Laykul hit");
        }
        break;
      case "pil1kul":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          this.status.laykullinkhit = 1;
          console.log("Pilkul 1 hit!");
          if (this.status.laykulnexthit) {
          } else {
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kp1.png",   1.43,1,0.4,0.9);
          }
          this.status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
        }
        break;
      case "pil2kul":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          this.status.laykullinkhit = 2;
          console.log("Pilkul 2 hit!");
          if (this.status.laykulnexthit) {
          } else {
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kp2.png",  1.43,1,0.4,0.9);
          }
          this.status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
        }
        break;
      case "pil3kul":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          this.status.laykullinkhit = 3;
          console.log("Pilkul 3 hit!");
          if (this.status.laykulnexthit) {
          } else {
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kp3.png",  1.43,1,0.4,0.9);
          }
          this.status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
        }
        break;
      case "pil4kul":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          this.status.laykullinkhit = 4;
          console.log("Pilkul 4 hit!");
          if (this.status.laykulnexthit) {
          } else {
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kp4.png",  1.43,1,0.4,0.9);
          }
          this.status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
        }
        break;
      case "pil5kul":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          console.log("Pilkul 5 hit!");
          this.status.laykullinkhit = 5;
          if (this.status.laykulnexthit) {
          } else {
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kp5.png",  1.43,1,0.4,0.9);
          }
          this.status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
        }
        break;
      case "pil6kul":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          this.status.laykullinkhit = 6;
          console.log("Pilkul 6 hit!");
          if (this.status.laykulnexthit) {
          } else {
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kp6.png",  1.43,1,0.4,0.9);
          }
          this.status.laykulnexthit = true;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
        }
        break;
      case "hitbackkulk":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          this.status.laykullinkhit = 0;
          console.log("hitback hit!");
          if (!this.status.laykulnexthit) {
            this.status.laykulHit = false;
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kpcov.png",  1.43,1,0.4,0.9);
            // this?.methodControl.animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
        this?.methodControl.animateCamera({  x: -13.72,y: 6.83, z: 20.12,}, { x: -0.08, y: 7.80, z: -1.22})
            console.log("laykul false out 2kali");
          } else {
            console.log("laykul masih true out 1kali");
            this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
          }
          this.status.laykulnexthit = false;
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        }
        break;
      case "nextresultbox":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.laykulHit) {
          console.log("hitresult hit!");
          switch (this.status.laykullinkhit) {
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
              if (this.status.laykulnexthit) {
                alert("url not valid");
              }
              break;
          }
        } else {
          console.log("Laykul harus dihit terlebih dahulu!");
          this.status.laykulHit = true;
          this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        }
        break;
      case "layar1":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit stack hit!");
        this.status.layartv1hit = true;
        if (this.status.layartv1hit) {
          console.log("layar1 terkunci");
          
        this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
          if (this.status.nextlayartv1hit) {
            console.log("trucy");
          } else {
            console.log("flascy");
            this.methodControl?.changeTexture(this.meshState.layarTv1, "../layar1/image1.png",1.43,1,0.4,0.9);
          }
        } else {
          console.log("layar1 hit");
        }
        break;
      case "abouthit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit about hit!");
        if (this.status.layartv1hit) {
          this.status.nextlayartv1hit = true;
          console.log("layar1 terkunci");
          this.methodControl?.changeTexture(this.meshState.layarTv1, "../layar1/image1.png",1.43,1,0.4,0.9);
        } else {
          console.log("layar1 hit");
          
          this.status.layartv1hit = true;
        this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
        }
        break;
      case "interesthit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit interest hit!");
        if (this.status.layartv1hit) {
          this.status.nextlayartv1hit = true;
          console.log("layar1 terkunci");
          this.methodControl?.changeTexture(this.meshState.layarTv1, "../layar1/image2.png", 1.43,1,0.4,0.9);
        } else {
          console.log("layar1 hit");
          
          this.status.layartv1hit = true;
        this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
        }
        break;
      case "stackhit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Hit stack hit!");
        if (this.status.layartv1hit) {
          this.status.nextlayartv1hit = true;
          console.log("layar1 terkunci");
          this.methodControl?.changeTexture(this.meshState.layarTv1, "../layar1/image3.png",1.43,1,0.4,0.9);
        } else {
          console.log("layar1 hit");
          this.status.layartv1hit = true;
        this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
        }
        break;
      case "backtvhit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        console.log("Back TV hit!");
        this.status.layartv1hit = false;
        this.status.nextlayartv1hit = false;
        this.methodControl?.changeTexture(this.meshState.layarTv1, "../layar1/cover.png", 1.43,1,0.4,0.9);
        this?.methodControl.animateCamera({  x: -13.72,y: 6.83, z: 20.12,}, { x: -0.08, y: 7.80, z: -1.22})
        // this?.methodControl.animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
        break;
      case "ighit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.layartv1hit) {
          window.open("https://www.instagram.com/z.frs_slm05", "_blank");
          console.log("Hit IG hit!");
        }

        break;
      case "linkedinhit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.layartv1hit) {
          window.open(
            "https://www.linkedin.com/in/izanagi-faris-aslam-2b81842a2/",
            "_blank"
          );
          console.log("Hit LinkedIn hit!");
        }else{
          this.status.layartv1hit = true;
          this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
        }
        break;
      case "githubhit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.layartv1hit) {
          window.open("https://github.com/Izanagi05", "_blank");
          console.log("Hit GitHub hit!");
        }else{
          this.status.layartv1hit = true;
          this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
        }
        break;
      case "gmailhit":
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        if (this.status.layartv1hit) {
          window.open("mailto:izanagifarisaslam@gmail.com", "_blank");
          console.log("Hit Gmail hit!");
        }else{
          this.status.layartv1hit = true;
          this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
        }
        break;
      case "layararcoren":
        this.methodControl?.playSound("audio/creditsound.mp3", false, 0.5, 3);
        if (this.status.layarcadehit == 0) {
          
          this.status.layarcadehit = 1;
          this.methodControl?.changeTexture(this.meshState.layararcade1, "../credit/2.png", 1.1,0.9);
          this?.methodControl.animateCamera({x: 5.61,y: 4.45, z: 1.00}, {x: -1.45, y: 3.06, z: 0.95}, false)
        } else {
          this.methodControl?.changeTexture(this.meshState.layararcade1, "../credit/1.png", 1.1,0.9);
          // this?.methodControl.animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
          
        this?.methodControl.animateCamera({  x: -13.72,y: 6.83, z: 20.12,}, { x: -0.08, y: 7.80, z: -1.22})
          this.status.layarcadehit = 0;
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
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        this.status.laykulHit = true;
        this?.methodControl.animateCamera({x: -10.17,y: 3.99, z: -0.75}, { x: 0.65, y: 3.65, z: -0.69}, false)
        this.methodControl?.changeTexture(this.meshState.laykul, "../kulkas/kppil.png",  1.43,1,0.4,0.9);
        break;
      case "planhome": 
      this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        this?.methodControl.animateCamera({x: -8.76,y: 6.02, z: 14.93}, {x:0,y:0,z:0})
        console.log("Hit home hit!");
        break;
      case "plan3":
        // -6.53, 10.03, 3.43
        console.log("Hit about me hit!");
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        this?.methodControl.animateCamera({ x: -10.03,y: 10.14, z: 3.36}, { x: 30.01, y: 9.24, z: 2.87}, false) 
        this.methodControl?.changeTexture(this.meshState.layarTv1, "../layar1/image1.png",1.43,1,0.4,0.9);
        break;
      case "planarct":
        console.log("Hit article hit!");
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        window.open('https://www.youtube.com/watch?v=q-Y0bnx6Ndw','_blank')
        break;
      case "plancredit":
        console.log("Hit credit hit!");
        this.methodControl?.playSound("audio/kliksound.mp3", false, 2, 1);
        this?.methodControl.animateCamera({x: 5.61,y: 4.45, z: 1.00}, {x: -1.45, y: 3.06, z: 0.95}, false)
        break;
      default:
        console.log("Unknown hit:", this.objectDataa);
    }
  } 
} 
}
export default EventBoxHit;
