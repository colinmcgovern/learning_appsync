import Head from "next/head";
import Image from "next/image";

import { API, graphqlOperation } from "aws-amplify"
import { listTodos } from "../graphql/queries"

import React, { useState, useEffect } from "react"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

export default function List() {

  const [formData, setFormData] = useState({id: '', name: '', body: ''});

  // useEffect(() => {
  //   fetchTodos();
  // }, []);
  
  // async function fetchTodos(){
  //   const data = await API.graphql({ query: listTodos });
  //   const notesFromAPI = data.listTodos
  //   console.log(notesFromAPI)
  // }

  async function createTodo(event){
    event.preventDefault();
    const form = new FormData(event.target)
    const data = {
      id: formData["id"],
      name: formData["name"],
      body: formData["body"],
      completed: false
    }
    await API.graphql<GraphQLQuery<CreateTodoMutation>>(
      graphqlOperation(
        createTodo,
        {input: data})
     );
    {/*fetchNotes();*/}
    event.target.reset();
  }

  const onInputChange = (a, b) => {
    let key = "";
    let value = "";

    if (typeof b !== "undefined") {
      key = a;
      value = b;
    } else {
      key = event.target["id"];
      value = event.target["value"];
    }

    let new_formData = formData;
    new_formData[key] = value;
    setFormData(new_formData);
  };

  return(
    <>
      <form onSubmit={createTodo}>
          <Stack direction="column" sx={{ width: "50%", margin: "auto" }}>
          <TextField
            required
            id="id"
            label="id"
            margin="normal"
            onChange={(event) =>
              onInputChange(event.target["id"], event.target["value"])
            }
          />
          <TextField
            required
            id="name"
            label="name"
            margin="normal"
            onChange={(event) =>
              onInputChange(event.target["name"], event.target["value"])
            }
          />
          <TextField
            required
            id="body"
            label="body"
            margin="normal"
            onChange={(event) =>
              onInputChange(event.target["body"], event.target["value"])
            }
          />
          <Button type="submit" variation="contained">
            Create
          </Button>
        </Stack>
      </form>
    </>);
}
