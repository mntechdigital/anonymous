"use client"

import { useState } from "react"
import { X, ImageIcon, Video, Calendar, Clock, Cloud } from "lucide-react"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [activeTab, setActiveTab] = useState<"image" | "video">("image")
  const [postContent, setPostContent] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">f</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create New Post</h2>
              <p className="text-sm text-gray-600">Create and schedule content for your Facebook page</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("image")}
            className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition ${
              activeTab === "image" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ImageIcon size={18} />
            Image
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition ${
              activeTab === "video" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Video size={18} />
            Video
          </button>
        </div>

        {/* Form Content */}
        <form className="space-y-5">
          {/* Post Content */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Post Content<span className="text-red-500">*</span>
            </label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
              rows={5}
            />
          </div>

          {/* Upload Media */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Upload Media<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <Cloud size={20} className="text-gray-400" />
              <span className="text-gray-600">Select from file</span>
              <input type="file" className="hidden" accept={activeTab === "image" ? "image/*" : "video/*"} />
            </div>
          </div>

          {/* Schedule Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Schedule Date</label>
              <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg">
                <Calendar size={18} className="text-gray-400" />
                <input
                  type="text"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  placeholder="DD-MM-YYYY"
                  className="flex-1 outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Schedule Time</label>
              <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg">
                <Clock size={18} className="text-gray-400" />
                <input
                  type="text"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  placeholder="--:-- --"
                  className="flex-1 outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
