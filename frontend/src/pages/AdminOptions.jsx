// src/pages/AdminOptions.jsx
import { useState } from "react";
import { register, createDepartment, changeDepartment } from "../api/services";

export default function AdminOptions() {
  const [departmentName, setDepartmentName] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    department: "",
  });

  const [deptChange, setDeptChange] = useState({
    userId: "",
    deptName: "",
  });

  const handleCreateDepartment = async () => {
    try {
      const res = await createDepartment(departmentName);
      console.log("Department created:", res);
      setDepartmentName("");
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const res = await register(newUser);
      console.log("User created:", res);
      setNewUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        department: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleChangeDepartment = async () => {
    try {
      const res = await changeDepartment(
        deptChange.userId,
        deptChange.deptName
      );
      console.log("Department changed:", res);
      setDeptChange({ userId: "", deptName: "" });
    } catch (error) {
      console.error("Error changing department:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 rounded-2xl bg-white/30 mt-10 flex flex-col gap-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black text-center md:text-left">
        Admin Options
      </h1>

      {/* Create Department */}
      <div className="w-full mx-auto md:mx-0 p-6 md:p-8 bg-white/50 backdrop-blur-md rounded-2xl shadow flex flex-col gap-4 border border-white/30">
        <h2 className="text-2xl font-semibold text-black mb-2">
          Create Department
        </h2>
        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border border-white/70 focus:outline-none placeholder-black/80 text-black"
        />
        <button
          onClick={handleCreateDepartment}
          className="self-start px-6 py-3 rounded-2xl bg-white/30 text-black hover:bg-white/50 hover:text-black/50transition shadow"
        >
          Create Department
        </button>
      </div>

      {/* Create User */}
      <div className="w-full mx-auto md:mx-0 p-6 md:p-8 bg-white/40  backdrop-blur-md rounded-2xl shadow flex flex-col gap-4 border border-white/30">
        <h2 className="text-2xl font-semibold text-black mb-2">Create User</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-white/70 placeholder-black/80"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-2xl border border-white/70 placeholder-black/80"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-white/70 placeholder-black/80"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-white/70 placeholder-black/80"
          />
        </div>

        <input
          type="text"
          placeholder="Department ID / Name"
          value={newUser.department}
          onChange={(e) =>
            setNewUser({ ...newUser, department: e.target.value })
          }
          className="w-full px-4 py-3 rounded-2xl border border-white/70 placeholder-black/80"
        />

        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full md:w-1/3 px-4 py-3 rounded-2xl border border-white/70 placeholder-black/80 text-black/80"
        >
          <option value="">Select Role</option>
          <option value="admin">Manager</option>
          <option value="user">Employee</option>
        </select>

        <button
          onClick={handleCreateUser}
          className="self-start px-6 py-3 rounded-2xl bg-white/30 text-black/80 hover:bg-white-500 hover:text-black/50 transition shadow mt-2"
        >
          Create User
        </button>
      </div>

      {/* Change Department of User */}
      <div className="w-full mx-auto md:mx-0 p-6 md:p-8 bg-white/40 backdrop-blur-md rounded-2xl shadow flex flex-col gap-4 border border-white/30">
        <h2 className="text-2xl font-semibold text-black mb-2">
          Change User Department
        </h2>
        <input
          type="text"
          placeholder="User ID"
          value={deptChange.userId}
          onChange={(e) =>
            setDeptChange({ ...deptChange, userId: e.target.value })
          }
          className="w-full px-4 py-3 rounded-2xl border border-green-400 placeholder-green-500 text-green-500"
        />
        <input
          type="text"
          placeholder="New Department Name"
          value={deptChange.deptName}
          onChange={(e) =>
            setDeptChange({ ...deptChange, deptName: e.target.value })
          }
          className="w-full px-4 py-3 rounded-2xl border border-green-400 placeholder-green-500 text-green-500"
        />
        <button
          onClick={handleChangeDepartment}
          className="self-start px-6 py-3 rounded-2xl bg-green-100 text-green-500 hover:bg-green-500 hover:text-green-200 transition shadow"
        >
          Change Department
        </button>
      </div>
    </div>
  );
}
