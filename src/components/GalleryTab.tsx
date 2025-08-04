import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const GalleryTab: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    album: "",
    mediaUrl: "",
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const galleryRef = ref(db, "gallery");
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }));
        setGalleryItems(itemsArray);
      } else {
        setGalleryItems([]);
      }
    });
    return () => unsubscribe();
  }, [db]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const uploadMedia = async (file: File, itemId: string) => {
    const mediaRef = storageRef(storage, `gallery/${itemId}/${file.name}`);
    await uploadBytes(mediaRef, file);
    const url = await getDownloadURL(mediaRef);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const galleryRef = ref(db, "gallery");
      const newItemRef = push(galleryRef);
      let mediaUrl = "";
      if (mediaFile) {
        mediaUrl = await uploadMedia(mediaFile, newItemRef.key!);
      }
      await set(newItemRef, {
        title: formData.title,
        description: formData.description,
        album: formData.album,
        mediaUrl,
        timestamp: new Date().toISOString(),
      });
      setMessage("Gallery item added successfully");
      setFormData({
        title: "",
        description: "",
        album: "",
        mediaUrl: "",
      });
      setMediaFile(null);
    } catch (error) {
      setMessage("Failed to add gallery item");
    }
  };

  const handleDelete = async (id: string, mediaUrl: string) => {
    try {
      if (mediaUrl) {
        const mediaRef = storageRef(storage, mediaUrl);
        await deleteObject(mediaRef);
      }
      const itemRef = ref(db, `gallery/${id}`);
      await remove(itemRef);
      setMessage("Gallery item deleted");
    } catch (error) {
      setMessage("Failed to delete gallery item");
    }
  };

  const albums = [...new Set(galleryItems.map((item) => item.album))];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Gallery</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          name="album"
          placeholder="Album Name"
          value={formData.album}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Gallery Item
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Gallery Items</h3>
        {albums.map((album) => (
          <div key={album} className="mb-6">
            <h4 className="text-md font-semibold mb-2">{album}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems
                .filter((item) => item.album === album)
                .map((item) => (
                  <div key={item.id} className="border p-4 rounded">
                    {item.mediaUrl && (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm">{item.description}</p>
                    <button
                      onClick={() => handleDelete(item.id, item.mediaUrl)}
                      className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
