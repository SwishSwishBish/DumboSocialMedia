import React from "react";
import defaultProfileImage from '../assets/defaultProfile.png'

const ProfileImageWithDefault = (props) => {

    const { profileimage, temp } = props;

    let imageSource = defaultProfileImage;
    if (profileimage) {
        imageSource = 'images/profile/' + profileimage;
    }

    return (
        <img {...props} src={temp || imageSource} onError={event => { event.target.src = defaultProfileImage }} />
    );
}

export default ProfileImageWithDefault;