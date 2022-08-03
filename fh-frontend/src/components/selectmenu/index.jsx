import React, { useState } from 'react'

import * as selectmenuStyles from './styles';

export default function SelectMenu({ placeholder, choices, ...props }) {
    var [menuExpanded, setMenuExpanded] = useState(false);
    
    return (
        <>
            <selectmenuStyles.bar onClick={() => setMenuExpanded(!menuExpanded)}>{placeholder}</selectmenuStyles.bar>
            {(menuExpanded && choices.length > 0) && <>
                <selectmenuStyles.choices>
                    {choices.map((choice, index) => (
                        <selectmenuStyles.choice key={`SMCx${index + 1}`} onClick={choice.onSelect}>{choice.name}</selectmenuStyles.choice>
                    ))}
                </selectmenuStyles.choices>
            </>}
        </>
    );
};