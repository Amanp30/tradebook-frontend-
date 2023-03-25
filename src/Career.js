import { useParams } from "react-router-dom";

function Career() {
  const { user } = useParams();

  return (
    <div>
      <h1>User: {user}</h1>
      {/* Render the user data */}
    </div>
  );
}

export default Career;
