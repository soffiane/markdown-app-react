import React, { Component } from 'react'
import './App.css'
import { sampleText } from './sampleText'
import marked from 'marked'
/* projet markdown avec marked et bootstrap */

class App extends Component {
  state = {
    text: sampleText
  }

  /* utilisation du local storage : explication cycle de vie component react : monter, mise a jour, demonter
  localStorage : memoire du navigateur*/
  componentDidMount () {
      const text = localStorage.getItem('text')
      if (text) {
        this.setState({text})
      } else {
        this.setState({text: sampleText})
      }
      
  }

  componentDidUpdate () {
    /*sauvegarder le texte dans le localStorage */
      const {text} = this.state
      localStorage.setItem('text',text)
  }

  componentWillUnmount () {

  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  /* sanitize permet de ne pas prendre en compte les balises html etc... */
  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return {__html}
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <textarea value={this.state.text} name='form-control' id='' cols='30' rows='35' onChange={this.handleChange} />
          </div>
          <div className='col-sm-6'>
            {/* pratique potentiellement dangereuse car text vient de l'utilisateur et pas du dev */}
            {/*la forme avant qu'on ne renvoie la variable __html dans la methode renderText<div dangerouslySetInnerHTML={{ __html: this.renderText(this.state.text) }}/>*/}
            <div dangerouslySetInnerHTML={this.renderText(this.state.text) }/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
