import { redirect, type ActionArgs, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Loader } from "~/components/partials/Loader";
import { TodoHead } from "~/components/todo/TodoHead";
import { createTodo } from "~/models/todo/todo.server";

type ActionType = Awaited<ReturnType<any>>;

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const intent = formData.get("intent");

  console.log("title", title);

  if (intent === "post") {
    if (!title?.length) {
      return json({ msg: "Title Missing!" }, { status: 400 });
    }

    await createTodo({ title: title.toString() });
    return redirect("/todos");
  }

  return null;
};

export default function TodosNewRoute() {
  const actionData = useActionData<ActionType>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <TodoHead title="Add Todo" hideAddBtn />

      <Form method="post">
        <div className="border rounded-lg border-gray-400 focus-within:border-gray-300">
          <input
            className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
            type="text"
            name="title"
            placeholder="add a new task"
          />
        </div>

        {actionData?.msg && (
          <p className="mt-1 text-xs text-red-500" id="name-error" role="alert">
            {actionData?.msg}
          </p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          name="intent"
          value="post"
          className="mt-4 transition-all duration-300 min-w-[61px] min-h-[30px] max-h-[30px] text-sm bg-[#6366F1] hover:bg-[#484aab] text-blue-dark font-semibold py-1 px-2 border border-transparent rounded flex justify-center items-center disabled:bg-gray-500 disabled:border-gray-600"
        >
          {isSubmitting ? <Loader /> : "Add"}
        </button>
      </Form>
    </>
  );
}
