"use client";

import RTE from "@/components/RTE/RTE";
import React, { ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { useBlogStore } from "@/store/add-post-store";
import { useToast } from "@/hooks/use-toast";
interface FormValues {
  title: string;
  category: string;
  content: string;
  featureImage: File | null;
}

const AddPostForms: React.FC = () => {
  const { postBlog, loading, error } = useBlogStore();
  const {
    control,
    handleSubmit,
    register, // Extracting register here
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      category: "",
      content: "",
      featureImage: null,
    },
  });
  const { toast } = useToast();
  const onSubmit = async (data: FormValues) => {
    try {
      await postBlog(data);
      toast({
        title: "Blog posted successfully",
        description: "Your blog has been posted successfully.",
        variant: "default",
      });
      reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to post blog",
        description: "An error occurred while posting your blog.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue("featureImage", e.target.files[0]); // Set file to form state
    }
  };

  return (
    <div className="w-full   flex justify-center p-12 overflow-y-scroll">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full  h-full"
      >
        <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="mb-4 flex gap-2">
          <div className="w-full">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`w-full p-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              {...register("category", { required: "Category is required" })}
              className={`w-full p-2 border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="featureImage">
            Feature Image
          </label>
          <input
            type="file"
            id="featureImage"
            accept="image/*"
            onChange={handleFileChange}
            className={`w-full p-2 border ${
              errors.featureImage ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.featureImage && (
            <p className="text-red-500 text-sm">
              {errors.featureImage.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RTE
                label="Content:"
                name={field.name}
                control={control}
                defaultValue={field.value}
                onChange={field.onChange} // Pass the onChange function to RTE
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPostForms;
