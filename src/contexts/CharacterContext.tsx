
import React, { createContext, useState } from 'react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';

const FUNCTION_KEY = process.env.REACT_APP_FUNCTION_KEY;
const CHARACTER_READ_SCOPE = process.env.REACT_APP_CHARACTER_READ_SCOPE;

// interface Character {
//     name: string;
//     level: number;
//     class: string;
// }

interface Character {

}

interface CharacterContextProps {
    character: Character | null;
    getCharacter: (id: number) => void;
}

export const CharacterContext = createContext<CharacterContextProps>({
    character: null,
    getCharacter: () => { },
});

const CharacterProvider = ({ children }) => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [errorString, setErrorString] = useState<String | null>(null);

    const { error, execute } = useFetchWithMsal({
        scopes: [CHARACTER_READ_SCOPE],
    });

    const getCharacter = async (id: number) => {
        console.log('hit getCharacter in context')
        try {
            const response = await execute("GET", "https://cybersapien-api-service.azurewebsites.net/api/character");
            console.log('response: ', response);
            setCharacter(response);
        } catch (err) {
            console.log('error: ', error);
            setErrorString(error);
        }
    };

    return (
        <CharacterContext.Provider value={{ character, getCharacter }}>
            {children}
        </CharacterContext.Provider>
    );
};

export default CharacterProvider;
