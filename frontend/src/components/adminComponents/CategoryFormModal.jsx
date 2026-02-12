import { useState } from "react";
import { createCategory, updateCategory, } from "../../features/categories/categoryAPI";

export default function CategoryFormModal({
    close, editCategory, refresh
}) {
    const [name, setName] = useState(editCategory?.name || "");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData()

        formData.append("name", name)

        if (image) {
            formData.append("image", image);
        }

        if (editCategory) {
            await updateCategory(editCategory._id, formData)
        } else {
            await createCategory(formData)
        }

        setLoading(false);
        refresh();
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-[95%] max-w-md rounded-xl p-6 shadow-lg"
            >
                {/* TITLE */}
                <h2 className="text-xl font-semibold mb-5 text-center">
                    {editCategory ? "Edit Category" : "Add Category"}
                </h2>

                {/* NAME */}
                <label className="block text-sm font-medium mb-1">
                    Category Name
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    className="w-full border rounded px-3 py-2 mb-4 focus:outline-pink-500"
                    required
                />

                {/* IMAGE */}
                <label className="block text-sm font-medium mb-1">
                    Category Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="mb-4"
                />

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={close}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );

}