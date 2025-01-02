import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSingleprofileApi, updateProfileApi } from "../../apis/Api";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    getSingleprofileApi()
      .then((res) => {
        console.log("API response:", res.data);
        const { username, email, title } = res.data.user;
        setUsername(username);
        setEmail(email);
        setTitle(title);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch user profile.");
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = { username, email, title };

    updateProfileApi(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while updating the profile.");
        }
      });
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Edit Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter title"
            />
          </div>
          <button type="submit" className="btn btn-primary profile-button">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
