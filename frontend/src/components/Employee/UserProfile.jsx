import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGlobe, FaGithub, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import { getAuthHeaders } from "../../services/authorization";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/register-employee/list/10/`, {
          headers: getAuthHeaders()
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p className="text-center">Loading user data...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  if (!user) return <p className="text-center text-danger">No user data found</p>;

  return (
    <section style={{ backgroundColor: "#f4f7f6" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">User</a></li>
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          {/* Left Column - Profile Info */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <img
                  src={user.user.profile_picture || "https://via.placeholder.com/150"}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "180px", height: "180px", objectFit: "cover" }}
                />
                <h5 className="my-3">{user.first_name} {user.last_name}</h5>
                <p className="text-muted mb-1">{user.user.role}</p>
                <p className="text-muted mb-4">{user.department}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button className="btn btn-primary">Follow</button>
                  <button className="btn btn-outline-primary ms-1">Message</button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card mt-4 shadow-sm">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <SocialLink icon={<FaGlobe className="text-warning" />} text="Website link here" />
                  <SocialLink icon={<FaGithub className="text-body" />} text="Github link here" />
                  <SocialLink icon={<FaTwitter style={{ color: "#55acee" }} />} text="Twitter link here" />
                  <SocialLink icon={<FaInstagram style={{ color: "#ac2bac" }} />} text="Instagram link here" />
                  <SocialLink icon={<FaFacebookF style={{ color: "#3b5998" }} />} text="Facebook link here" />
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - User Details */}
          <div className="col-lg-8">
            <UserDetails user={user} />
          </div>
        </div>
      </div>
    </section>
  );
};

/* User Details Section */
const UserDetails = ({ user }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <UserDetail label="Full Name" value={`${user.first_name} ${user.last_name}`} />
        <UserDetail label="Username" value={user.user.username} />
        <UserDetail label="Email" value={user.user.email} />
        <UserDetail label="Phone" value={user.contact_number} />
        <UserDetail label="Address" value={user.address} />
        <UserDetail label="Role" value={user.user.role} />
      </div>
    </div>
  );
};

/* Individual User Detail */
const UserDetail = ({ label, value }) => (
  <>
    <div className="row mb-2">
      <div className="col-sm-4"><strong>{label}</strong></div>
      <div className="col-sm-8"><p className="text-muted mb-0">{value}</p></div>
    </div>
    <hr />
  </>
);

/* Social Link */
const SocialLink = ({ icon, text }) => (
  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
    {icon}
    <p className="mb-0">{text}</p>
  </li>
);

export default UserProfile;
