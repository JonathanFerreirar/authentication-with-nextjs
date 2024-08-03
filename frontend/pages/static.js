import React from "react";

const AuthStatic = (props) => {
  return (
    <div>
      <h1>Auth page static</h1>

      <pre>{JSON.stringify(props, null, 3)}</pre>
    </div>
  );
};

export default AuthStatic;
