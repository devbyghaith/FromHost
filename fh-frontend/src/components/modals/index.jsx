import React from 'react'

import * as buttonStyles from '../../styles/buttons'
import * as inputStyles from '../../styles/inputs'
import * as modalStyles from "./styles"

import SelectMenu from '../selectmenu'

export default function Modal({ modalData, handleClose, ...props }) {
    return (
        <modalStyles.backdrop>
            <modalStyles.container>
                <modalStyles.title>{modalData.title}</modalStyles.title>
                {modalData.choices.map((option, index) => {
                    if (option.type === 'TEXT_INPUT') {
                        return (
                            <inputStyles.text key={`INPUTx${index + 1}`} placeholder={option.placeholder} {...option.htmlKeys} />
                        )
                    } else if (option.type === 'BUTTON') {
                        switch (option.buttonType) {
                            case "danger":
                                return <buttonStyles.danger {...option.htmlKeys}>{option.text}</buttonStyles.danger>
                            break;

                            case "success":
                                return <buttonStyles.success {...option.htmlKeys}>{option.text}</buttonStyles.success>
                            break;
                            
                            default:
                                return <buttonStyles.main {...option.htmlKeys}>{option.text}</buttonStyles.main>
                            break;
                        }
                    } else if (option.type === 'SELECT_MENU') {
                        return (
                            <SelectMenu key={`SMx${index + 1}`} placeholder={option.placeholder} choices={option.choices} />
                        )
                    };
                })}
            </modalStyles.container>
        </modalStyles.backdrop>
    );
};