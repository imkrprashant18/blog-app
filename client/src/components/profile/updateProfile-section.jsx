import { useForm } from "react-hook-form";
import { useUpdateUserAvatarStore } from "../../store/user-update-avatar-store";

// eslint-disable-next-line react/prop-types
const UpdateProfileSection = ({ setIsShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, error, updateUserAvatar } = useUpdateUserAvatarStore();

  const onSubmit = async (data) => {
    const file = data.avatar[0]; // Access the first file from the file input
    const formData = new FormData();
    formData.append("avatar", file);
    await updateUserAvatar(formData);
  };

  return (
    <div className="w-full absolute max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Update Avatar
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Avatar Input */}
        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Avatar Image
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*" // Accept only image files
            {...register("avatar", {
              required: "An avatar image is required",
            })}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.avatar
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.avatar && (
            <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Avatar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileSection;
