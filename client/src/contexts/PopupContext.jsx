import { createContext } from 'react';

const PopupContext = createContext({
    popupOpen: false,
    setOpenPopup: ()=>{}
})

export default PopupContext