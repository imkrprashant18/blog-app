import { Editor } from "@tinymce/tinymce-react";
import { Controller, Control, FieldValues } from "react-hook-form";

interface RTEProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  defaultValue?: string;
}

const RTE: React.FC<RTEProps> = ({
  name,
  control,
  label,
  defaultValue = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-gray-800">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} // Set default value here
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value} // Use value instead of initialValue
            apiKey="fvp3zzfrwaxwtfe2yb0vx2hcnblmwox68lwblvjbsox6illh"
            init={{
              height: 500,
              menubar: true,
              directionality: "ltr",
              encoding: "UTF-8",
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              outputFormat: "text",
            }}
            onEditorChange={(content) => {
              onChange(content); // Update form state with HTML content
            }}
          />
        )}
      />
    </div>
  );
};

export default RTE;
