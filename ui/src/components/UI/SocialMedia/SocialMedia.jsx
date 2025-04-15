import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SocialMedia.css';
import PropTypes from 'prop-types';
const socialMediaLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: 'fab fa-facebook-f' },
    { name: 'Discord', url: 'https://discord.com', icon: 'fab fa-discord' },
    { name: 'Google', url: 'https://www.google.com', icon: 'fab fa-google' },
    { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
];

const SocialMedia = ({color, bgColor}) => {
    return (
        <div className="social-media-container">
            {socialMediaLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${link.name} page`}
                >
                    <i className={link.icon} alt={`${link.name} icon`} style={{ color: color, backgroundColor: bgColor }}/>
                </a>
            ))}
        </div>
    );
};
SocialMedia.propTypes = {
    color: PropTypes.string,
    bgColor: PropTypes.string,
};

SocialMedia.defaultProps = {
    color: 'black',
    bgColor: 'white',
};
export default SocialMedia;