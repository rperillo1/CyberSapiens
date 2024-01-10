import {
    useState,
    useCallback,
} from 'react';

import axios from 'axios';
import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

/**
 * Custom hook to call a web API using bearer token obtained from MSAL
 * @param {PopupRequest} msalRequest 
 * @returns 
 */
const useFetchWithMsal = (msalRequest) => {
    const { instance } = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const { result, error: msalError } = useMsalAuthentication(InteractionType.Popup, {
        ...msalRequest,
        account: instance.getActiveAccount(),
        redirectUri: '/'
    });

    /**
     * Execute a fetch request with the given options
     * @param {string} method: GET, POST, PUT, DELETE
     * @param {String} endpoint: The endpoint to call
     * @param {Object} data: The data to send to the endpoint, if any 
     * @returns JSON response
     */
    const execute = async (method, endpoint, data = null) => {
        console.log('hit in execute')
        if (msalError) {
            setError(msalError);
            return;
        }

        if (result) {
            console.log('hit in result')
            try {
                let response = null;
                const headers = {}
                headers.Authorization = `Bearer ${result.accessToken}`;
                headers['x-functions-key'] = process.env.REACT_APP_CHARACTER_FUNCTION_KEY;

                if (data) headers['Content-Type'] = 'application/json';

                let options = {
                    method: method,
                    headers: headers,
                    body: data ? JSON.stringify(data) : null,
                };

                setIsLoading(true);
                console.log('options: ', options, 'endpoint: ', endpoint, 'method: ', method)
                response = await axios({
                    method: method, // 'GET', 'POST', etc.
                    url: endpoint,
                    headers: options.headers,
                    data: options.body // for POST, PUT requests
                });

                console.log("res: ", response.data)
                setData(response.data);
                setIsLoading(false);
                return response.data;
            } catch (e) {
                console.log('error: ', e)
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
    };

    return {
        isLoading,
        error,
        data,
        execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
    };
};

export default useFetchWithMsal;