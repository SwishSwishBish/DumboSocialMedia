import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod, apiPath, strictPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor, responseInterceptor;
        const registerInterceptors = () => {
            const updateApiCallFor = (method, url, inProgress) => {
                if (method !== apiMethod) {
                    return;
                }
                if (strictPath && url === apiPath) {
                    setPendingApiCall(inProgress);
                } else if (!strictPath && url.startsWith(apiPath)) {
                    setPendingApiCall(inProgress);
                }
            };

            requestInterceptor =
                axios.interceptors.request.use(request => {
                    const { url, method } = request;
                    updateApiCallFor(method, url, true);
                    return request;
                });

            responseInterceptor =
                axios.interceptors.response.use(
                    response => {
                        const { url, method } = response.config;
                        updateApiCallFor(method, url, false);
                        return response;
                    },
                    error => {
                        const { method, url } = error.config;
                        updateApiCallFor(method, url, false);
                        throw error;
                    }
                );
        };

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        }
    }, [apiMethod, apiPath, strictPath]);
    return pendingApiCall;
}