import { Outlet } from "@remix-run/react";

export default function TodosRoute() {
  return (
    <div className="flex items-center justify-center w-screen h-screen font-medium">
      <div className="flex flex-grow items-center justify-center flex-col bg-gray-900 h-full">
        <h1 className="text-2xl text-gray-200 mb-4">Todo App</h1>

        <div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg w-96 text-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
