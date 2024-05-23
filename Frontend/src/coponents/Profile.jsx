import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams();
  const redirect = useNavigate();
  useEffect(() => {
    const userId = param.userId;
    axios
      .get(`/api/user/${userId}`)
      .then((res) => {
        console.log("responce");
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        redirect("/");
      });
    // console.log(userId)
  });
  return <div>profile Page</div>;
};

export default Profile;
