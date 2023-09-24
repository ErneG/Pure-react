const fetchPet = async ({ queryKey }) => {
    const animal = queryKey[1];

    if (!animal) return [];

    const apiRes = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );

    if (!apiRes.ok) {
        throw new Error(`breeds/${animal} fetch not OK`);
    }

    return apiRes.json(); // returns a promise
};

export default fetchPet;
