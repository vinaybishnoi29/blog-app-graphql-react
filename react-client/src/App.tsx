import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink
} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import { Container } from "reactstrap";
import Homepage from "./components/Homepage";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import Header from "./components/Header";
import {HEADER_LABEL} from './global/constants';

const cache = new InMemoryCache({});
const endpointUrl = "http://localhost:4000";
const authLink = new ApolloLink((operation,forward)=>{
  
  return forward(operation);
})
export const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({uri:endpointUrl})
  ]),
  cache:cache,
})
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header headerLabel ={HEADER_LABEL}/>
          <section className="section">
            <Container fluid={true}>
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/post/create" component={CreatePost} />
                <Route path="/post/create/:postId" component={CreatePost} />
                <Route path="/post/:postId" component={PostDetails} />              
              </Switch>
            </Container>
          </section>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;