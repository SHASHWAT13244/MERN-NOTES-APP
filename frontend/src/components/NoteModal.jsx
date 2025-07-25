import React, { useEffect, useState } from "react";
import axios from "axios";

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setDescription(note ? note.description : "");
    setError("");
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }

      const payload = { title, description };
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = note
        ? await axios.put(`/api/notes/${note._id}`, payload, config)
        : await axios.post("/api/notes", payload, config);

      onSave(data);
      setTitle("");
      setDescription("");
      setError("");
      onClose();
    } catch (err) {
      console.error("Note save error", err);
      setError("Failed to save note");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div
        className="p-6 rounded-lg shadow-xl w-full max-w-md"
        style={{ backgroundColor: "var(--card-bg)", color: "var(--text)" }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {note ? "Edit Note" : "Create Note"}
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full px-3 py-2 border rounded-md outline-none"
              style={{
                backgroundColor: "var(--input-bg)",
                color: "var(--input-text)",
                borderColor: "var(--accent)",
              }}
              required
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Note Description"
              rows={4}
              className="w-full px-3 py-2 border rounded-md outline-none"
              style={{
                backgroundColor: "var(--input-bg)",
                color: "var(--input-text)",
                borderColor: "var(--accent)",
              }}
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-md"
              style={{
                background: "linear-gradient(90deg, var(--accent), var(--accent-secondary))",
                color: "var(--bg)",
                boxShadow: "0 0 6px var(--accent)",
                border: "none",
              }}
            >
              {note ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor: "var(--button-red)",
                color: "white",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
