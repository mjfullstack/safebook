import React from "react";
import Jumbotron from "../../Components/Jumbotron";

function NoMatch() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 padding">
          <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;
