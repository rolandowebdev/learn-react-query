import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const POSTS = [
  { id: 1, title: 'Iron Man' },
  { id: 2, title: 'Doctor Strange' }
];

const Basic = () => {
  const queryClient = useQueryClient();

  // Function get data
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS])
  });

  // Function add data
  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(500).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  const { isLoading, isError, error, data } = postQuery;

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;

  return (
    <div>
      <h1>Tanstack Query</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button
        disabled={newPostMutation.isLoading}
        type='button'
        onClick={() => newPostMutation.mutate('New Post')}>
        Add Post
      </button>
    </div>
  );
};

const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default Basic;
