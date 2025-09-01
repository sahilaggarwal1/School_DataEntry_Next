"use client";

import { useEffect, useState } from "react";

const StarRating = ({ rating }) => {
    // This component renders a star rating based on the rating prop.
    const stars = "⭐".repeat(rating);
    return <span className="text-yellow-400">{stars}</span>;
};

const SchoolCard = ({ school }) => {
    const handleApply = () => {
        // Implement your "Apply Now" logic here, e.g., navigate to a form.
        console.log(`Applying to ${school.name}`);
    };

    const handleCompare = () => {
        // Implement your "Add to Compare" logic here.
        console.log(`Adding ${school.name} to compare list`);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/deleteSchool?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("School deleted successfully!");
                window.location.reload(); // quick refresh after delete
            } else {
                alert("Failed to delete school.");
            }
        } catch (err) {
            console.error("Error deleting school:", err);
        }
    };


    return (
        <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 bg-white">
            <div className="relative">
                {/* Use the image path from your original logic */}
                {school.image && (
                    <img
                        src={`/schoolImages/${school.image}`}
                        alt={school.name}
                        className="w-full h-48 object-cover rounded-t-3xl"
                    />
                )}
                <button
                    onClick={handleCompare}
                    className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-300"
                >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6.75a.75.75 0 01.75.75v3.75h3.75a.75.75 0 010 1.5h-3.75v3.75a.75.75 0 01-1.5 0v-3.75H7.5a.75.75 0 010-1.5h3.75V7.5a.75.75 0 01.75-.75z"></path>
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                    {/* Assuming your API returns a rating and a board property */}
                    {school.rating && <StarRating rating={school.rating} />}
                    {school.board && <span className="text-xs font-semibold text-gray-500 uppercase">{school.board}</span>}
                </div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">{school.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{school.address}</p>
                <p className="text-sm font-medium text-gray-500 mt-1">{school.city}</p>
            </div>
            <div className="p-4 pt-0 space-y-3">
                <button
                    onClick={handleApply}
                    className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Apply Now
                </button>
                <button
                    onClick={() => handleDelete(school.id)}
                    className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Delete
                </button>
            </div>

        </div>
    );
};

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSchools() {
            try {
                const res = await fetch("/api/getSchools");
                const data = await res.json();
                setSchools(data);
            } catch (err) {
                console.error("Error fetching schools:", err);
            }
            setLoading(false);
        }
        fetchSchools();
    }, []);

    if (loading) {
        return <p className="p-6 text-center text-lg text-gray-600">Loading schools...</p>;
    }

    if (schools.length === 0) {
        return <p className="p-6 text-center text-lg text-gray-600">No schools found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {schools.map((school) => (
                        <SchoolCard key={school.id} school={school} />
                    ))}
                </div>
            </div>
        </div>
    );
}
