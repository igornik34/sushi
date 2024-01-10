import { createContext } from "react";

const UserContext = createContext({
    name: '',
    phone_number: '',
    city: '',
    street: '',
    home: '',
    userFilled: false,
    setInfo: (info) => {}
})

export default UserContext