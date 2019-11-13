import React from 'react';
import Helmet from 'react-helmet';

const PageTitle = ({ title }) => {
    var defaultTitle = 'Dreamsgate-Default';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};

export default PageTitle;
