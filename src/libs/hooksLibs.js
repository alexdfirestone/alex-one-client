import React from 'react';

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