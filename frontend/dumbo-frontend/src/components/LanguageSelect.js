import React from 'react';
import { useTranslation } from "react-i18next";
import { changeLanguage } from '../api/apiCalls';

const LanguageSelect = (props) => {
    const { i18n } = useTranslation();
    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    };
    return (
        <div className='d-flex flex-row-reverse container mb-2'>
            <img className="p-0" style={{ cursor: 'pointer' }} src="https://img.icons8.com/color/30/000000/usa-circular.png" alt="usa flag" onClick={() => onChangeLanguage('en')} />
            <img className="p-0" style={{ cursor: 'pointer' }} src="https://img.icons8.com/fluency/30/000000/turkey-circular.png" alt="turkish flag" onClick={() => onChangeLanguage('tr')} />
        </div>
    );
};

export default LanguageSelect;