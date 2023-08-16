import { gql } from "@apollo/client";
import { client } from "~/graphql/client.server";
import type { Todo } from "./todo";
import type { User } from "../user/user";

export const createTodo = async (payload: { title: string }) => {
  const { title } = payload;

  const res = await client.mutate<{ deleteTodo: boolean }>({
    mutation: gql`
      mutation CreateTodo($title: String!) {
        createTodo(input: { title: $title, completed: false }) {
          id
          title
          completed
        }
      }
    `,
    variables: {
      title,
    },
  });

  console.log(res.data);
};

export const fetchTodoById = async (payload: { id: string }) => {
  const { id } = payload;

  const res = await client.query<{ todo: Todo & { user: Pick<User, "name"> } }>(
    {
      query: gql`
        query GetTodo($id: ID!) {
          todo(id: $id) {
            id
            title
            completed
            user {
              name
            }
          }
        }
      `,
      variables: { id },
    }
  );

  return res.data.todo;
};

export const fetchTodos = async () => {
  const res = await client.query<{ todos: { data: Todo[] } }>({
    query: gql`
      query GetTodos {
        todos(options: { paginate: { limit: 5 } }) {
          data {
            id
            title
            completed
          }
        }
      }
    `,
  });

  return res.data.todos.data;
};

export const deleteTodo = async (payload: { id: string }) => {
  const { id } = payload;

  const res = await client.mutate<{ deleteTodo: boolean }>({
    mutation: gql`
      mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
      }
    `,
    variables: {
      id,
    },
  });

  return res.data?.deleteTodo;
};
