import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

export const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: ''
    });
    const [animal, setAnimal] = useState('');
    const [breeds] = useBreedList(animal);

    const results = useQuery(['search', requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target); //browser api
                    const obj = {
                        animal: formData.get('animal') ?? '',
                        location: formData.get('location') ?? '',
                        breed: formData.get('breed') ?? ''
                    };

                    setRequestParams(obj);
                }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        type="text"
                        name="location"
                        id={location}
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
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
                        disabled={breeds.length === 8}
                        name="breed"
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
