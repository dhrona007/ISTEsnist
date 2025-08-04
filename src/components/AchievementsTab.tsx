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

const AchievementsTab: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    description: "",
    mediaUrl: "",
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const achievementsRef = ref(db, "achievements");
    const unsubscribe = onValue(achievementsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const achievementsArray = Object.entries(data).map(
          ([key, value]: any) => ({
            id: key,
            ...value,
          })
        );
        setAchievements(achievementsArray);
      } else {
        setAchievements([]);
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

  const uploadMedia = async (file: File, achievementId: string) => {
    const mediaRef = storageRef(
      storage,
      `achievements/${achievementId}/${file.name}`
    );
    await uploadBytes(mediaRef, file);
    const url = await getDownloadURL(mediaRef);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const achievementsRef = ref(db, "achievements");
      const newAchievementRef = push(achievementsRef);
      let mediaUrl = "";
      if (mediaFile) {
        mediaUrl = await uploadMedia(mediaFile, newAchievementRef.key!);
      }
      await set(newAchievementRef, {
        title: formData.title,
        year: formData.year,
        description: formData.description,
        mediaUrl,
      });
      setMessage("Achievement added successfully");
      setFormData({
        title: "",
        year: "",
        description: "",
        mediaUrl: "",
      });
      setMediaFile(null);
    } catch (error) {
      setMessage("Failed to add achievement");
    }
  };

  const handleDelete = async (id: string, mediaUrl: string) => {
    try {
      if (mediaUrl) {
        const mediaRef = storageRef(storage, mediaUrl);
        await deleteObject(mediaRef);
      }
      const achievementRef = ref(db, `achievements/${id}`);
      await remove(achievementRef);
      setMessage("Achievement deleted");
    } catch (error) {
      setMessage("Failed to delete achievement");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Achievements</h2>
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
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
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
          Add Achievement
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Achievements</h3>
        {achievements.length === 0 && <p>No achievements found.</p>}
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id} className="mb-4 border p-4 rounded">
              <div className="flex items-center space-x-4">
                {achievement.mediaUrl && (
                  <img
                    src={achievement.mediaUrl}
                    alt={achievement.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold">{achievement.title}</p>
                  <p>{achievement.year}</p>
                  <p>{achievement.description}</p>
                </div>
                <button
                  onClick={() =>
                    handleDelete(achievement.id, achievement.mediaUrl)
                  }
                  className="ml-auto bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AchievementsTab;
