import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGlobe, FaGithub, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    jobTitle: "Software Engineer",
    location: "New York, USA",
    avatar: "https://via.placeholder.com/150",
    email: "johndoe@example.com",
    phone: "(123) 456-7890",
    mobile: "(098) 765-4321",
    address: "123 Main Street, New York, NY",
    website: "https://johndoe.dev",
    github: "johndoe",
    twitter: "@johndoe",
    instagram: "johndoe_insta",
    facebook: "johndoe_fb",
    projects: [
      { name: "Web Design", progress: 80 },
      { name: "Website Markup", progress: 72 },
      { name: "One Page", progress: 89 },
      { name: "Mobile Template", progress: 55 },
      { name: "Backend API", progress: 66 },
    ],
    moreProjects: [
      { name: "Frontend Development", progress: 90 },
      { name: "Backend Optimization", progress: 75 },
      { name: "Cloud Deployment", progress: 60 },
      { name: "Database Management", progress: 85 },
      { name: "Security Updates", progress: 50 },
    ],
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
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
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">{user.name}</h5>
                <p className="text-muted mb-1">{user.jobTitle}</p>
                <p className="text-muted mb-4">{user.location}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button className="btn btn-primary">Follow</button>
                  <button className="btn btn-outline-primary ms-1">Message</button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <SocialLink icon={<FaGlobe className="text-warning" />} text={user.website} />
                  <SocialLink icon={<FaGithub className="text-body" />} text={user.github} />
                  <SocialLink icon={<FaTwitter style={{ color: "#55acee" }} />} text={user.twitter} />
                  <SocialLink icon={<FaInstagram style={{ color: "#ac2bac" }} />} text={user.instagram} />
                  <SocialLink icon={<FaFacebookF style={{ color: "#3b5998" }} />} text={user.facebook} />
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - User Details & Project Status */}
          <div className="col-lg-8">
            <UserDetails user={user} />
            <div className="row">
              <ProjectStatus title="Project Status" projects={user.projects} />
              <ProjectStatus title="More Projects" projects={user.moreProjects} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* User Details Section */
const UserDetails = ({ user }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <UserDetail label="Full Name" value={user.name} />
        <UserDetail label="Email" value={user.email} />
        <UserDetail label="Phone" value={user.phone} />
        <UserDetail label="Mobile" value={user.mobile} />
        <UserDetail label="Address" value={user.address} />
      </div>
    </div>
  );
};

/* Individual User Detail */
const UserDetail = ({ label, value }) => (
  <>
    <div className="row">
      <div className="col-sm-3"><p className="mb-0">{label}</p></div>
      <div className="col-sm-9"><p className="text-muted mb-0">{value}</p></div>
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

/* Project Status */
const ProjectStatus = ({ title, projects }) => (
  <div className="col-md-6">
    <div className="card mb-4 mb-md-0">
      <div className="card-body">
        <p className="mb-4"><span className="text-primary font-italic me-1">assignment</span> {title}</p>
        {projects.map((project, index) => (
          <div key={index}>
            <p className="mb-1" style={{ fontSize: ".77rem" }}>{project.name}</p>
            <div className="progress rounded" style={{ height: "5px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${project.progress}%` }}
                aria-valuenow={project.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UserProfile;
