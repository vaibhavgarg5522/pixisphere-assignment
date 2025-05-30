import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GalleryCarousel from "@/components/GalleryCarousel";
import ReviewList from "@/components/ReviewList";
import { Dialog } from "@headlessui/react";

export default function PhotographerProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (!id) return;

    const fetchPhotographer = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/photographers/${id}`;
      console.log("📡 Fetching photographer from:", url); // Debug log

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (!res.ok) throw new Error("Photographer not found");

        const data = await res.json();
        setPhotographer(data);
      } catch (error) {
        console.error(" Fetch error:", error);
        setPhotographer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry submitted successfully!");
    setShowInquiry(false);
    setForm({ name: "", email: "", message: "" });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!photographer) return <div className="text-center mt-10">Photographer not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="w-full md:w-64 h-64 object-cover rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold">{photographer.name}</h1>
          <p className="text-gray-600 mt-2">{photographer.bio}</p>
          <p className="mt-4 text-lg">
            <strong>Price:</strong> ₹{photographer.price}
          </p>
          <p className="mt-1">
            <strong>Rating:</strong> {photographer.rating} ★
          </p>
          <div className="mt-3">
            <strong>Styles:</strong>{" "}
            {photographer.styles.map((style) => (
              <span
                key={style}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-sm"
              >
                {style}
              </span>
            ))}
          </div>
          <div className="mt-2">
            <strong>Tags:</strong>{" "}
            {photographer.tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowInquiry(true)}
          >
            Send Inquiry
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <GalleryCarousel images={photographer.portfolio} />
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <ReviewList reviews={photographer.reviews} />
      </div>

      {/* Inquiry Modal */}
      <Dialog open={showInquiry} onClose={() => setShowInquiry(false)} className="fixed z-50 inset-0">
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40 px-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full">
            <Dialog.Title className="text-xl font-bold mb-4">Send Inquiry</Dialog.Title>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full border rounded px-3 py-2"
                value={form.name}
                onChange={handleFormChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full border rounded px-3 py-2"
                value={form.email}
                onChange={handleFormChange}
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                className="w-full border rounded px-3 py-2"
                value={form.message}
                onChange={handleFormChange}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setShowInquiry(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
