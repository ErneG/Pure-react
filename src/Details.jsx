import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Carousel from './Carousel';
import fetchPet from './fetchPet';
import Modal from './Modal';

const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const results = useQuery(['details', id], fetchPet); //details is the name of the cache, id is the parameter that is used in the fetchPet function, the fetchPet function is the function that is called to get the data if it is not in the cache

    if (results.isError) return <h1>Error: {results.error.message}</h1>;

    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">@</h2>
            </div>
        );
    }

    const pet = results.data.pets[0];

    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal} - {pet.breed} - {pet.city} - {pet.state}{' '}
                    <button onClick={() => setShowModal(true)}>
                        {' '}
                        Adopt {pet.name}
                    </button>
                    <p>{pet.description}</p>
                    {showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button onClick={() => setShowModal(false)}>
                                        Yes
                                    </button>
                                    <button onClick={() => setShowModal(false)}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
                </h2>
            </div>
        </div>
    );
};

function DetailsErrorBoundary() {
    return (
        <ErrorBoundary
            errorComponent={
                <h2>
                    There was an error with this listing.{' '}
                    <Link to="/">Click here</Link> to go back to the home page
                </h2>
            }
        >
            <Details />
        </ErrorBoundary>
    );
}

export default DetailsErrorBoundary;
