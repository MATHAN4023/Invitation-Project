import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you have an auth context for managing user state
import AppBarComponent from "../../component/Appbar/AppBarComponent";
import greeting1 from "../../assets/GreetingTemplates/greeting1.jpg"
import greeting2 from "../../assets/GreetingTemplates/greeting2.jpg"
import greeting3 from "../../assets/GreetingTemplates/greeting3.jpg"
import { Button } from "@mui/material";
const templates = [
  {
    id: 1,
    name: "Project 1",
    content: "Happy Birthday!",
    color: "#FFDD57",
    imageUrl: greeting1, // Example image URL
  },
  {
    id: 2,
    name: "Project 2",
    content: "Congratulations!",
    color: "rgb(255 155 87)",
    imageUrl: greeting2, // Example image URL
  },
  {
    id: 3,
    name: "Project 3",
    content: "Save the Date!",
    color: "#57A4FF",
    imageUrl: greeting3, // Example image URL
  },
  // Add more templates as needed
];

const HomeScreen = () => {
  const { login } = useAuth(); // Get user from context
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editableText, setEditableText] = useState("");
  const [textElements, setTextElements] = useState([]); // Store added text elements

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEditableText(template.content); // Initialize editable text with template content
  };

  const handleAddText = () => {
    if (editableText.trim()) {
      setTextElements([...textElements, editableText]); // Add the editable text to the text elements
      setEditableText(""); // Clear the input field
    }
  };

  return (
    <>
      <AppBarComponent />
      <div className="flex h-screen">
        {/* Sidebar with Templates */}
        <div className="bg-white w-64 p-4 shadow-md overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">My Projects</h2>
          <ul className="list-none p-0">
            {templates.map((template) => (
              <li key={template.id} className="mb-2">
                <button
                  className="w-full text-left p-2 rounded transition duration-200 ease-in-out bg-white hover:bg-blue-100 focus:outline-none"
                  onClick={() => handleTemplateSelect(template)}
                >
                  {template.name}
                </button>
              </li>
            ))}
          </ul>

          <Button
            variant="contained"
            color="secondary"
            className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded w-full"
            onClick={handleAddText}
          >
            Add Project
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 bg-gray-100 min-h-screen flex items-center justify-center">
          {selectedTemplate ? (
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
              {/* Left Section: Image and Editable Text */}
              <div className="flex-1 p-6 bg-gray-200 md:rounded-l-lg">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
                  {selectedTemplate.name}
                </h1>
                <img
                  src={selectedTemplate.imageUrl}
                  alt={selectedTemplate.name}
                  className="w-full h-auto mb-4 rounded-lg shadow"
                />
                <input
                  type="text"
                  value={editableText}
                  onChange={(e) => setEditableText(e.target.value)}
                  className="border border-gray-400 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text here..."
                />
                <p className="text-xl text-gray-700 mb-4">{editableText}</p>
              </div>
              {/* Right Section: Added Text Elements */}
              <div className="flex-1 p-6 bg-gray-50">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Added Text Elements</h2>
                <div className="space-y-2">
                  {textElements.map((text, index) => (
                    <div key={index} className="text-xl font-medium text-gray-800 bg-gray-200 p-3 rounded-md shadow">
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Select a template to start editing!
            </h1>
          )}
        </div>

      </div>
    </>
  );
};

export default HomeScreen;
