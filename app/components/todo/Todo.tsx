import type { PropsWithoutRef } from "react";
import type { Todo } from "~/models/todo/todo";

type Props = {
  todo: Todo;
  disableHover?: boolean;
  showCheckBox?: boolean;
  createdBy?: string;
};

export function Todo({
  todo,
  showCheckBox,
  createdBy,
  disableHover,
}: PropsWithoutRef<Props>) {
  return (
    <div id={`todo-${todo.id}`}>
      <input
        className="hidden"
        type="checkbox"
        defaultChecked={todo.completed}
      />

      <label
        className={`flex items-center rounded ${
          !disableHover && "hover:bg-gray-900 cursor-pointer px-2 h-10"
        }`}
      >
        {showCheckBox && (
          <span className="icon-container flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full mr-4">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}

        <div className="flex flex-col w-100">
          <span className="text-sm todo-title">
            <strong>Title:</strong> {todo.title}
          </span>
          {createdBy && (
            <span className="text-sm">
              <strong>By:</strong> {createdBy}
            </span>
          )}
        </div>
      </label>
    </div>
  );
}
