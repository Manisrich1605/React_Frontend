import React from "react";
import home from "../src/assets/home.jpg"; // Import the image URL
function Layout() {
  const backgroundContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };
  const backgroundImageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${home})`, // Use the imported image URL
    backgroundSize: "cover",
    filter: "blur(8px)", // Adjust blur intensity as needed
  };
  const textContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "48px", // Adjust font size as needed
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add shadow for better visibility
  };
  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    color: "white",
    padding: "10px 20px", // Adjust padding as needed
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    zIndex: 1000, // Ensure navbar is above the background image
  };
  
  return (
    <div>
      <div style={navbarStyle}>
        <div className="container">
          <ul className="nav">
          <li className="nav-item">
              <a className="nav-link" href="/" >
                <strong style={{fontSize:"20px"}}>Leave Management System</strong>
              </a>
            </li>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div style={backgroundContainerStyle}>
        <div style={backgroundImageStyle}></div>
        <div style={textContainerStyle}>Leave Management System</div>
      </div>
    </div>
  );
}
export default Layout;
