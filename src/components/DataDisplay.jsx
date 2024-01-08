import {
    useState,
    useEffect,
} from 'react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

const TestData = () => {
    const { error, execute } = useFetchWithMsal({
        scopes: ['https://csapienplayers.onmicrosoft.com/cee14050-0eea-48f2-b834-1e905024dc8f/api.read'],
    });

    const [Tdata, setTData] = useState(null);

    useEffect(() => {
        if (!Tdata) {
            execute("GET", "https://cybersapien-api-service.azurewebsites.net/api/character").then((response) => {
                console.log('response: ', response)
                setTData(response);
            });
        }
    }, [execute, Tdata])

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return <><div>{Tdata}</div></>
}


export const IdTokenData = () => {
    return (
        // <MsalAuthenticationTemplate 
        //     interactionType={InteractionType.Redirect} 
        //     authenticationRequest={{scopes: ["https://csapienplayers.onmicrosoft.com/cee14050-0eea-48f2-b834-1e905024dc8f/api.read"]}}
        // >
            // </MsalAuthenticationTemplate>
        <div>
            <TestData />
        </div>

    );
};
