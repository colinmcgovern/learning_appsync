import Head from "next/head";
import Image from "next/image";

import { API, graphqlOperation } from "aws-amplify"
import { listTodos } from "../graphql/queries"

import React, { useState, useEffect } from "react"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

const query = `
  query {
    listTodos {
      items {
        id
        body
        completed
        createdAt
      }
    }
  }
`

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
    // const data = {
    //   id: formData["id"],
    //   name: formData["name"],
    //   body: formData["body"],
    //   completed: false
    // }
    const data = {
      id: "id",
      name: "name",
      body: "body",
      completed: false
    }

    // await API.graphql(
    //   graphqlOperation(
    //     createTodo,
    //     {input: data}
    //     )
    //  );

    // await API.graphql({
    //   query: createTodo,
    //   variables: {input: data}
    // });

    // try{
    //   await API.graphql({
    //     query: getTodo,
    //     variables: {input: {
    //       id: "2"
    //     }}
    //   })
    // } catch(error) {
    //   console.log(error)
    // }

    // try{
    //   await API.graphql({
    //     query: createTodo,
    //     variables: {input: {
    //       id: "id",
    //       name: "name",
    //       body: "body",
    //       completed: false
    //     }}
    //   })
    // } catch(error) {
    //   console.log(error)
    // }

    // const test = await API.graphql(graphqlOperation(query))
    // console.log(test)

    const test2 = await API.graphql(graphqlOperation(listTodos))
    console.log('test2')
    console.log(test2)

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
