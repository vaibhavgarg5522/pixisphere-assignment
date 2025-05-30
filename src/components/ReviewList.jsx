export default function ReviewList({ reviews = [] }) {
  if (!reviews.length) {
    return <p className="text-center text-gray-500">No reviews available.</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      {reviews.map((review, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-800">{review.name}</h3>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>

          <div className="flex items-center mb-2">
            {/* Simple star rendering */}
            <div className="text-yellow-500 text-sm mr-2">
              {"⭐".repeat(Math.floor(review.rating))}
            </div>
            <span className="text-sm text-gray-600">{review.rating}/5</span>
          </div>

          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
