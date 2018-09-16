import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone'
import styled from "styled-components";
import axios, { post } from 'axios';
import { Button, Card, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import up from "./up.png";

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
      file:null,
      clicked: false
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
      <div>
        {this.state.clicked ?       <form onSubmit={this.onFormServerSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <SpecialButton type="submit" onClick={() => this.setState({clicked: true})}>Upload</SpecialButton>
              </form>
              :

            <div>
                <div style={{marginRight: 115, marginTop: 25}}>
                  <h2 style={{display: 'inline'}}>Salesperson: </h2><p style={{display: 'inline', paddingRight: 450}}>  "Hello"</p>
                </div>
                <br/> <hr/>
                <h2 style={{display: 'inline'}}>Client:</h2><p style={{display: 'inline'}}>  "Hello"</p>
                <div style={{position: 'absolute', right: 0, top: 100}}>
                <Card>
                  <Card.Content>
                    <Image floated='right' size='mini' src={up}/>
                    <Card.Header>Jenny Lawrence</Card.Header>
                    <Card.Meta>Sentiment Rating: 95%</Card.Meta>
                    <Card.Description>Jenny sounds interested in APPL Stock!</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green'>
                        Agree
                      </Button>
                      <Button basic color='red'>
                        Disagree
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
                </div>
                <br/>
                <br/>
                <br/>
                <br/> <hr/> <hr/>
              <div style={{marginRight: 115, marginTop: 125}}>
                <h2 style={{display: 'inline'}}>Salesperson: </h2><p style={{display: 'inline', paddingRight: 450}}>  "Hello"</p>
              </div>
              <br/> <hr/>
              <h2 style={{display: 'inline'}}>Client:</h2><p style={{display: 'inline'}}>  "Hello"</p>
              <div style={{position: 'absolute', right: 0, top: 395}}>
              <Card>
                <Card.Content>
                  <Image floated='right' size='mini' src={up}/>
                  <Card.Header>Jenny Lawrence</Card.Header>
                  <Card.Meta>Sentiment Rating: 95%</Card.Meta>
                  <Card.Description>Jenny sounds interested in APPL Stock!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Agree
                    </Button>
                    <Button basic color='red'>
                      Disagree
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              </div>
              <br/>
              <br/>
              <br/>
              <br/> <hr/> <hr/>
              <div style={{marginRight: 115, marginTop: 125}}>
                <h2 style={{display: 'inline'}}>Salesperson: </h2><p style={{display: 'inline', paddingRight: 450}}>  "Hello"</p>
              </div>
              <br/> <hr/>
              <h2 style={{display: 'inline'}}>Client:</h2><p style={{display: 'inline'}}>  "Hello"</p>
              <div style={{position: 'absolute', right: 0, top: 675}}>
              <Card>
                <Card.Content>
                  <Image floated='right' size='mini' src={up}/>
                  <Card.Header>Jenny Lawrence</Card.Header>
                  <Card.Meta>Sentiment Rating: 95%</Card.Meta>
                  <Card.Description>Jenny sounds interested in APPL Stock!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Agree
                    </Button>
                    <Button basic color='red'>
                      Disagree
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              </div>
            </div>}
      </div>

   )
  }
}

export default App;
