import { Button } from "@/components/ui/button";
import { TPage } from "@/types/page.type";
import { ChartSpline, Eye, Globe, ThumbsUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Pages = ({ data }: { data: TPage[] }) => {
  return (
    <div className="px-5 lg:px-6 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {data.map((page: TPage) => (
        <div
          key={page.id}
          className="relative rounded-lg border border-neutral-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow p-3"
        >
          <Link
            href={page.facebookData?.link || "#"}
            className="absolute right-4 top-2"
          >
            <Globe className="size-4 text-blue-600" />
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={page.facebookData?.picture?.data.url || ""}
              alt={page.name}
              width={128}
              height={128}
              className="w-12 h-12 object-cover rounded-full border border-neutral-200"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <h2 className="font-semibold text-sm text-neutral-900">
                  {page.name}
                </h2>
                {page?.facebookData?.is_verified && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                    <path d="M9 12l2 2l4 -4" />
                  </svg>
                )}
              </div>
              <span className="text-[10px] px-1.5 py-px rounded-full bg-blue-50 text-blue-600 border border-blue-100 w-fit">
                {page.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <ThumbsUp
                size={18}
                className="p-1 rounded-md bg-blue-100 text-blue-600"
              />
              <div className="leading-tight">
                <h3 className="text-[10px] text-muted-foreground">Likes</h3>
                <h4 className="text-xs font-semibold text-blue-700">{2476}+</h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye
                size={18}
                className="p-1 rounded-md bg-rose-100 text-rose-600"
              />
              <div className="leading-tight">
                <h3 className="text-[10px] text-muted-foreground">Views</h3>
                <h4 className="text-xs font-semibold text-rose-700">{2476}+</h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users
                size={18}
                className="p-1 rounded-md bg-indigo-100 text-indigo-600"
              />
              <div className="leading-tight">
                <h3 className="text-[10px] text-muted-foreground">Followers</h3>
                <h4 className="text-xs font-semibold text-indigo-700">
                  {page?.facebookData?.followers_count || 0}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChartSpline
                size={18}
                className="p-1 rounded-md bg-teal-100 text-teal-600"
              />
              <div className="leading-tight">
                <h3 className="text-[10px] text-muted-foreground">Reach</h3>
                <h4 className="text-xs font-semibold text-teal-700">{2476}+</h4>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Link href={`/dashboard/facebook_pages/${page.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2.5 text-xs"
              >
                View Details
              </Button>
            </Link>
            <Link
              href={`/dashboard/facebook_pages/${page.id}`}
              className="ml-auto flex-1"
            >
              <Button
                variant="default"
                size="sm"
                className="h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700 w-full"
              >
                Manage
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pages;
