import React, { useState } from "react";
import BoardMembersTab from "./BoardMembersTab";
import AchievementsTab from "./AchievementsTab";
import GalleryTab from "./GalleryTab";

// Placeholder components for other tabs
const EventsTab: React.FC = () => <p>Events management coming soon.</p>;
const VolunteersTab: React.FC = () => <p>Volunteers management coming soon.</p>;
const AnnouncementsTab: React.FC = () => (
  <p>Announcements management coming soon.</p>
);
const BlogPostsTab: React.FC = () => <p>Blog Posts management coming soon.</p>;
const ContactsTab: React.FC = () => <p>Contacts management coming soon.</p>;

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("events");

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return <EventsTab />;
      case "boardMembers":
        return <BoardMembersTab />;
      case "volunteers":
        return <VolunteersTab />;
      case "achievements":
        return <AchievementsTab />;
      case "announcements":
        return <AnnouncementsTab />;
      case "blogPosts":
        return <BlogPostsTab />;
      case "contacts":
        return <ContactsTab />;
      case "gallery":
        return <GalleryTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4 border-b border-gray-300">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <TabButton
            label="Events"
            isActive={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          />
          <TabButton
            label="Board Members"
            isActive={activeTab === "boardMembers"}
            onClick={() => setActiveTab("boardMembers")}
          />
          <TabButton
            label="Volunteers"
            isActive={activeTab === "volunteers"}
            onClick={() => setActiveTab("volunteers")}
          />
          <TabButton
            label="Achievements"
            isActive={activeTab === "achievements"}
            onClick={() => setActiveTab("achievements")}
          />
          <TabButton
            label="Announcements"
            isActive={activeTab === "announcements"}
            onClick={() => setActiveTab("announcements")}
          />
          <TabButton
            label="Blog Posts"
            isActive={activeTab === "blogPosts"}
            onClick={() => setActiveTab("blogPosts")}
          />
          <TabButton
            label="Contacts"
            isActive={activeTab === "contacts"}
            onClick={() => setActiveTab("contacts")}
          />
          <TabButton
            label="Gallery"
            isActive={activeTab === "gallery"}
            onClick={() => setActiveTab("gallery")}
          />
        </nav>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
      isActive
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default AdminDashboard;
