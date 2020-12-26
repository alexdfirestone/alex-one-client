import React, { useEffect } from 'react';

export function useFormFields(initalState){
    const [fields, setValues] = React.useState(initalState);

    return [
        fields,
        function(event){
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}


export function useFetch(url, options){
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsloading] = React.useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setIsloading(false);
            } catch(error) {
                setError(error);
            }
        };
        fetchData();
    }, []);
    return { response, error, isLoading };
};