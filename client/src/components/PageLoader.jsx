import React from "react";

const PageLoader = () => {
    const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

    return (
        <div className="loader" data-testid="loading-page">
            <img src={loadingImg} alt="Loading..." />
        </div>
    );
};

export default PageLoader;