import React from "react";
import { useRouter } from "next/router";
import { authService, URL } from "../src/services/auth/auth-service";

const ACTION = {
  USER: "user",
  PASSWORD: "password",
  SUBMIT: "submit",
};

const LoginReducer = (credentials, action) => {
  switch (action.type) {
    case ACTION.USER:
      return { ...credentials, name: action.payload.name };

    case ACTION.PASSWORD:
      return { ...credentials, password: action.payload.password };

    case ACTION.SUBMIT:
      action.payload.push();

    default:
      break;
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const [credentials, dispatch] = React.useReducer(LoginReducer, {
    name: "omariosouto",
    password: "safepassword",
  });

  if (!credentials) {
    return null;
  }

  return (
    <div>
      <h1>Login</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const auth = new authService(URL);

            const { data } = await auth.login({
              username: credentials.name,
              password: credentials.password,
            });

            dispatch({
              type: ACTION.SUBMIT,
              payload: {
                push: () => router.push("/server"),
              },
            });
          } catch (error) {
            console.error(error);
            alert("Usuário ou a senha estão inválidos");
          }
        }}
      >
        <input
          placeholder="Usuário"
          name="usuario"
          onChange={(e) =>
            dispatch({
              type: ACTION.USER,
              payload: {
                name: e.target.value,
              },
            })
          }
          value={credentials.name}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          onChange={(e) =>
            dispatch({
              type: ACTION.PASSWORD,
              payload: {
                password: e.target.value,
              },
            })
          }
          value={credentials.password}
        />

        <pre>{JSON.stringify(credentials, null, 3)}</pre>
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
