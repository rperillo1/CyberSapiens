import { AuthenticatedTemplate } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { Container } from 'react-bootstrap';
import { IdTokenData } from '../components/DataDisplay';
import { useEffect, useState } from 'react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';

const apiScopeRequest = {
    scopes: ['api://5ae71ebf-253d-465e-8131-0c0a2fcd27b7/csapien.api.read'], 
    // account: userAccount, // You might need to specify the account
};

/***
 * Component to detail ID token claims with a description for each claim. For more details on ID token claims, please check the following links:
 * ID token Claims: https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token
 * Optional Claims:  https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#v10-and-v20-optional-claims-set
 */
export const Home = () => {
    const { instance, accounts } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [isTokenRequestInProgress, setTokenRequestInProgress] = useState(false);

    // useEffect(() => {
    //     console.log('instance: ', instance)
    //     async function fetchData(url) {
    //         try {
    //             const response = await fetch(`https://cybersapien-api-service.azurewebsites.net/api/character`, {
    //                 headers: {
    //                     'x-functions-key': ''
    //                 }
    //             });
    //             console.log('RES: ', response)
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             console.log('DATA: ', data)
    //             return data;
    //         } catch (error) {
    //             console.error('Error:', error);
    //             throw error;
    //         }
    //     }
    //     fetchData()
    // }, []);

    const getApiToken = async () => {
        if (accounts.length > 0 && !isTokenRequestInProgress) {
            setTokenRequestInProgress(true);
            try {
                const response = await instance.acquireTokenSilent({
                    ...apiScopeRequest,
                    account: accounts[0]
                });
                console.log('Token acquired silently: ', response.accessToken);
            } catch (error) {
                console.error('Silent token acquisition failed, acquiring token using popup', error);
                try {
                    const response = await instance.acquireTokenPopup(apiScopeRequest);
                    console.log('Token acquired via popup: ', response.accessToken);
                } catch (popupError) {
                    console.error('Token acquisition via popup failed', popupError);
                }
            } finally {
                setTokenRequestInProgress(false);
            }
        }
    };

    useEffect(() => {
  
        getApiToken();
    }, [accounts]); 

    return (
        <>
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <Container>
                        <IdTokenData idTokenClaims={activeAccount.idTokenClaims} />
                    </Container>
                ) : null}
            </AuthenticatedTemplate>
        </>
    );
};