import CardFormSignIn from "../ui/auth-page/CardFormSignIn";

function SignInPage() {
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100vh",
        width: "100vw",
        transform: "translateY(10rem)",
      }}
    >
      <CardFormSignIn />
    </div>
  );
}

export default SignInPage;
