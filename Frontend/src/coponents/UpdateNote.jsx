import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logoImg from "./Images/logoLite.png";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateNote = () => {
  const param = useParams();
  const redirect = useNavigate();

  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const updateNote = (e) => {
    e.preventDefault();
    const noteId = note._id;
    axios
      .put(`/api/update/note/${noteId}`, note)
      .then((res) => {
        toast.success(res.data.message);
        return redirect(`/profile/${note.writer}`);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await axios.get(`/api/note/${param.noteId}`);
        setNote(res.data.note);
      } catch (error) {
        console.log(error);
      }
    };
    getNote();
  }, [param.noteId]);

  return (
    <>
      <div className="flex flex-col w-[100%] h-screen bg-slate-200 font-poppins">
        <div className="w-[100%] flex justify-around p-3 md:p-5 bg-slate-100">
          <div className="flex md:justify-center w-[50%]">
            <img src={logoImg} alt="logo" className="w-[150px] md:w-[200px]" />
          </div>
          <div className=" w-[50%] flex gap-2 md:gap-10 justify-center items-center">
            <NavLink
              to={"/login"}
              className="bg-blue-600 hover:bg-blue-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]"
            >
              Profile
            </NavLink>
            <NavLink
              to={"/register"}
              className="bg-red-600 hover:bg-red-700 md:px-4 px-3 py-2 text-white font-[500] rounded-[10px]"
            >
              LogOut
            </NavLink>
          </div>
        </div>

        <div className="flex justify-center mt-[15%] md:mt-[8%]">
          <div className=" w-[85%] md:w-[25%] p-3 rounded-[15px] shadow-[0px_0px_20px_-7px_black] bg-white">
            <p className="text-center font-[500] text-[19px]">
              Update Your Note
            </p>

            <form onSubmit={updateNote} className="mt-2 md:px-2">
              <label htmlFor="" className="">
                Title :
              </label>
              <input
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="write a title"
                className="border-2 border-slate-300 rounded-[15px] w-[100%] py-1.5 px-3 mt-1 mb-3"
              />
              <label htmlFor="">Description : </label>
              <textarea
                name="description"
                value={note.description}
                onChange={handleChange}
                placeholder="write description. . . "
                className="border-2 border-slate-300 rounded-[15px] w-[100%] py-1.5 px-3 mt-1 mb-4"
              ></textarea>

              <div className="w-[100%] flex justify-center items-center gap-2">
                <NavLink
                  to={"/login"}
                  className="w-[50%] text-center bg-gray-600 hover:bg-gray-700 px-4 py-2 text-white font-[500] rounded-[10px]"
                >
                  Cancle
                </NavLink>
                <button
                  type="submit"
                  className="w-[50%] text-center bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-[500] rounded-[10px]"
                >
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateNote;
