import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../store/register-store";

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  avatar: z
    .any()
    .refine(
      (files) => files && files.length > 0 && files[0] instanceof File,
      "Please upload a valid avatar file"
    )
    .optional(),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { registerUser, isLoading, error } = useRegisterStore();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    await registerUser(data);
    navigate("/login");
    setAvatarPreview(null);
    reset();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen w-screen  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-[#16404D] mb-6">Register</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="gap-2 flex flex-col">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#16404D]"
            >
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              id="fullName"
              placeholder="Elon Musk"
              className=" px-2 border  h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DDA853] focus:ring focus:ring-[#DDA853] focus:ring-opacity-50"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="gap-2 flex flex-col">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#16404D]"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="elon@elon.com"
              className=" border px-2 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DDA853] focus:ring focus:ring-[#DDA853] focus:ring-opacity-50"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#16404D]"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Password@1234"
              className="border px-2 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DDA853] focus:ring focus:ring-[#DDA853] focus:ring-opacity-50"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-[#16404D]"
            >
              Avatar
            </label>
            <input
              {...register("avatar")}
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 block w-full text-sm text-[#16404D]
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#DDA853] file:text-[#16404D]
              hover:file:bg-[#A6CDC6]"
            />
            {errors.avatar && (
              <p className="mt-1 text-sm text-red-600">
                {errors.avatar.message}
              </p>
            )}
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="mt-2 w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#16404D] hover:bg-[#DDA853] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DDA853]"
          >
            {isLoading ? "Registering...." : "Register"}
          </button>
          <div className="flex  justify-center items-center gap-2">
            <p className="text-md font-semibold">Already have an account ?</p>
            <Link
              to="/login"
              className="flex text-sky-600 font-semibold underline"
            >
              Login Here
            </Link>
          </div>

          {/* Debugging Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-600 mt-4">
              Please fix the above errors before submitting.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
