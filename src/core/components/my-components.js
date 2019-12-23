export default(()=>{

    function fancySphere(offset='0 0 0',shaderName='Thruster_Shader',radius=0.4) {
        const t = document.createElement("a-sphere");
        t.setAttribute("radius", radius);
        t.setAttribute("position", offset);
        t.setAttribute("shader-frog", `name:${shaderName}`);
        return t;
      }

    function startTestRoomSound(){
        CS1.testRoomSound = document.createElement('a-sound');
        CS1.testRoomSound.object3D.position.set(-12.8,-0.27,-17.85);
        CS1.testRoomSound.setAttribute('src','https://cdn.glitch.com/d50f3652-d9fb-43fb-9fb4-8384900611e6%2Ftest_room.mp3?v=1577131969574');
        CS1.testRoomSound.setAttribute('volume',1);
        CS1.testRoomSound.setAttribute('loop',true);
        CS1.testRoomSound.setAttribute('distanceModel','exponential');
        CS1.scene.appendChild(CS1.testRoomSound);
        setTimeout(_=>{
            CS1.testRoomSound.components.sound.playSound();
        },2000);  
    }
      
    document.addEventListener('gameStart',e=>{
      
      CS1.shaderfrog.Thruster_Shader.uniforms.backgroundColor.value.r = "0.4";
      CS1.shaderfrog.Thruster_Shader.uniforms.backgroundColor.value.g = "0.1";
      CS1.shaderfrog.Thruster_Shader.uniforms.backgroundColor.value.b = "0.2";
      
      CS1.scene.appendChild(fancySphere("-20.75 2.52 -21.4"));
      CS1.scene.appendChild(fancySphere("-16.9 2.52 -21.4"));
      CS1.scene.appendChild(fancySphere("-9.21 2.52 -21.4"));
      CS1.scene.appendChild(fancySphere("-5.54 2.52 -21.4"));
      
      CS1.scene.appendChild(fancySphere("-20.75 2.52 -14.36"));
      CS1.scene.appendChild(fancySphere("-16.9 2.52 -14.36"));
      CS1.scene.appendChild(fancySphere("-9.21 2.52 -14.36"));
      CS1.scene.appendChild(fancySphere("-5.54 2.52 -14.36"));
      
      CS1.scene.appendChild(fancySphere("10.75 5.6 -23.52","Sun_Shader"));
      CS1.scene.appendChild(fancySphere("10.75 5.6 -23.52","Electric_Shader",0.65));
        
      CS1.scene.appendChild(fancySphere("5.875 5.35 -9.536","Sun_Shader",0.246));
      CS1.scene.appendChild(fancySphere("5.875 5.35 -9.536","Electric_Shader",0.4));
      
      CS1.scene.appendChild(fancySphere("8.361 5.562 -9.3","Ova_Shader",0.5));
      CS1.scene.appendChild(fancySphere("3.368 5.562 -9.3","Ova_Shader",0.5));
      
      const barrier1 = document.createElement('a-barrier','along:z');
      barrier1.setAttribute('position','-4.7 -4.4 4.4');
      barrier1.addEventListener('barrier-burn', e=>{
        console.error('BARRIER BURN!');
        CS1.stats.energyDial.changeBy(-10);
      });
      barrier1.addEventListener('barrier-deactivated', e=>{
        console.log('BARRIER DEACTIVATED!');
        startTestRoomSound();
      });
      CS1.scene.appendChild(barrier1);
         
    }); 
      
    AFRAME.registerSystem('barrier', {
     
      
      bar: function(along){
      
        const bar = document.createElement('a-cylinder');
        bar.setAttribute('height',3);
        bar.setAttribute('radius',0.16);
        bar.setAttribute('shader-frog','name:Force_Field_Shader');
        if(along=='x')
          bar.object3D.rotation.z = Math.PI/2;
        else
          bar.object3D.rotation.x = Math.PI/2;
        return bar;
      
      }
      
      
      
    });
    
    AFRAME.registerComponent('barrier', {
      schema: {
        along: {default: 'x'},
        bars: {default: 5},
        bottom: {default: 0.2},
        spread: {default: 0.9},
        autoplay: {default:true}
      },
      
      init: function(){
    
        this.playerSpeed = CS1.myPlayer.components.player.data.speed;
        this.spawnPosition = `${CS1.myPlayer.object3D.position.x} ${CS1.myPlayer.object3D.position.y} ${CS1.myPlayer.object3D.position.z}`;
        this.lastD = 1;
        this.barrierBurnEvent = new Event('barrier-burn');
        this.barrierDeactivatedEvent = new Event('barrier-deactivated');
        this.numShocks = 0;
        this.messages = ['You will only get hurt trying to force yourself through the barrier.',
                         'Oh... you do not like to listen do you.',
                         'It is time for you to take an intelligent approach.',
                         'You cannot expect different results with the same lame approach',
                         'Open the menu with the backquote key, below the escape key on a keyboard device.',
                         'Open the menu with the A button on an Oculus Quest.',
                         'Open the menu with the menu button at the top right of the screen on mobile.'];
        this.warnings = 0;
        this.isDeactivated = false;
        this.checkSolutionInterval = setInterval(_=>{
            const mps = document.querySelectorAll('.magicpellet');
            mps.forEach(mp=>{
                if(mp.object3D.position.distanceTo(this.el.object3D.position)<1){
                    this.deactivate();
                }
            });
        },1000);
        
        for(let i=0; i<this.data.bars; i++){
          const bar = this.system.bar('z');
          bar.object3D.position.y = this.data.bottom + (i*this.data.spread);
          this.el.appendChild(bar)
        }
        
    
        
        
        if(this.data.autoplay){
        
          const runOnce = e=>{
            this.el.components.sound.play();
            document.removeEventListener('click', runOnce);
          }
    
          document.addEventListener('click', runOnce);
    
    
        }
        
        
        CS1.log('\nA well placed Magic Pellet will earn you your freedom.\n')
        
      },
    
      tick: function(t,dt){
          if(this.isDeactivated)return;
          const d = CS1.myPlayer.object3D.position.distanceTo(this.el.object3D.position);
          if(d<1 && this.lastD>d){
            if(this.numShocks>3){
              this.el.components.sound__blast.playSound();
              CS1.myPlayer.setAttribute('position',this.spawnPosition);
              CS1.myPlayer.components['movement-controls'].pause();
              CS1.say(this.messages[this.warnings%this.messages.length]);
              this.warnings++;
              this.numShocks = 0;
              setTimeout(_=>{
                CS1.myPlayer.components['movement-controls'].play();
              },5000);
            }
            else
              CS1.myPlayer.components.player.setSpeed(d/4000);
            if(Math.random()<0.3){
              this.el.dispatchEvent(this.barrierBurnEvent);
              this.el.components.sound__shock.playSound();
              this.numShocks++;
            } 
            
          }else{
            CS1.myPlayer.components.player.setSpeed(this.playerSpeed);
          }
          this.lastD = d;
      },

      deactivate: function(){
        clearInterval(this.checkSolutionInterval);
        this.el.setAttribute('visible',false);
        this.el.components.sound.pauseSound();
        this.isDeactivated = true;
        this.el.components.sound__victory.playSound();
        this.el.dispatchEvent(this.barrierDeactivatedEvent);
      }
      
      
      
    });
      
    AFRAME.registerPrimitive('a-barrier', {
    
    defaultComponents: {
      
        barrier: {},
        position: {},
        sound: {
          src:'https://cdn.glitch.com/d50f3652-d9fb-43fb-9fb4-8384900611e6%2Fforce_field.mp3?v=1577118560391',
          loop:true,
          autoplay:true
        },
        sound__shock: {
          src: 'https://cdn.glitch.com/d50f3652-d9fb-43fb-9fb4-8384900611e6%2Felectric_shock.mp3?v=1577121795379'
        },
        sound__blast: {
          src: 'https://cdn.glitch.com/d50f3652-d9fb-43fb-9fb4-8384900611e6%2Fblast.mp3?v=1577128885665'
        },
        sound__victory: {
          src: 'https://cdn.glitch.com/d50f3652-d9fb-43fb-9fb4-8384900611e6%2Fvictory.mp3?v=1577131016695'
        }
      
      },
      
      mappings: {
      
       along : 'barrier.along',
       bars : 'barrier.bars',
       bottom: 'barrier.bottom',
       spread: 'barrier.spread',
       snd: 'sound.src',
       loop: 'sound.loop',
       autoplay: 'sound.autoplay',
       shock: 'sound__shock.src',
       blast: 'sound__blast.src',
       victory: 'sound__victory'
      
      }
    
    });
      
      
    })()