import React from "react";
import Helmet from "react-helmet";

const MetaData = ({title}) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
};
export default MetaData;

// The <Helmet> tag in React is used for managing the metadata of the document, 
//such as the <title>, <meta>, <link>, and other tags that affect the document's head section.