"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { X, ImageIcon, Video, Calendar, Clock, Cloud } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

/* ✅ Zod Schema */
const formSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  media: z.any(),
  scheduleDate: z.string().optional(),
  scheduleTime: z.string().optional(),
})

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [activeTab, setActiveTab] = useState<"image" | "video">("image")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      media: undefined,
      scheduleDate: "",
      scheduleTime: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values)
    console.log("Uploaded File:", values.media?.[0])

    form.reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
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
            type="button"
            className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition ${activeTab === "image" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
          >
            <ImageIcon size={18} />
            Image
          </button>

          <button
            onClick={() => setActiveTab("video")}
            type="button"
            className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition ${activeTab === "video" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
          >
            <Video size={18} />
            Video
          </button>
        </div>

        {/* ✅ shadcn Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Post Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={5}
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Media */}
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Media</FormLabel>
                  <FormControl>
                    <label className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <Cloud size={20} className="text-gray-400" />
                      <span className="text-gray-600">Select from file</span>
                      <input
                        type="file"
                        accept={activeTab === "image" ? "image/*" : "video/*"}
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Schedule Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduleDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Date</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3 px-4 py-2 border rounded-lg">
                        <Calendar size={18} className="text-gray-400" />
                        <Input type="date" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Schedule Time */}
              <FormField
                control={form.control}
                name="scheduleTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Time</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3 px-4 py-2 border rounded-lg">
                        <Clock size={18} className="text-gray-400" />
                        <Input type="time" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Confirm
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  )
}
