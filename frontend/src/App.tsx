import { gql, useQuery } from "@apollo/client";

type User = {
  id: string;
  name: string;
};

const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;
function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USER);
  console.log(data);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
