import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Building2,
  ArrowRight,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    userType: "tenant",
    photo: "" as string | File,
    photoPreview: null as string | null,
    name: "",
    email: "",
    phoneNum: "",
    password: "",
    confirmPassword: "",
    agreement: false,
    isWhatsApp: false,
  });
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mobileNumber, setMobileNumber] = useState("");

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobileNumber(value);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agreement) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    try {
      // Fetch CSRF token if using Laravel Sanctum
      await fetch("http://127.0.0.1:8001/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });

      // Send the registration request
      const response = await fetch("http://127.0.0.1:8001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      alert("Registration successful!");
      navigate("/login"); // Redirect to /login
      console.log(data);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Columns */}
          <div className="md:col-span-4 space-y-8 p-4">
            <div className="flex flex-col items-center ">
              <img src="src/pglogo.jpg" alt="PG_Logo" className="w-48" />
            </div>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex space-x-6">
                <Facebook className="w-6 h-6 hover:" />
                <Instagram className="w-6 h-6" />
                <Twitter className="w-6 h-6" />
              </div>
              <div className="text-sm text-gray-500 text-center space-x-2">
                <span>© 2024 PGHunt Technologies Solution Pvt. Ltd.</span>
                <span className="text-gray-600">|</span>
                <a href="" className="hover:underline text-indigo-400">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          {/* Middle Columns */}
          <div className="md:col-span-7 bg-white shadow-xl rounded-2xl p-8 space-y-6">
            {/* Sub-Left Columns */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="mt-2 text-gray-600">
                Join PG Hunt to find your perfect accommodation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-24 gap-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-x-24 gap-y-8">
                  <div className="md:col-span-2 space-y-4">
                    <div
                      onClick={triggerFileInput}
                      className="group relative w-40 h-40 mx-auto cursor-pointer rounded-full overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      {formData.photoPreview ? (
                        <div className="relative h-full">
                          <img
                            src={formData.photoPreview}
                            alt="Profile preview"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-sm">Change Photo</p>
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-full bg-gray-100 flex items-center justify-center">
                          <User className="h-20 w-20 text-gray-400" />
                          <div className="absolute insert-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-sm">Upload Photo</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="flex items-center justify-center text-lg">
                      Upload Profile Photo
                    </span>

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />

                    {/* Select  */}
                    <div className="space-y-6">
                      <div className="text-center">
                        <label className="text-lg font-medium text-gray-700">
                          I am a
                        </label>
                        <div className="w-full max-w-xs mx-auto">
                          <div className="grid grid-cols-2 mt-2 ml-9">
                            {/* Left */}
                            <label className="relative cursor-pointer">
                              <input
                                type="radio"
                                name="userType"
                                value="tenant"
                                checked={formData.userType === "tenant"}
                                onChange={handleChange}
                                className="peer sr-only"
                              />
                              <div className="flex items-center justify-center max-w-fit gap-2 p-3 border-2 rounded-lg peer-checked:border-indigo-500 peer-checked:bg-indigo-50 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                <User className="w-5 h-5 text-gray-500 peer-checked:text-indigo-600" />
                                <span className="font-medium text-gray-900">
                                  Tenant
                                </span>
                              </div>
                            </label>
                            {/* Right */}
                            <label className="relative">
                              <input
                                type="radio"
                                name="userType"
                                value="owner"
                                checked={formData.userType === "owner"}
                                onChange={handleChange}
                                className="peer sr-only"
                              />
                              <div className="flex items-center justify-center max-w-fit gap-2 p-3 border-2 rounded-lg peer-checked:border-indigo-500 peer-checked:bg-indigo-50 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                <Building2 className="w-5 h-5 text-gray-500 peer-checked:text-indigo-600" />
                                <span className="font-medium text-gray-900">
                                  PG Owner
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="md:col-span-4 bg-white shadow-xl rounded-2xl p-8 space-y-6">
                    <div className="space-y-6">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="input-field pl-10"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="input-field pl-10"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center space-x-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700"
                        >
                          Mobile Number
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="whatsapp"
                            name="isWhatsapp"
                            checked={formData.isWhatsApp}
                            className="w-4 h-4 border-gray-600 rounded"
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                isWhatsApp: e.target.checked,
                              }))
                            }
                          />
                          <label
                            htmlFor="whatsapp"
                            className="text-sm text-gray-400 cursor-pointer"
                          >
                            What's app
                          </label>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          id="phone"
                          name="phoneNum"
                          type="text"
                          required
                          className="input-field pl-10"
                          placeholder="Enter Mobile Number"
                          value={formData.phoneNum}
                          onChange={handleInputChange}
                        />
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          className="input-field pl-10"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          className="input-field pl-10"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start">
                      <div className="flex items-center h-7">
                        <input
                          id="agreement"
                          type="checkbox"
                          name="agreement"
                          checked={formData.agreement}
                          onChange={handleChange}
                          required
                          title="Agree to Terms and Conditions"
                          aria-label="Agree to Terms and Conditions"
                        />
                      </div>

                      <div className="ml-3">
                        <label
                          htmlFor="agreement"
                          className="text-sm text-gray-600"
                        >
                          I agree to the{" "}
                          <a
                            href=""
                            className="text-indigo-600 hover:text-indigo-400"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href=""
                            className="text-indigo-600 hover:text-indigo-400"
                          >
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.agreement}
                      className={`group w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition-all duration-200 
                  ${
                    formData.agreement
                      ? "bg-indigo-600 hover:text-gray-800 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                    >
                      Create Account
                      <ArrowRight className="h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    {/* Login with Google */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            /* Add Google sign-in logic */
                          }}
                          className="group w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:text-gray-800 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FcGoogle className="h-5 w-5" />
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
