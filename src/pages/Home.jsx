import { AuthenticatedTemplate } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { Container } from 'react-bootstrap';
import { IdTokenData } from '../components/DataDisplay';
import { useEffect, useState } from 'react';
// import useFetchWithMsal from '../hooks/useFetchWithMsal';


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
    //     console.log('accounts: ', accounts)
    //     const bearerToken = instance
    //         .getActiveAccount(
    //             (account) =>
    //                 console.log('!account: ', account)
            
    //         )
            
    //     async function fetchData(url) {
    //         try {
    //             const response = await fetch(`https://cybersapien-api-service.azurewebsites.net/api/character`, {
    //                 headers: {
    //                     'x-functions-key': '2pfvUxN3khG8FqJcH-pSwyIVZW1idDJBdcG-4XdltDCBAzFuWWRsiw=='
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