import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you have an auth context for managing user state
import AppBarComponent from "../../component/Appbar/AppBarComponent";

const templates = [
  {
    id: 1,
    name: "Template 1",
    content: "Happy Birthday!",
    color: "#FFDD57",
    imageUrl: "https://via.placeholder.com/300x200?text=Template+1", // Example image URL
  },
  {
    id: 2,
    name: "Template 2",
    content: "Congratulations!",
    color: "#57FF57",
    imageUrl: "https://via.placeholder.com/300x200?text=Template+2", // Example image URL
  },
  {
    id: 3,
    name: "Template 3",
    content: "Save the Date!",
    color: "#57A4FF",
    imageUrl: "https://via.placeholder.com/300x200?text=Template+3", // Example image URL
  },
  // Add more templates as needed
];

const HomeScreen = () => {
  const { user } = useAuth(); // Get user from context
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
          <h2 className="text-lg font-semibold mb-4">Templates</h2>
          <ul>
            {templates.map((template) => (
              <li key={template.id} className="mb-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleTemplateSelect(template)}
                >
                  {template.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-600 text-white p-2 rounded"
            onClick={handleAddText}
          >
            Add Text
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 bg-gray-100">
          {selectedTemplate ? (
            <div
              className="border border-gray-300 p-4 rounded-lg"
              style={{ backgroundColor: selectedTemplate.color }}
            >
              <h1 className="text-2xl font-bold mb-2">
                Editing: {selectedTemplate.name}
              </h1>
              <img
                src={selectedTemplate.imageUrl}
                alt={selectedTemplate.name}
                className="w-full h-auto mb-2 rounded"
              />
              <input
                type="text"
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                className="border border-gray-400 p-2 w-full mb-2"
                placeholder="Enter text here..."
              />
              <p className="text-xl">{editableText}</p>

              {/* Display added text elements */}
              {textElements.map((text, index) => (
                <div key={index} className="text-xl font-bold mb-2">
                  {text}
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-2xl font-bold">
              Select a template to start editing!
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
