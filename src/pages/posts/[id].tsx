import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Post = () => {
  const id = useRouter().query.id;

  const { data: post } = api.posts.getPostById.useQuery({ id: id as string });

  return (
    <div className="flex flex-col items-center justify-center  text-white">
      <h2 className="text-3xl">{post?.title}</h2>
      <p>{post?.content}</p>
    </div>
  );
};

export default Post;
