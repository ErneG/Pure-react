import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement('div');
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal'); //"modal" could be any id, but it has to be the same as in index.html and can be replaced by a variable from props
        modalRoot.appendChild(elRef.current);

        return () => modalRoot.removeChild(elRef.current); // cleanup function, runs when modal is closed
    }, []); // [] means run once

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
