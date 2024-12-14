import React, { useState } from "react";
import Pan from "./Pan"; // Import the Pan component
import Aadhaar from "./Aadhaar"; // Import the Aadhaar component

const ApiVerification = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submenu, setSubmenu] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [submenuHistory, setSubmenuHistory] = useState([]); // Track the history of submenus

  const handleOptionClick = (option) => {
    if (option === "API VERIFICATION") {
      // Reset everything when clicking API Verification again
      setSelectedOption("");
      setSubmenu([]);
      setActiveComponent(null); // Hide the component
      setSelectedSubmenu(""); // Reset selected submenu
      setSubmenuHistory([]); // Clear submenu history
    } else {
      setSelectedOption(option);
      setActiveComponent(null); // Reset active component
      setSelectedSubmenu(""); // Reset selected submenu
      setSubmenuHistory([]); // Clear previous submenu history
      setSubmenu([]); // Hide the submenu when option is clicked

      // Set submenu items based on the option selected
      switch (option) {
        case "PAN SUITE":
          setSubmenu(["PAN", "PAN DETAIL"]);
          break;
        case "INDIVIDUAL IDENTITY VERIFICATION":
          setSubmenu(["AADHAAR VERIFICATION", "VOTER", "PASSPORT ID"]);
          break;
        case "CORPORATE VERIFICATION":
          setSubmenu(["GST VERIFICATION", "UDYAM AADHAR"]);
          break;
        case "CREDIT CHECK":
          setSubmenu(["CREDIT REPORT EQUIFAX"]);
          break;
        default:
          setSubmenu([]);
          break;
      }
    }
  };

  const handleSubmenuClick = (item) => {
    setSelectedSubmenu(item); // Set the selected submenu item
    setSubmenuHistory((prevHistory) => [...prevHistory, submenu]); // Push current submenu to history
    switch (item) {
      case "PAN":
        setActiveComponent(<Pan />);
        break;
      case "AADHAAR VERIFICATION":
        setActiveComponent(<Aadhaar />);
        break;
      default:
        setActiveComponent(<p>{item} content will be here...</p>);
        break;
    }
    setSubmenu([]); // Hide the submenu when an item is selected
  };

  const handleBackToSubmenu = () => {
    const previousSubmenu = submenuHistory.pop(); // Get the previous submenu from history
    setSubmenu(previousSubmenu); // Restore the previous submenu
    setSubmenuHistory([...submenuHistory]); // Update the history after popping the last entry
    setSelectedSubmenu(""); // Reset selected submenu
  };

  return (
    <div className="bg-white p-4 rounded shadow d-flex" style={{ height: "100%", flexDirection: "row" }}>
      {/* Main Menu */}
      {activeComponent === null && (
        <div className="menu" style={{ minWidth: "200px", maxWidth: "250px", flexShrink: 0 }}>
          <h4 className="mb-4">API Verification</h4>
          <ul className="list-unstyled">
            {["PAN SUITE", "INDIVIDUAL IDENTITY VERIFICATION", "CORPORATE VERIFICATION", "CREDIT CHECK"].map((option) => (
              <li key={option} className="mb-2">
                <button
                  className={`btn w-100 text-start ${selectedOption === option ? "btn-primary" : "btn-light"}`}
                  onClick={() => handleOptionClick(option)}
                  style={{
                    transition: "background-color 0.3s ease",
                    backgroundColor: selectedOption === option ? "#007bff" : "#f8f9fa",
                    color: selectedOption === option ? "#fff" : "#000",
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
            {/* Add a button to allow going back to the API Verification menu */}
            {activeComponent && (
              <li key="api-verification" className="mb-2">
                <button
                  className="btn w-100 text-start btn-light"
                  onClick={() => handleOptionClick("API VERIFICATION")}
                  style={{
                    transition: "background-color 0.3s ease",
                    backgroundColor: "#f8f9fa",
                    color: "#000",
                  }}
                >
                  Back to API Verification
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Submenu */}
      {submenu.length > 0 && activeComponent === null && (
        <div
          className="submenu ms-3"
          style={{
            minWidth: "200px", // Submenu width
            maxWidth: "250px",
            borderLeft: "1px solid #ddd",
            paddingLeft: "15px",
            flexShrink: 0,
            height: "300px", // Limit the height of the submenu
            overflowY: "auto", // Allow scrolling if submenu items exceed the height
          }}
        >
          <h5>{selectedOption}</h5>
          <ul className="list-unstyled">
            {/* Back button to go to previous submenu */}
            {submenuHistory.length > 0 && (
              <li className="mb-2">
                <button
                  className="btn w-100 text-start btn-light"
                  onClick={handleBackToSubmenu}
                  style={{
                    transition: "background-color 0.3s ease",
                    backgroundColor: "#f8f9fa",
                    color: "#000",
                  }}
                >
                  Back to previous submenu
                </button>
              </li>
            )}

            {submenu.map((item) => (
              <li key={item} className="mb-2">
                <button
                  className={`btn text-start w-100 ${selectedSubmenu === item ? "btn-dark text-white" : "btn-outline-secondary"}`}
                  onClick={() => handleSubmenuClick(item)}
                  style={{
                    transition: "background-color 0.3s ease",
                    backgroundColor: selectedSubmenu === item ? "#343a40" : "transparent",
                    color: selectedSubmenu === item ? "#fff" : "#000",
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Active Component */}
      {activeComponent && (
        <div
          className="content ms-3"
          style={{
            flex: "1",
            borderLeft: "1px solid #ddd",
            paddingLeft: "15px",
            height: "100%", // Ensure the content takes the available height
          }}
        >
          {activeComponent}
        </div>
      )}
    </div>
  );
};

export default ApiVerification;
