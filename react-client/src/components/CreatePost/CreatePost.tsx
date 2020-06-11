import React, { useReducer, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { loadPost } from "../../global/request";
import { useLocation, useParams } from "react-router-dom";
import { usePost } from "../../global/hooks";
import {
  EDIT_POST_LABEL,
  NEW_POST_LABEL,
  TITLE_LABEL,
  CONTENT_LABEL,
  SUBMIT_BUTTON_LABEL,
} from "../../global/constants"

interface State {
  title: string;
  content: string;
}
interface Action {
  field: string;
  value: string;
}

const reducer = (state: State, action: Action) => {
  const {field, value} = action;
  return {
    ...state,
    [field]: value
  }
};

const initialState: State = {
  title: "",
  content: "",
};

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

const CreatePost: React.FC = () => {
  const { updatePost, createPost } = usePost();
  const [state, dispatch] = useReducer(reducer, initialState);
  const query: URLSearchParams | null = useQuery();
  let { postId } = useParams();
  const mode: string | null = query.get("mode");

  const handleChange = (e: React.ChangeEvent<any>) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked", state);
    if (mode === "edit") {
      updatePost(postId, state.title, state.content);
    } else {
      createPost(state.title, state.content);
    }
  };

  useEffect(() => {
    if (mode && mode === "edit") {
      loadPost(postId).then((post) => {
        dispatch({ field: "title", value: post.title });
        dispatch({ field: "content", value: post.content });
      });
    }
  }, [mode, postId]);

  const heading = mode === "edit" ? EDIT_POST_LABEL : NEW_POST_LABEL;
  return (
    <section>
      <h1 className="title">{heading}</h1>
      <div className="box">
        <Form>
          <FormGroup>
            <Label for="title">{TITLE_LABEL}</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={state.title}
              onChange={handleChange}
              maxLength={200}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">{CONTENT_LABEL}</Label>
            <Input
              type="textarea"
              name="content"
              id="content"
              placeholder="Content"
              value={state.content}
              onChange={handleChange}
              maxLength={500}
            />
          </FormGroup>
          <div className="field">
            <div className="control">
              <Button
                color="primary"
                outline
                onClick={handleSubmit}
                disabled={!state.title || !state.content}
              >
                {SUBMIT_BUTTON_LABEL}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default CreatePost;