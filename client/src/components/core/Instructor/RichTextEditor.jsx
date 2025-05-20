import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function RichTextEditor({ formData, setFormData }) {
  const handleChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  return (
    <ReactQuill
      theme="snow"
      value={formData.description}
      onChange={(e) => handleChange(e)}
      placeholder="Write course description..."
    />
  );
}

export default RichTextEditor;
