import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey:['posts'], // as useState()
    queryFn:fetchPosts,  // as useEffect()
    // gcTime:1000,
    staleTime:10000,
    refetchInterval:1000,
    refetchIntervalInBackground:true
  })

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};