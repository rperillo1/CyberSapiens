import {
    useState,
    useEffect,
    useContext
} from 'react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { CharacterContext } from '../contexts/CharacterContext.tsx';

// const TestData = () => {

// const { error, execute } = useFetchWithMsal({
//     scopes: ['https://csapienplayers.onmicrosoft.com/cee14050-0eea-48f2-b834-1e905024dc8f/api.read'],
// });

// const [Tdata, setTData] = useState(null);

// useEffect(() => {
//     console.log('hit')
//     if (!Tdata) {
//         execute("GET", "https://cybersapien-api-service.azurewebsites.net/api/character").then((response) => {
//             console.log('response: ', response)
//             setTData(response);
//         });
//     }
// }, [execute, Tdata])

// if (error) {
//     return <div>Error: {error.message}</div>;
// }
//     return <><div>hey</div></>
// }


export const IdTokenData = () => {
    const { character, getCharacter } = useContext(CharacterContext);

    useEffect(() => {
        console.log('hit: ', character)

        const fetchData = () => {
            if (!character) {
                try {
                    let char = getCharacter();
                } catch (error) {
                    console.log('error: ', error)
                }
            }
        };

        fetchData();
    }, [getCharacter])

    useEffect(() => {
        if (character) {
            console.log('Updated character: ', character);
        }
    }, [character]);

    return (
        <div>
            <div>hey</div>
        </div>
    );
};
