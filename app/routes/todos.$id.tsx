import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useParams,
  useRouteError,
  useNavigation,
  Form,
} from "@remix-run/react";
import { Loader } from "~/components/partials/Loader";
import { Todo } from "~/components/todo/Todo";
import { TodoHead } from "~/components/todo/TodoHead";
import { deleteTodo, fetchTodoById } from "~/models/todo/todo.server";

type LoaderType = Awaited<ReturnType<typeof loader>>;

export const loader = async ({ params }: LoaderArgs) => {
  try {
    const { id } = params;

    if (!id) throw new Error();

    const todo = await fetchTodoById({ id });

    if (!todo.id) throw new Error();

    return todo;
  } catch (err) {
    throw new Response("Couldn't found what you were looking for :(", {
      status: 404,
    });
  }
};

export const action = async ({ request, params }: ActionArgs) => {
  const { id } = params;
  const formData = await request.formData();

  const intent = formData.get("intent");

  if (intent === "delete" && id) {
    await deleteTodo({ id });

    return redirect("/todos");
  }

  return null;
};

export default function TodoRoute() {
  const { id } = useParams();
  const todo = useLoaderData<LoaderType>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const handleBackClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div>
      <TodoHead title={`Todo: ${id}`} />

      <Form method="post" className="px-1">
        <div className="mb-4">
          <Todo todo={todo} createdBy={todo.user.name} disableHover />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={(e) => handleBackClick(e)}
            className="transition-all duration-300 text-sm bg-transparent hover:bg-gray-200 text-blue-dark font-semibold hover:text-gray-800 py-1 px-2 border border-blue hover:border-transparent rounded"
          >
            Back
          </button>

          <button
            disabled={isSubmitting}
            type="submit"
            name="intent"
            value="delete"
            className="transition-all duration-300 min-w-[61px] text-sm bg-red-500 hover:bg-red-600 text-blue-dark font-semibold py-1 px-2 border border-red-500 rounded flex justify-center items-center disabled:bg-gray-500 disabled:border-gray-600"
          >
            {isSubmitting ? <Loader /> : "Delete"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <div className="error-container">{error.data}</div>;
  }
}
