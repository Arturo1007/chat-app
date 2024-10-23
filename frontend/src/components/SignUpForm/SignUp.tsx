import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  // Form state to manage input values
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // You can replace this with an API call
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
            placeholder="Fullname"
            required
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          />
        </div>

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
          <label htmlFor="password">Password: </label>
          <input
            type="password"
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
