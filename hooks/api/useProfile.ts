import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetch(`/api/profile`).then((res) => res.json()),
  });
  if (isPending) return "Loading...";
  if (error) return "Error!" + error.message;
  return data;
};
