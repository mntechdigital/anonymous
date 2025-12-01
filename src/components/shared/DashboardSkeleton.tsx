/* eslint-disable react-hooks/purity */
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

// Header Skeleton - Matches DashboardHeader component
export const HeaderSkeleton = () => {
  return (
    <div className="mb-6 space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
  );
};

// Stats Card Skeleton
export const StatsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
};

// Stats Grid Skeleton
export const StatsGridSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 5 }: { columns?: number }) => {
  return (
    <div className="flex items-center gap-4 py-4 px-4 border-b last:border-b-0">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: `repeat(${columns - 1}, 1fr)` }}>
        {Array.from({ length: columns - 1 }).map((_, i) => (
          <Skeleton key={i} className={cn("h-4", i === 0 ? "w-full" : "w-3/4")} />
        ))}
      </div>
    </div>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-28" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Table Header */}
        <div className="flex items-center gap-4 py-3 px-4 border-b bg-muted/50">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} columns={columns} />
        ))}
      </CardContent>
    </Card>
  );
};
// Chart Skeleton
export const ChartSkeleton = () => {
  const barHeights = useMemo(
    () =>
      Array.from({ length: 12 }).map(
        () => `${Math.random() * 60 + 40}%`
      ),
    []
  );

  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-64">
          {barHeights.map((height, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t-md"
              style={{ height }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-8" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


// Post Card Skeleton - For scheduled posts
export const PostCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Posts Grid Skeleton
export const PostsGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};

// Page Card Skeleton - For Facebook pages
export const PageCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-4 pt-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

// Pages Grid Skeleton
export const PagesGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PageCardSkeleton key={i} />
      ))}
    </div>
  );
};

// Action Bar Skeleton - For page headers with actions
export const ActionBarSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
};

// Filter Bar Skeleton
export const FilterBarSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <Skeleton className="h-10 w-64 rounded-md" />
      <Skeleton className="h-10 w-32 rounded-md" />
      <Skeleton className="h-10 w-32 rounded-md" />
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>
  );
};

// Full Dashboard Loading - Combines multiple skeletons
export const DashboardLoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <HeaderSkeleton />
      <StatsGridSkeleton count={4} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
};

// Posts Schedule Loading
export const PostsScheduleLoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <ActionBarSkeleton />
      <FilterBarSkeleton />
      <PostsGridSkeleton count={6} />
    </div>
  );
};

// Facebook Pages Loading
export const FacebookPagesLoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <ActionBarSkeleton />
      <FilterBarSkeleton />
      <PagesGridSkeleton count={6} />
    </div>
  );
};

// Generic Content Loading with optional message
interface ContentLoadingProps {
  message?: string;
  showSpinner?: boolean;
}

export const ContentLoading = ({ message = "Loading...", showSpinner = true }: ContentLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      {showSpinner && (
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-muted animate-spin border-t-primary" />
        </div>
      )}
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </div>
  );
};

// Pulse Loading Dots
export const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
      <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
      <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce" />
    </div>
  );
};
