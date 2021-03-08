import './BetaDocsPage.scss';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"

function BetaDocsPage() {
    return (
        <div className="BetaDocsPage">
            <SwaggerUI url={process.env.PUBLIC_URL + "/openapi.yaml"} />
        </div>
    );
}

export default BetaDocsPage;
