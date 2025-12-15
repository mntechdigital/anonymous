"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  X,
  ImageIcon,
  Video,
  Calendar,
  Clock,
  Cloud,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { post } from "@/service/post";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ✅ Zod Schema */
const formSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  media: z.any(),
  scheduleDate: z.string().optional(),
  scheduleTime: z.string().optional(),
});

export default function CreatePostModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const [activeTab, setActiveTab] = useState<"image" | "video">("image");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      media: undefined,
      scheduleDate: "",
      scheduleTime: "",
    },
  });

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    // Generate preview URLs
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    form.setValue("media", [...selectedFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      "media",
      selectedFiles.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, "this is test value");
    setIsLoading(true);

    try {
      // Convert to FormData to handle file upload
      const formData = new FormData();
      formData.append("content", values.content);
      if (values.scheduleDate) {
        formData.append("scheduleDate", values.scheduleDate);
      }
      if (values.scheduleTime) {
        formData.append("scheduleTime", values.scheduleTime);
      }

      // Add multiple media files if present
      if (selectedFiles && selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          formData.append(`media`, file);
        });
      }

      const res = await post(formData); 

      if (res?.statusCode === 500) {
        toast.error(res?.message || "Server Error", {
          duration: 4000,
        });
        return;
      }
      if (res?.data) {
        const { success, message, successCount, failureCount } = res.data;

        if (success) {
          // Success toast
          toast.success(message || "Post created successfully!", {
            description: `Successfully posted on ${successCount} page(s)`,
            duration: 4000,
          });
        } else {
          // Warning toast if some pages failed
          if (failureCount > 0) {
            toast.warning(message || "Post created with some failures", {
              description: `Success: ${successCount} | Failed: ${failureCount}`,
              duration: 4000,
            });
          } else {
            toast.info(message || "Post processed", {
              duration: 4000,
            });
          }
        }
      } else {
        toast.error("Unexpected response format", {
          description: "Unable to process the response",
          duration: 4000,
        });
      }

      form.reset();
      setSelectedFiles([]);
      setPreviewUrls([]);
      onClose();
    } catch (error) {
      // Error toast
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error("Failed to create post", {
        description: errorMessage,
        duration: 4000,
      });
      console.error("Error submitting post:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
        style={{
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Modal Content */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-white/20">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={40} className="animate-spin text-blue-500" />
              <p className="text-gray-600 font-medium">Publishing post...</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base">f</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Create New Post
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Create and schedule content for your Facebook page
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("image")}
            type="button"
            disabled={isLoading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              activeTab === "image"
                ? "bg-white text-blue-600 shadow-md"
                : "text-gray-600 hover:text-gray-900"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ImageIcon size={18} />
            Image
          </button>

          <button
            onClick={() => setActiveTab("video")}
            type="button"
            disabled={isLoading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              activeTab === "video"
                ? "bg-white text-blue-600 shadow-md"
                : "text-gray-600 hover:text-gray-900"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
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
                  <FormLabel className="text-gray-900 font-semibold">
                    Post Content
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      disabled={isLoading}
                      rows={5}
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50/50 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-semibold">
                    Upload Media
                  </FormLabel>

                  {/* Image Preview Grid */}
                  {previewUrls.length > 0 && (
                    <div className="mb-4 grid grid-cols-3 gap-3">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200 group-hover:border-blue-400 transition"
                            style={{
                              width: "100%",
                              height: "96px",
                              objectFit: "cover",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            disabled={isLoading}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <FormControl>
                    <label className="flex items-center gap-3 px-4 py-4 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50/30 transition group disabled:opacity-50">
                      <Cloud
                        size={24}
                        className="text-gray-400 group-hover:text-blue-500 transition"
                      />
                      <div>
                        <p className="text-gray-700 font-medium">
                          {selectedFiles.length > 0
                            ? `${selectedFiles.length} file(s) selected`
                            : "Click to upload "}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activeTab === "image"
                            ? "PNG, JPG, GIF up to 10MB"
                            : "MP4, WebM up to 100MB"}
                        </p>
                      </div>
                      <input
                        type="file"
                        accept={activeTab === "image" ? "image/*" : "video/*"}
                        className="hidden"
                        multiple
                        disabled={isLoading}
                        onChange={handleMediaChange}
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
                    <FormLabel className="text-gray-900 font-semibold">
                      Schedule Date
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <Calendar size={18} className="text-gray-400" />
                        <Input
                          type="date"
                          {...field}
                          disabled={isLoading}
                          className="border-0 bg-transparent focus:ring-0 p-0 text-gray-900 disabled:opacity-50"
                        />
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
                    <FormLabel className="text-gray-900 font-semibold">
                      Schedule Time
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <Clock size={18} className="text-gray-400" />
                        <Input
                          type="time"
                          {...field}
                          disabled={isLoading}
                          className="border-0 bg-transparent focus:ring-0 p-0 text-gray-900 disabled:opacity-50"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2 h-10 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 h-10 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
