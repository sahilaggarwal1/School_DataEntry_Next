"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage("");

        const formData = new FormData();
        for (let key in data) {
            if (key === "image") {
                formData.append("image", data.image[0]); // file
            } else {
                formData.append(key, data[key]);
            }
        }

        try {
            const res = await fetch("/api/addSchool", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (res.ok) {
                setMessage("✅ School added successfully!");
                reset(); // clear form
            } else {
                setMessage("❌ Error: " + result.error);
            }
        } catch (err) {
            setMessage("❌ Error: " + err.message);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Add School</h1>

            {message && <p className="mb-4">{message}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="School Name"
                    {...register("name", { required: true })}
                    className="border p-2 rounded"
                />
                {errors.name && <span className="text-red-500">Name is required</span>}

                <input
                    type="text"
                    placeholder="Address"
                    {...register("address", { required: true })}
                    className="border p-2 rounded"
                />
                {errors.address && <span className="text-red-500">Address is required</span>}

                <input
                    type="text"
                    placeholder="City"
                    {...register("city", { required: true })}
                    className="border p-2 rounded"
                />
                {errors.city && <span className="text-red-500">City is required</span>}

                <input
                    type="text"
                    placeholder="State"
                    {...register("state", { required: true })}
                    className="border p-2 rounded"
                />
                {errors.state && <span className="text-red-500">State is required</span>}

                <input
                    type="number"
                    placeholder="Contact"
                    {...register("contact", { required: true })}
                    className="border p-2 rounded"
                />
                {errors.contact && <span className="text-red-500">Contact is required</span>}

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email_id", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    className="border p-2 rounded"
                />
                {errors.email_id && <span className="text-red-500">Valid email required</span>}

                <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: true })}
                    className="border p-2 rounded"
                />
                {errors.image && <span className="text-red-500">Image is required</span>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
