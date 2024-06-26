import { useState, useContext, useDeferredValue, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';
import Results from './Results';
import AdoptedPetContext from './AdoptedPetContext';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

export const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: ''
    });
    const [animal, setAnimal] = useState('');
    const [breeds] = useBreedList(animal);
    // eslint-disable-next-line no-unused-vars
    const [adoptedPet, _] = useContext(AdoptedPetContext);

    const results = useQuery(['search', requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];
    const defferedPets = useDeferredValue(pets);
    const renderedPets = useMemo(() => {
        (<Results pets={defferedPets} />), [defferedPets];
    });

    return (
        <div className="my-0 mx-auto w-11/12">
            <form
                className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
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
                {adoptedPet ? (
                    <div className="pet image-container">
                        <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                    </div>
                ) : null}

                <label htmlFor="location">
                    Location
                    <input
                        className="search-input"
                        type="text"
                        name="location"
                        id={location}
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        className="search-input"
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
                        className="search-input grayed-out-disabled"
                        id="breed"
                        disabled={breeds.length === 0}
                        name="breed"
                    >
                        {breeds.map((breed) => (
                            <option value={breed} key={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
                    Submit
                </button>
            </form>
            {renderedPets}
        </div>
    );
};

export default SearchParams;
