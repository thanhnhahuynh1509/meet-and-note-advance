import "../../styles/ui/auth-page/Input.css";

function Input({ label, name, type, placeholder }) {
  return (
    <div style={{ margin: "2rem 0" }}>
      <label className="input-label">{label}</label>
      <input
        className="input"
        type={type ?? "text"}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Input;
