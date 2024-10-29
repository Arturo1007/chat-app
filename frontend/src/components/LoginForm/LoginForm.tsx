import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUserType } from "../../types/userTypes";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  // Form state to manage input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = async () => {
      try {
        const payload: LoginUserType = {
          username: formData.username,
          password: formData.password,
        };

        const { data } = await axios.post("api/auth/login", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setFormData({
          username: "",
          password: "",
        });

        setAuthUser(data);
        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.error);
        } else {
          alert("An unexpected error ocurred, please try again later.");
          console.log(error);
        }
      }
    };
    submitData();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={formData.username}
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
            value={formData.password}
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
