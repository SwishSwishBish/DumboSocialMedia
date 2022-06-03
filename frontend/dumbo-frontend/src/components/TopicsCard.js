import React from 'react';
import { useTranslation } from 'react-i18next';


const TopicsCard = () => {
    const { t } = useTranslation();

    return (

        <div class="card mb-3">

            <h4 className="card-header text-center text-primary text-nowrap ">{t('Topics')}</h4>

            <ul class="list-group list-group-flush text-nowrap">
                <li class="list-group-item">Volunteers Week</li>
                <li class="list-group-item">Obi Wan Kenobi</li>
                <li class="list-group-item">Jurassic Park</li>
                <li class="list-group-item">Daily Quordle</li>
            </ul>
        </div>
    );
};

export default TopicsCard;
