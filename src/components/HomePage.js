import React from 'react';
import { Link } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor'
var EXIF = require('exif-js');
import Hammer  from 'react-hammerjs';

class HomePage extends React.Component {

  state = {
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 200,
    height: 200,
    rotate: 0,
    profileImageDroppedScale: 1.0
  }

  handleNewImage = e => {
    var that = this;
    EXIF.getData ( e.target.files[0], function() {
      var make = EXIF.getTag(this, "Make");
      var model = EXIF.getTag(this, "Model");
      var orientation = EXIF.getTag(this,"Orientation");
      let rotatePic = 0;
      switch(orientation){
        case 8:
        rotatePic = 270;
        break;
        case 6:
        rotatePic = 90;
        break;
        case 3:
        rotatePic = 180;
        break;
        default:
        rotatePic=0;

      }
      that.setState({rotate: rotatePic});
  });
    this.setState({ image: e.target.files[0] })
  }
  onPinchOut=(e)=>{
    console.log('onPinchOut;',e);
    if(this.state.profileImageDroppedScale<3.0){
      this.setState({profileImageDroppedScale: this.state.profileImageDroppedScale+0.1})
    }
  }
  onPinchIn =(e)=>{
    console.log('onPinchIn;',e);
    if(this.state.profileImageDroppedScale>1.0){
      this.setState({profileImageDroppedScale: this.state.profileImageDroppedScale-0.1})
    }
  }
  render(){
   var options={
      recognizers:{
         pinch : { enable:true }
      }
   };
  return (
    <div>
      <h1>React Slingshot</h1>

      <h2>Get Started</h2>
      <ol>
        <li>Review the <Link to="/fuel-savings">demo app</Link></li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>
      {/* <Hammer ><div>Tap Me</div></Hammer>   */}
      <Hammer options={options} onPinchIn={this.onPinchIn} onPinchOut={this.onPinchOut}   >
        <div>
      <AvatarEditor
        image={this.state.image || "https://www.google.com.au/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
        width={450}
        height={450}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={this.state.profileImageDroppedScale}
        rotate={this.state.rotate}
      />
      </div>
      </Hammer>
       <br />
        New File:
        <input name='newImage' type='file' onChange={this.handleNewImage} />
        <br />
    </div>
  );
}
}

export default HomePage;
