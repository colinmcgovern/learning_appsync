import Head from "next/head";
import Image from "next/image";

import { API } from "aws-amplify"
import { listTodos } from "../graphql/queries"

import React, { useEffect } from "react"
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";

export default function List() {

  useEffect(() => {
    fetchTodos();
  }, []);
  
  async function fetchTodos(){
    const data = await API.graphql({ query: listTodos });
    const notesFromAPI = data.listTodos
    console.log(notesFromAPI)
  }

  async function createTodo(){
    event.preventDefault();
    const form = new FormData(event.target)
    const data = {
      id: form.get("id"),
      name: form.get("name"),
      body: form.get("body"),
      completed: false
    }
    await API.graphql({
      query: createTodo,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  return(
    <>
      <View as="form" margin="3rem 0" onSubmit={createTodo}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="id"
            placeholder="id"
            label="id"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="name"
            placeholder="name"
            label="name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="body"
            placeholder="body"
            label="body"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create
          </Button>
        </Flex>
      </View>
    </>);
}
