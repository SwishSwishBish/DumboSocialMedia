import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/dumbo.png';


const DonateCard = () => {
    const { t } = useTranslation();

    return (

        <div class="col-12 text-center shadow">
            <div class="box-column">
                <div class="box-header box-header-instagram">
                    <img src={logo} width="70" alt='logo'></img>
                </div>
                <div class="box-bottom">
                    <div class="box-title instagram-title">
                        Dumbo
                    </div>
                    <div class="box-text">
                        {t('Dumbo is developed with the contributions of the participants. Do you want to support the dumbo?')}
                    </div>
                    <a href="#" target="_blank">{t('DONATE')}</a>
                </div>
            </div>
        </div>
    );
};

export default DonateCard;


