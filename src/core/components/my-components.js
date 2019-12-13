export default(()=>{
  
function fancySphere(offset='0 0 0',shaderName='Thruster_Shader',radius=0.4) {
    const t = document.createElement("a-sphere");
    t.setAttribute("radius", radius);
    t.setAttribute("position", offset);
    t.setAttribute("shader-frog", `name:${shaderName}`);
    return t;
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
     
});   

AFRAME.registerComponent('mycomponent', {
  schema: {
    myproperty: {default: true}
  },
  
  init: function(){
    
  }
});
  
})()