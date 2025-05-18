import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts } from "../API/api";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ = () => {
  const [pageNumber,setPageNumber] = useState(0)
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts",pageNumber], // as useState()
    queryFn: () => fetchPosts(pageNumber), // as useEffect()
    // gcTime:1000,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    placeholderData:keepPreviousData, //data jab fetch kr rhe ho previous data as it is rkhna, loading nhi dikhayega usi page pr rhega jb tk tk data nhi aajata
  });

  // Mutation function to delete the post 
  const deleteMutation = useMutation({
    mutationFn:(id) => deletePost(id),
    // if u want to delete the data from cache 
    onSuccess:(data,id) => {
      // console.log(data,id)
      queryClient.setQueryData(["posts",pageNumber],(curEle)=>{
        console.log(curEle)
        return curEle?.filter((post) => post.id != id);
      })
    }
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
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
                <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Prev
        </button>
        <p>{pageNumber}</p>
        <button onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};
