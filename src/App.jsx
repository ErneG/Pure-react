import { useState, lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
});

const App = () => {
    const adoptedPet = useState(null); //in this case the whole useState hook is provided to each of the components that are wrapped in the AdoptedPetContext.Provider
    return (
        <div>
            <AdoptedPetContext.Provider value={adoptedPet}>
                <QueryClientProvider client={queryClient}>
                    <Suspense
                        fallback={
                            <div className="p-15 relative flex justify-center">
                                <h2 className="animate-spin align-middle text-8xl">
                                    🐶
                                </h2>
                            </div>
                        }
                    >
                        <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
                            <Link
                                to="/"
                                className="text-6xl text-white hover:text-gray-200"
                            >
                                Adopt Me!
                            </Link>
                        </header>
                        <Routes>
                            <Route path="/details/:id" element={<Details />} />
                            <Route path="/" element={<SearchParams />} />
                        </Routes>
                    </Suspense>
                </QueryClientProvider>
            </AdoptedPetContext.Provider>
        </div>
    );
};

export default App;
