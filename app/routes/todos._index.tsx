import { Link, useLoaderData } from "@remix-run/react";
import { Todo } from "~/components/todo/Todo";
import { TodoHead } from "~/components/todo/TodoHead";
import { fetchTodos } from "~/models/todo/todo.server";

type LoaderType = Awaited<ReturnType<typeof loader>>;

export const loader = async () => {
  const todos = await fetchTodos();
  return todos;
};

export default function TodosIndexRoute() {
  const todos = useLoaderData<LoaderType>();

  return (
    <>
      <TodoHead title="All Todos" />

      {todos.map((t) => (
        <Link to={t.id} key={t.id}>
          <Todo todo={t} showCheckBox />
        </Link>
      ))}
    </>
  );
}
