import React from "react";
import { tokenService } from "../src/services/auth/token-service";

const AuthPage = (props) => {
  return (
    <div>
      <h1>Auth oage serve render</h1>

      <pre>{JSON.stringify(props, null, 3)}</pre>
    </div>
  );
};

export default AuthPage;

export const getServerSideProps = async (ctx) => {
  const token = new tokenService(ctx);

  return {
    props: {
      token: token.get(),
    },
  };
};
