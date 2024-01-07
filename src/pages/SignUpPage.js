import CardFormSignUp from "../ui/auth-page/CardFormSignUp";

function SignUpPage() {
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
      <CardFormSignUp />
    </div>
  );
}

export default SignUpPage;
