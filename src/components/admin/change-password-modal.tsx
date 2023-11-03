"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { add, deleteFn, update } from "@/services/users";

import { BiTrashAlt, BiEditAlt, BiAddToQueue } from "react-icons/bi";

interface User {
  email: string;
  role: string;
}

export default function Page({ data, mutate }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    role: "admin",
    password: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>({
    email: "",
    role: "",
  });

  const openModal = (user: User) => {
    setEditingUser(user);
    mutate("/credentials");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    await update(editingUser);
    mutate("/credentials");
    closeModal();
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = async () => {
    await add(newUser);
    mutate("/credentials");
    closeAddModal();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold h-[150px] flex items-center pl-5">
        User Management
      </h1>

      <table className="divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email/NAME
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((user: any, index: any) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => openModal(user)}
                  className="px-4 py-2  rounded-md hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue active:bg-gray-500 transition duration-150 ease-in-out"
                >
                  <BiEditAlt size={20} />
                </button>
                <button
                  className="ml-2 px-4 py-2  rounded-md hover:bg-gray-100 focus:outline-none focus:shadow-outline-red active:bg-gray-500 transition duration-150 ease-in-out"
                  onClick={() => deleteFn(user.id)}
                >
                  <BiTrashAlt size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-4 py-2 font-medium text-white bg-[#111827] rounded-md hover:bg-[#111827] focus:outline-none focus:shadow-outline-green active:bg-[#111827] transition duration-150 ease-in-out mt-5 flex items-center gap-2"
      >
        <BiAddToQueue /> Add New
      </button>

      {/* Edit User Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Edit User
              </Dialog.Title>
              <form>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    value={editingUser ? editingUser.email : ""}
                    onChange={(e) =>
                      // @ts-ignore
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="text"
                    // @ts-ignore
                    value={editingUser ? editingUser.password : ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        // @ts-ignore
                        password: e.target.value,
                      })
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleEdit}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover-bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isAddModalOpen}
        onClose={closeAddModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-900 mb-3 "
              >
                Add User
              </Dialog.Title>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email or Name
                </label>
                <input
                  required
                  type="text"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  required
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  required
                  type="text"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleAdd}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover-bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                onClick={closeAddModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
