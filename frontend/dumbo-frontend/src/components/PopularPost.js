import React from 'react';
import { useTranslation } from 'react-i18next';
const PopularPost = () => {
    const { t } = useTranslation();

    return (

        <div class="card mb-3">
            <img src="https://i.picsum.photos/id/537/536/354.jpg?hmac=9w4wLS6h9VtjcXkaIi-w9NDXNEYIpyh8tQc2H7w8Tdw" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{t('Popular post')}</h5>
                <p class="card-text">{t('Tesla and SpaceX CEO Elon Musk shared an animation simulating a manned mission to the planet Mars, which is expected to launch in 2030.')}</p>
            </div>
        </div>
    );
};

export default PopularPost;

