import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name?: string;
  email?: string;
};

export const GET_USER = gql`
  query {
    users {
      id
      email
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
          <li key={user.id}>
            {user.id} {user.name} {user.email}
          </li>
        ))}
      </ul>
      <NewUserForm />
    </div>
  );
}

export default App;
