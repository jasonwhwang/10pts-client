import React from 'react'
import { logOut } from '../../../services/authApi'

class ErrorBoundary extends React.Component {
    state = {
      error: null,
      errorInfo: null
    }

    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      console.log(error)
      console.log(errorInfo)
    }

    async componentDidUpdate() {
      if(this.state.error || this.state.errorInfo) await logOut()
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return <h4 className="box-margin-15">Something went wrong.</h4>
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

  export default ErrorBoundary