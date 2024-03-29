import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getBlog } from "../Hooks/getApi";
import Spinner from "../Utils/Spinner";
import "./Blog.css";

const RecentBlog = () => {
  const { data, isLoading, isError, error } = useQuery(["blog"], () =>
    getBlog()
  );

  const title = (data) => data?.slice(0, 50);
  const excerpt = (data) => data?.slice(0, 100);
  if (isLoading) {
    return (
      <div className="absolute  top-1/4 left-2/4 w-12 h-12 bg-gray-50 shadow rounded-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <span className="absolute min-h-screen top-2/4 left-2/4">
        There was an server site {error.message}
      </span>
    );
  }

  return (
    <section className="relative">
      <article className="mt-4 mx-2 overflow-y-auto min-h-screen">
        {data?.slice(0, 10).map((data, index) => {
          return (
            <div key={index} className="mb-5 border-b py-2 mt-2">
              <h3 className="text-gray-700">{title(data?.title)}</h3>
              <p className="text-gray-600">
                {excerpt(data?.excerpt)}
                <Link
                  to={`/read/${data._id}`}
                  className="ml-1 font-extralight text-gray-500 text-sm hover:underline hover:text-[#5da0de]"
                >
                  ...Read more
                </Link>
              </p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default RecentBlog;
