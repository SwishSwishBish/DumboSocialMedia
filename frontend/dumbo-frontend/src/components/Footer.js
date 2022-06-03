import React from 'react';
import { useTranslation } from "react-i18next";

const LanguageSelect = (props) => {
    const { t } = useTranslation();

    return (
        <footer className="nb-footer fixed-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="about">
                            <div className="social-media">
                                <ul className="social-list">
                                    <li><a href="https://github.com/SwishSwishBish" title="" target="_blank"><img src="https://img.icons8.com/ios/35/undefined/github--v1.png" /></a></li>
                                    <li><a href="https://www.linkedin.com/in/sena-atak%C3%B6%C5%9Fker-3a79b0235/" title="" target="_blank"><img src="https://img.icons8.com/ios/35/undefined/linkedin-circled--v1.png" /></a></li>
                                    <li><a href="https://twitter.com/SenaAtakosker" title="" target="_blank"><img src="https://img.icons8.com/ios/35/undefined/twitter-circled--v1.png" /></a></li>
                                    <li><a href="https://www.facebook.com/theyoungturk/" title="" target="_blank"><img src="https://img.icons8.com/ios/35/undefined/facebook-circled--v1.png" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <p>Copyright © 2022. Sena Atakosker</p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default LanguageSelect;