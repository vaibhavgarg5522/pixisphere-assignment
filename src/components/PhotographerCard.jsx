import { useRouter } from "next/router";

export default function PhotographerCard({ photographer }) {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/photographer/${photographer.id}`);
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition w-full bg-white">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-black">
          {photographer.name}
        </h2>
        <p className="text-sm text-gray-700">{photographer.location}</p>
        <p className="mt-2 text-sm text-gray-800">
          <strong>Starting at:</strong> ₹{photographer.price}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Rating:</strong> {photographer.rating} ★
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {photographer.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={handleViewProfile}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
