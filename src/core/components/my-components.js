export default(()=>{
  
function thruster(offset) {
    const t = document.createElement("a-sphere");
    t.setAttribute("radius", "0.4");
    t.setAttribute("position", offset);
    t.setAttribute("shader-frog", "name:Thruster_Shader");
    return t;
  }
  
document.addEventListener('gameStart',e=>{
  
  CS1.shaderfrog.Thruster_Shader.uniforms.backgroundColor.value.r = "0.4";
  CS1.shaderfrog.Thruster_Shader.uniforms.backgroundColor.value.g = "0.1";
  CS1.shaderfrog.Thruster_Shader.uniforms.backgroundColor.value.b = "0.2";
  
  CS1.scene.appendChild(thruster("-20.75 2.52 -21.4"));
  CS1.scene.appendChild(thruster("-16.9 2.52 -21.4"));
  CS1.scene.appendChild(thruster("-9.21 2.52 -21.4"));
  CS1.scene.appendChild(thruster("-5.54 2.52 -21.4"));
  
  CS1.scene.appendChild(thruster("-20.75 2.52 -14.36"));
  CS1.scene.appendChild(thruster("-16.9 2.52 -14.36"));
  CS1.scene.appendChild(thruster("-9.21 2.52 -14.36"));
  CS1.scene.appendChild(thruster("-5.54 2.52 -14.36"));

     
});  

AFRAME.registerComponent('mycomponent', {
  schema: {
    myproperty: {default: true}
  },
  
  init: function(){
    
  }
});
  
})()