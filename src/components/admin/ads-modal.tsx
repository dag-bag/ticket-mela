"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { createAd, deleteAd, updateAd } from "@/services/ads";

interface Ad {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  // Add other ad-related fields here
}

interface AdsManagementProps {
  data: Ad[] | []; // Assuming data is an array of ads
}

export default function AdsManagement({ data }: AdsManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAd, setNewAd] = useState<Ad>({
    id: "",
    title: "",
    description: "",
    imageURL: "",
    // Initialize other ad-related fields here
  });
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  const openModal = (ad: Ad) => {
    setEditingAd(ad);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingAd(null);
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    if (editingAd) {
      await updateAd(editingAd.id, editingAd);
    }
    closeModal();
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = async () => {
    await createAd(newAd);
    closeAddModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewAd({ ...newAd, imageURL: URL.createObjectURL(file) });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold h-[150px] flex items-center pl-5">
        Advertisement Magagement
      </h1>
      <table className="divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((ad, index) => (
            <tr key={ad.id}>
              <td>{ad.title}</td>
              <td>{ad.description}</td>
              <td>
                {ad.imageURL && (
                  <img
                    src={ad.imageURL}
                    alt={ad.title}
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </td>
              {/* Add other table data for ad fields */}
              <td>
                <button onClick={() => openModal(ad)}>Edit</button>
                <button onClick={() => deleteAd(ad.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-4 py-2 font-medium text-white bg-[#111827] rounded-md hover:bg-[#111827] focus:outline-none focus:shadow-outline-green active:bg-[#111827] transition duration-150 ease-in-out mt-5 flex items-center gap-2"
      >
        Add New
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
              <Dialog.Panel>
                <form>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newAd.title}
                      onChange={(e) =>
                        setNewAd({ ...newAd, title: e.target.value })
                      }
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newAd.description}
                      onChange={(e) =>
                        setNewAd({ ...newAd, description: e.target.value })
                      }
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                    {newAd.imageURL && (
                      <img
                        src={newAd.imageURL}
                        alt="Preview"
                        style={{ maxWidth: "100px" }}
                      />
                    )}
                  </div>
                  {/* Add other input fields for ad */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out mb-24"
                    >
                      Upload
                    </button>
                    <button
                      onClick={closeAddModal}
                      className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>

    // <div>
    //   <h1 className="text-2xl font-bold p-10">Ads Management</h1>

    //   <button onClick={() => setIsAddModalOpen(true)}>Upload New Ad</button>

    //   <table className="w-full divide-y divide-gray-200">
    //     <thead>
    //       <tr>
    //         <th>Title</th>
    //         <th>Description</th>
    //         <th>Image</th>
    //         {/* Add other table headers for ad fields */}
    //         <th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((ad, index) => (
    //         <tr key={ad.id}>
    //           <td>{ad.title}</td>
    //           <td>{ad.description}</td>
    //           <td>
    //             {ad.imageURL && (
    //               <img
    //                 src={ad.imageURL}
    //                 alt={ad.title}
    //                 style={{ maxWidth: "100px" }}
    //               />
    //             )}
    //           </td>
    //           {/* Add other table data for ad fields */}
    //           <td>
    //             <button onClick={() => openModal(ad)}>Edit</button>
    //             <button onClick={() => deleteAd(ad.id)}>Delete</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   {/* Edit Ad Modal */}
    //   <Dialog open={isModalOpen} onClose={closeModal}>
    //     {/* Add modal content for editing an ad */}
    //   </Dialog>

    //   {/* Add Ad Modal */}
    //   <Dialog open={isAddModalOpen} onClose={closeAddModal}>
    //     <div className="p-4">
    //       <h2 className="text-2xl font-bold">Upload New Ad</h2>
    //       <form>
    //         <div className="mt-4">
    //           <label className="block text-sm font-medium text-gray-700">
    //             Title
    //           </label>
    //           <input
    //             type="text"
    //             value={newAd.title}
    //             onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
    //             className="mt-1 p-2 w-full border rounded-md"
    //           />
    //         </div>
    //         <div className="mt-4">
    //           <label className="block text-sm font-medium text-gray-700">
    //             Description
    //           </label>
    //           <input
    //             type="text"
    //             value={newAd.description}
    //             onChange={(e) =>
    //               setNewAd({ ...newAd, description: e.target.value })
    //             }
    //             className="mt-1 p-2 w-full border rounded-md"
    //           />
    //         </div>
    //         <div className="mt-4">
    //           <label className="block text-sm font-medium text-gray-700">
    //             Image
    //           </label>
    //           <input
    //             type="file"
    //             onChange={handleFileChange}
    //             className="mt-1 p-2 w-full border rounded-md"
    //           />
    //           {newAd.imageURL && (
    //             <img
    //               src={newAd.imageURL}
    //               alt="Preview"
    //               style={{ maxWidth: "100px" }}
    //             />
    //           )}
    //         </div>
    //         {/* Add other input fields for ad */}
    //         <div className="mt-4">
    //           <button
    //             type="button"
    //             onClick={handleAdd}
    //             className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out mb-24"
    //           >
    //             Upload
    //           </button>
    //           <button
    //             onClick={closeAddModal}
    //             className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </Dialog>
    // </div>
  );
}
