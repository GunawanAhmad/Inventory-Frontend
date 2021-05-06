import React from "react";

// import "../css/navbar.css";

function AppContainer(props) {
  React.useEffect(() => {
    console.log(props.location);
  }, []);
  return <div>{props.children}</div>;
}

export default AppContainer;
