import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const redirect = useNavigate();
  const createUser = async (req, res) => {
    const data = {
      fullName: "Vaibhav Shinde",
      email: "vaibhav@gmail.com",
      password: "vaibhu@123",
    };

    await axios
      .post("/api/register", data)
      .then((res) => {
        const token = res.data.token;
        const userId = res.data.user._id;
        const message = res.data.message;
        localStorage.setItem("authToken", token);
        redirect(`/profile/${userId}`);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  return (
    <>
      <div>Signup page</div>
      <button onClick={createUser}>Create User</button>
    </>
  );
};

export default Registration;

// useEffect(() => {
//     const getData = async () => {
//       const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGVlYmUyZWU3ODIxMmNkY2NmYjEzNyIsImlhdCI6MTcxNjQ0ODMwOCwiZXhwIjoxNzE2NDUxOTA4fQ.vj14MuZZGW36Z0QjcKU-DFwEOnr3gtNOzIc0Dzy0Lbc";
//       axios
//         .post(
//           "/api/createTodo/664eebe2ee78212cdccfb137",
//           { title: "node js", description: "the runtime env" },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((error) => {
//           console.log(error.response.data.error);
//         });
//     };
//     getData();
//   }, []);
