import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SocialMedia.css';

const socialMediaLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: 'fab fa-facebook-f' },
    { name: 'Twitter', url: 'https://www.twitter.com', icon: 'fab fa-twitter' },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: 'fab fa-instagram' },
];

const SocialMedia = () => {
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
                    <i className={link.icon} alt={`${link.name} icon`} />
                </a>
            ))}
        </div>
    );
};

export default SocialMedia;