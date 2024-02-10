import { Skeleton } from "../ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton className="w-full h-[350px]" />
        <Skeleton className="w-full h-[350px]" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-full h-[350px]" />
        <Skeleton className="w-full h-[350px]" />
      </div>
    </div>
  );
};

export default Loading;
