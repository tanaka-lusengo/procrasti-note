// Placeholder component for PostsSection
export const PostsSection = ({ posts }: { posts: string[] }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>Post: {post}</div>
      ))}
    </div>
  );
};
