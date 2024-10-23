import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  // Form state to manage input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // You can replace this with an API call
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>

        <div className="formGroup">
          <label htmlFor="username">Password: </label>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div></div>
        <div className="formGroup">
          <Link to="/signup">Don't have an account?</Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
