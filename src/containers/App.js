import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Rank from '../components/Rank/rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from '../components/FaceRecognition/faceRecognition';
import Signin from '../components/SignIn/Signin';
import Register from '../components/Register/Register';

const SERVER = 'https://murmuring-eyrie-46708.herokuapp.com/';

const app = new Clarifai.App({
  apiKey: '4c9783ae8e324028a8a2bd4cadf6ef2e'
 });

const particleOptions = {
  Particles:{
    number: {
      value: 50,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      signedIn: false,
      user: {
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  updateUser = (user) => {
    console.log(user);
    this.setState({user:{
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
    }})
  }

  onInputChange = (event) => {
    console.log('setting URL:' + event.target.value);
    this.setState({input: event.target.value});  
  }

  calculateFaceLocation = (data) =>{
    let clarifiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    let image = document.getElementById('inputImage');
    let imageWidth = Number(image.width);
    let imageHeight = Number (image.height);


    console.log(clarifiFace, imageHeight, imageWidth);

    return {
      leftCol: clarifiFace.left_col * imageWidth,
      topRow: clarifiFace.top_row * imageHeight,
      rightCol: imageWidth - (clarifiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifiFace.bottom_row * imageHeight)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
    console.log(box);
  }

  onSubmit = () => {
    console.log('setting Image state:' + this.state.input);
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(
        response => {
          const calculation = this.calculateFaceLocation(response);
          this.displayFaceBox(calculation);
        }
      ).then(fetch((SERVER+'image'), {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email: this.state.user.email
        })
          }).then(response => response.json())
            .then(data => {
              console.log('updating entries', data)
              this.setState(Object.assign(this.state.user, {entries: data}))
            })
            .catch(err=>(console.log(err)))
        )
      .catch(err =>{console.log(err)});
  }

  onRouteChange = (route) =>{
      this.setState ({route: route});
      if(route === 'home')
        this.setState({signedIn: true});
      else
        this.setState({signedIn: false});
  }

  render() {
    return (
      <div className="App">
          <Particles  className='particles'
                params={particleOptions} />
            <Navigation
              onRouteChange={this.onRouteChange}
              signedIn={this.state.signedIn}
              userInfo={this.state.user}
            />
          {(this.state.route === 'signin') ?
            <Signin 
            onRouteChange={this.onRouteChange}
            updateUser= {this.updateUser}
            />
            
            : (this.state.route === 'register')
            
            ?<Register 
              onRouteChange={this.onRouteChange}
              updateUser= {this.updateUser}
              />
            :
            <div>
              <Logo/>
              <Rank userInfo={this.state.user}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>
          }
      </div>
    );
  }
}

export default App;
export { SERVER };

