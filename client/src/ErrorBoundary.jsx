import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {hashError: false}
    }

    componentDidCatch(error, info){
        console.log(error, info);
        this.setState({hashError: true})
    }
  render() {
    if(this.state.hashError){
        return (
          <div style={{ color: "red", textAlign: "center" }}>
            <h1>Oops! Something went wrong.</h1>
            <p>
              We're sorry, but there was an error in this section of the app.
            </p>
          </div>
        );
    }
    return this.props.children
  }
}

export default ErrorBoundary