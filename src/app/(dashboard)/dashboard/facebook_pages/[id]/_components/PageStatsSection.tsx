import { Calendar, Globe, ThumbsUp, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageData {
  picture?: {
    data?: {
      url: string;
    };
  };
  name: string;
  is_verified?: boolean;
  category: string;
  createdAt: string;
  followers_count: number;
  link: string;
}

interface PageStatsSectionProps {
  pageDetails: {
    data: PageData;
  };
}

export default function PageStatsSection({
  pageDetails,
}: PageStatsSectionProps) {
  return (
    <section className="mt-10 border p-4 md:p-6 rounded-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:justify-between">
        {/* Left side - Page Info */}
        <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto">
          <div className="shrink-0">
            <Image
              src={pageDetails?.data?.picture?.data?.url || ""}
              alt={pageDetails?.data?.name}
              width={500}
              height={500}
              className="size-16 md:size-24 rounded-full border"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 items-center flex-wrap">
              <h2 className="font-bold text-xl md:text-2xl truncate">
                {pageDetails?.data?.name}
              </h2>
              {pageDetails?.data?.is_verified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 shrink-0"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
              )}
            </div>

            <p className="bg-blue-100 text-[10px] md:text-xs rounded-full px-2 md:px-3 inline-block text-blue-500 py-1 mt-1">
              {pageDetails?.data?.category}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="text-green-500 size-4" />
              <h2 className="text-xs md:text-sm text-gray-500">
                <span className="text-green-500">8.5%</span> Up from yesterday
              </h2>
            </div>
          </div>
        </div>

        {/* Right side - Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 w-full lg:w-auto lg:min-w-[320px]">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-blue-200 rounded-xl shrink-0">
              <ThumbsUp className="text-blue-500 size-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs text-gray-500">Page Likes</h1>
              <p className="font-bold text-xs md:text-sm text-gray-800">
                {200}+
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-red-200 rounded-xl shrink-0">
              <Calendar className="text-red-500 size-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs text-gray-500">Created</h1>
              <p className="font-bold text-xs md:text-sm text-gray-800">
                {new Date(pageDetails?.data?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-green-200 rounded-xl shrink-0">
              <Users className="text-green-500 size-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs text-gray-500">Followers</h1>
              <p className="font-bold text-xs md:text-sm text-gray-800">
                {pageDetails?.data?.followers_count}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-purple-200 rounded-xl shrink-0">
              <Globe className="text-purple-500 size-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs text-gray-500">Page URL</h1>
              <Link
                href={pageDetails?.data?.link}
                className="font-bold text-xs md:text-sm text-gray-800 truncate block max-w-[100px] md:max-w-[120px] hover:text-blue-500 hover:underline"
              >
                {(pageDetails?.data?.link).substring(0, 30)}...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
