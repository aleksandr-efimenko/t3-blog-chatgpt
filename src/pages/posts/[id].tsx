import { useRouter } from "next/router";
import AnimatedSpinner from "~/components/AnimatedSpinner";
import PostElement from "~/components/PostElement";
import { api } from "~/utils/api";

const Post = () => {
  const id = useRouter().query.id;

  const { data: post } = api.posts.getPostById.useQuery({ id: id as string });

  if (!post)
    return (
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        <AnimatedSpinner />;
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <PostElement post={post} />
    </div>
  );
};

export default Post;
