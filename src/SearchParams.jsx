import { useState, useEffect } from 'react';

import useBreedList from './useBreedList';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

let counter = 0;

export const SearchParams = () => {
    counter++;
    const [location, setLocation] = useState('');
    const [animal, setAnimal] = useState('');
    const [breed, setBreed] = useState('');
    const [pets, setPets] = useState([]);

    const [breeds] = useBreedList(animal);

    useEffect(() => {
        requestPets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();
        setPets(json.pets);
    }

    return (
        <div className="search-params">
            <h2>{counter}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    requestPets();
                }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        id={location}
                        placeholder="Location"
                        value={location}
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed('');
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option value={animal} key={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        disabled={breeds.length === 8}
                        onChange={(e) => {
                            setBreed(e.target.value);
                        }}
                    >
                        {breeds.map((breed) => (
                            <option value={breed} key={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;
