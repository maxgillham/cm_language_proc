import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone'
import styled from "styled-components";
import axios, { post } from 'axios';

const TitleYel = styled.div`
  display: inline-block;
  color: #ccdbed;
  font-size: 3.5em;
  text-align: center;
`;

const SpecialButton = styled.button`
display: inline-block;
color: #045bb3;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #045bb3;
border-radius: 3px;
background-color: #ccdbed;
`;

const SpecialInput = styled(SpecialButton)`
height: 27px;
`;



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TitleYel>Welcome to Structure Pop</TitleYel>
        </header>
        <SimpleReactFileUpload />
      </div>
    );
  }
}


export class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    }).catch(e => console.log("ERRRRRR:", JSON.stringify(e)));
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'https://api.rev.ai/revspeech/v1beta/jobs';
    const formData = new FormData();
    formData.append('media',file);
    let token = "01imrH9aRwY_I8TqTzSJOjQHA4MqwsD4LrgzZK_b3USSMrhT3lumzv60Gfwp6niXZNbvDomlg0P064zLDgVO8jq-vwtK4";
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': "Bearer " + token
        }
    }
    console.log("lolololololol");
    return post(url, formData,config);
  }

  onFormServerSubmit = (e) => {
    e.preventDefault() // Stop form submit
    const url = 'https://api.rev.ai/revspeech/v1beta/jobs';
    const formData = new FormData();
    formData.append('media',this.state.file);
    let token = "01imrH9aRwY_I8TqTzSJOjQHA4MqwsD4LrgzZK_b3USSMrhT3lumzv60Gfwp6niXZNbvDomlg0P064zLDgVO8jq-vwtK4";
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': "Bearer " + token
        }
    }
    console.log("lolololololol");
    return post(url, formData,config);
  }


  render() {
    return (
      <form onSubmit={this.onFormServerSubmit}>
        <h1>File Upload</h1>
        <SpecialInput input type="file" onChange={this.onChange} />
        <SpecialButton type="submit">Upload</SpecialButton>
      </form>
   )
  }
}

export default App;
