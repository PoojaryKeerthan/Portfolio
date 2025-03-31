import React, { useState } from "react";
import emailjs from "emailjs-com";

const EmailCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success or error message

  // Handles input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear errors when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage(""); // Clear previous messages
  };

  // Simple validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.message) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(""); // Reset previous message

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
        setMessage("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      })
      .catch(() => {
        setMessage(" Failed to send email. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative max-w-[550px] w-full mx-auto">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-xs bg-black/30 rounded-lg z-50">
          <div className="w-12 h-12 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-[#0d1b2a] rounded-lg shadow-md p-4 relative">
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block mb-2 text-white/70"> Name </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full p-2 border-b-2 ${
                errors.name ? "border-red-600" : "border-blue-600"
              } bg-transparent text-white outline-none`}
              type="text"
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-2 text-white/70"> Email </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full p-2 border-b-2 ${
                errors.email ? "border-red-600" : "border-blue-600"
              } bg-transparent text-white outline-none`}
              type="email"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label className="block mb-2 text-white/70"> Message </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className={`w-full p-2 border-b-2 ${
                errors.message ? "border-red-600" : "border-blue-600"
              } bg-transparent text-white outline-none`}
              rows={4}
              disabled={loading}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              className="w-full bg-[#F7AB0A] text-gray-700 font-semibold p-2 rounded transition hover:bg-[#FFC857] disabled:bg-gray-500"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`text-center text-sm font-semibold p-2 rounded-md ${message.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailCard;
