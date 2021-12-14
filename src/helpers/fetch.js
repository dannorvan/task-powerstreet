import {URL_BACK_API} from "@/helpers/constantes";


const fetchApiLogin = async (endpoint, body, method = 'POST') => {
        return await fetch(`${URL_BACK_API}/${endpoint}`,{
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...body}),
    });
}


export {
    fetchApiLogin
}