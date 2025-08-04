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

const BoardMembersTab: React.FC = () => {
  const [boardMembers, setBoardMembers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    photoUrl: "",
    contact: "",
    tenureStart: "",
    tenureEnd: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const boardMembersRef = ref(db, "boardMembers");
    const unsubscribe = onValue(boardMembersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const membersArray = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }));
        setBoardMembers(membersArray);
      } else {
        setBoardMembers([]);
      }
    });
    return () => unsubscribe();
  }, [db]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const uploadPhoto = async (file: File, memberId: string) => {
    const photoRef = storageRef(
      storage,
      `boardMembers/${memberId}/${file.name}`
    );
    await uploadBytes(photoRef, file);
    const url = await getDownloadURL(photoRef);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const boardMembersRef = ref(db, "boardMembers");
      const newMemberRef = push(boardMembersRef);
      let photoUrl = "";
      if (photoFile) {
        photoUrl = await uploadPhoto(photoFile, newMemberRef.key!);
      }
      await set(newMemberRef, {
        name: formData.name,
        role: formData.role,
        photoUrl,
        contact: formData.contact,
        tenureStart: formData.tenureStart,
        tenureEnd: formData.tenureEnd,
      });
      setMessage("Board member added successfully");
      setFormData({
        name: "",
        role: "",
        photoUrl: "",
        contact: "",
        tenureStart: "",
        tenureEnd: "",
      });
      setPhotoFile(null);
    } catch (error) {
      setMessage("Failed to add board member");
    }
  };

  const handleDelete = async (id: string, photoUrl: string) => {
    try {
      if (photoUrl) {
        const photoRef = storageRef(storage, photoUrl);
        await deleteObject(photoRef);
      }
      const memberRef = ref(db, `boardMembers/${id}`);
      await remove(memberRef);
      setMessage("Board member deleted");
    } catch (error) {
      setMessage("Failed to delete board member");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Board Members</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={formData.contact}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          name="tenureStart"
          placeholder="Tenure Start"
          value={formData.tenureStart}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          name="tenureEnd"
          placeholder="Tenure End"
          value={formData.tenureEnd}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Board Member
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Board Members</h3>
        {boardMembers.length === 0 && <p>No board members found.</p>}
        <ul>
          {boardMembers.map((member) => (
            <li key={member.id} className="mb-4 border p-4 rounded">
              <div className="flex items-center space-x-4">
                {member.photoUrl && (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p>{member.role}</p>
                  <p>{member.contact}</p>
                  <p>
                    Tenure: {member.tenureStart} to {member.tenureEnd}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(member.id, member.photoUrl)}
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

export default BoardMembersTab;
