import { useState } from "react";
import { signIn } from "../../apis/user-api";
import "../../styles/ui/auth-page/CardForm.css";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";

function CardFormSignIn(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      const token = await signIn({ email, password });
      localStorage.setItem("token", token);
      return navigate("/");
    } catch (e) {
      console.log(e);
      if (e.response?.data?.message) {
        return alert(e.response?.data?.message);
      }
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-form">
      <div className="card-form-title">
        <h3>Sign In</h3>
      </div>

      <div
        style={{
          margin: "1rem 0",
        }}
      ></div>

      <div>
        <form action="" onSubmit={handleOnSubmit}>
          <Input label={"Email"} name={"email"} type={"email"} />
          <Input label={"Password"} name={"password"} type={"password"} />
          <p
            style={{
              margin: "1rem 0rem",
              textAlign: "end",
              fontSize: "1.4rem",
            }}
          >
            <Link
              to="/sign-up"
              style={{ color: "rgb(40 110 187)", textDecoration: "none" }}
            >
              Don't have account? Create new account
            </Link>
          </p>
          <div>
            <button
              type="submit"
              onClick={() => {}}
              style={{
                border: "none",
                outline: "none",
                padding: "1rem 2rem",
                borderRadius: ".4rem",
                fontSize: "1.4rem",
                backgroundColor: "rgb(95 203 153)",
                fontWeight: "600",
                color: "#fff",
                cursor: "pointer",
                width: "100%",
                margin: "1rem 0",
              }}
              disabled={isLoading}
            >
              {!isLoading ? "Sign In" : "Singing In..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardFormSignIn;
