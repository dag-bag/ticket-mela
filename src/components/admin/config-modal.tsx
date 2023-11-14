"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { add, deleteFn, update } from "@/services/forms";
import { BiTrashAlt, BiEditAlt, BiAddToQueue } from "react-icons/bi";
import { useSWRConfig } from "swr";
interface Form {
  type: string;
  label: string;
  placeholder: string;
  category: string;
  price: number;
  name: string;
  id?: string;
}

export default function FormManagement({ data }: any) {
  const { mutate } = useSWRConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newForm, setNewForm] = useState<Form | any>({
    type: "text",
    label: "",
    placeholder: "",
    category: "",
    price: 0,
    name: "",
  });
  const [editingForm, setEditingForm] = useState<Form | any>(null);

  const openModal = (form: Form) => {
    setEditingForm(form);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingForm(null);
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    await update(editingForm);
    mutate("/forms");
    closeModal();
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = async () => {
    await add(newForm);
    mutate("/forms");
    closeAddModal();
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value =
      fieldName === "price" ? parseFloat(e.target.value) : e.target.value;
    setNewForm({ ...newForm, [fieldName]: value });
  };
  return (
    <div>
      <h1 className="text-2xl font-bold h-[150px] flex items-center pl-5">
        Form Configuration
      </h1>

      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Label
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Placeholder
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((form: Form, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{form.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{form.label}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {form.placeholder}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{form.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{form.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{form.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => openModal(form)}
                  className="px-4 py-2  rounded-md hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue active:bg-gray-500 transition duration-150 ease-in-out"
                >
                  <BiEditAlt size={20} />
                </button>
                <button
                  className="ml-2 px-4 py-2  rounded-md hover:bg-gray-100 focus:outline-none focus:shadow-outline-red active:bg-gray-500 transition duration-150 ease-in-out"
                  onClick={() => {
                    deleteFn(form.id as string);
                    mutate("/forms");
                  }}
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

      {/* Edit Form Modal */}
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
                Edit Form
              </Dialog.Title>
              <form>
                {Object.keys(newForm).map((fieldName) => (
                  <div className="mt-4" key={fieldName}>
                    <label className="block text-sm font-medium text-gray-700">
                      {fieldName}
                    </label>
                    {fieldName === "price" ? (
                      <input
                        type="number"
                        value={editingForm ? editingForm[fieldName] : ""}
                        onChange={(e) => handleFieldChange(e, fieldName)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    ) : (
                      <input
                        type="text"
                        value={
                          editingForm ? (editingForm as any)[fieldName] : ""
                        }
                        onChange={(e) => handleFieldChange(e, fieldName)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    )}
                  </div>
                ))}
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
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover-bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      {/* Add Form Modal */}
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
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Add Form
              </Dialog.Title>
              <form>
                {Object.keys(newForm).map((fieldName) => (
                  <div className="mt-4" key={fieldName}>
                    <label className="block text-sm font-medium text-gray-700">
                      {fieldName}
                    </label>
                    {fieldName === "type" ? (
                      <>
                        <select
                          required
                          value={newForm.type}
                          onChange={(e: any) => handleFieldChange(e, "type")}
                          className="mt-1 p-2 w-full border rounded-md"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="select">Select</option>
                        </select>
                      </>
                    ) : fieldName === "price" ? (
                      <>
                        <input
                          type="number"
                          required
                          value={newForm[fieldName]}
                          onChange={(e) => handleFieldChange(e, fieldName)}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                      </>
                    ) : (
                      <input
                        type="text"
                        required
                        value={(newForm as any)[fieldName]}
                        onChange={(e) => handleFieldChange(e, fieldName)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    )}
                  </div>
                ))}
              </form>
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
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover-bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
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
