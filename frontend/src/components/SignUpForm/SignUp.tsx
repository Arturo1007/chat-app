import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = async () => {
      try {
        await axios.post(
          "api/auth/signup",
          {
            fullName: formData.fullName,
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            gender: formData.gender,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setFormData({
          fullName: "",
          username: "",
          password: "",
          confirmPassword: "",
          gender: "",
        });

        alert("User created succesfully");
        // Redirect to Login page.
        navigate("/login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.error);
        } else {
          alert("An unexpected error ocurred, please try again later.");
        }
      }
    };
    submitData();
  };

  // Handle gender change
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="fullname">Fullname: </label>
          <input
            type="text"
            value={formData.fullName}
            placeholder="Fullname"
            required
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </div>

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
          <label htmlFor="password">Password: </label>
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

        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>

        <div className="formGroup">
          <label>Gender: </label>
          <div className="checkboxContainer">
            <label>
              <input
                type="checkbox"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label>
              <input
                type="checkbox"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleGenderChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="formGroup">
          <Link to="/login">Already have an account?</Link>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
