import { useApp } from "../../stores/useApp";

type LoaderProps = {
  message?: string;
};

export function EnvironmentLoader({
  message = "Preparing the environment for you...",
}: LoaderProps) {
  const isLoading = useApp((state) => state.isLoading);

  if (isLoading) {
    return null;
  }

  return (
    <div
      className="z-[100] absolute top-0 left-0 right-0
    bottom-0  flex min-h-screen flex-col gap-3 items-center justify-center bg-lightBackground text-lightText"
    >
      <div className="text-3xl font-bold text-black">StructuredData2Graph</div>
      <div className="text-lg font-semibold ">{message}</div>
    </div>
  );
}
