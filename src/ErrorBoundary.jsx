import { Component } from 'react';
import { Link } from 'react-router-dom';

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
            return (
                <h2>
                    There was an error with this listing.{' '}
                    <Link to="/">Click here</Link> to go back to the home page
                </h2>
            );
        }
        return this.props.children; // if there is no error, render the children
    }
}

export default ErrorBoundary;
