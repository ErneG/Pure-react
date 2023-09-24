import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Carousel from './Carousel';
import fetchPet from './fetchPet';

const Details = () => {
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
                </h2>
                <button>Adopt {pet.name}</button>
                <p>{pet.description}</p>
            </div>
        </div>
    );
};

export default Details;
