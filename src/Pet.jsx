// import React from "react";

// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);
// };
import { Link } from 'react-router-dom';

const Pet = ({ name, animal, breed, images, location, id }) => {
    let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';

    if (images.length) {
        hero = images[0];
    }

    return (
        <Link to={`/details/${id}`} className="relative block">
            {/*  Link is used because this way, the page is not reloaded each time the user clicks*/}
            <div className="image-container">
                <img src={hero} alt={name} />
            </div>
            <div className="b absolute bottom-0 left-0 rounded-tr-xl bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
                <h1>{name}</h1>
                <h2>{`${animal} - ${breed} - ${location}`}</h2>
            </div>
        </Link>
    );
};

export default Pet;
