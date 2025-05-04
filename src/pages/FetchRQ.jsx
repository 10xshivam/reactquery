import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const { data } = useQuery({
    queryKey:['posts'],
    queryFn:fetchPosts
  })

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