import { Component } from 'react';

//This error boundary component could be used to wrap any component that might throw an error, even the App component. There also could be multiple error boundaries in an app.
//A great use case for an error boundary is to wrap a third party library that you don't have control over. For example, if you are using a third party library that is not well maintained and it throws an error, you can use an error boundary to catch that error and display a message to the user.

//Another great use case for an error boundary is to wrap a component that is not well tested. For example, if you are using a component that is not well tested and it throws an error, you can use an error boundary to catch that error and display a message to the user.

//These components should be used for components with user input that are bound to throw errors. For example, if you have a form that is bound to throw an error, you can use an error boundary to catch that error and display a message to the user.

class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Typically log this to an error reporting service (TrackJS or NewRelic)
        console.log('ErrorBoundary caught an error', error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.errorComponent;
        }
        return this.props.children; // if there is no error, render the children
    }
}

export default ErrorBoundary;
