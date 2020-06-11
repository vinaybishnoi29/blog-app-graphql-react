import React from "react";
import './PostItem.css';
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap";
import { Post } from "../../../../global/atoms/Post";
import {
    VIEW_BUTTON_LABEL,
    EDIT_BUTTON_LABEL,
    DELETE_BUTTON_LABEL
} from '../../../../global/constants';
// import {client} from '../../../../App';

interface PostItemProps {
    key:string,
    post:Post,
    editPost: (id:string) => void,
    deletePost: (id:string) => void,
}
/**
 * Receives posts array, deletePost handler and edit post handler.
 * Displays title and content for single post
 * Contains buttons to view, edit and delete post
 */
const PostItem:React.FC<PostItemProps> = ({post,deletePost,editPost}: PostItemProps) => {
  const {id, title, content } = post;
  const history = useHistory()
  const postContent = content.length > 250 ? `${content.substring(0,250)}...` : content;

/**
 * @param id {string} id of the post to view
 * Navigates to posts/:id to display post details
 */
  const viewPostDetails = (id:string) => {
    // client.writeData({ data: { id: id } })
    history.push(`/post/${id}`)
  }

  return (
    <div className='PostItem'>
        <div className='PostItem_Card'>
            <h2 className='PostItem_Card_Heading' title={title}>
                {title}
            </h2>
            <p className='PostItem_Card_Content'>
                {postContent}
            </p>
            <div className='PostItem_Card_Button_Container'>
                <Button
                  outline
                  color="primary"
                  className='PostItem_Card_Button_view'
                  onClick={()=>viewPostDetails(id)}
                > 
                  {VIEW_BUTTON_LABEL}
                </Button>
                <Button
                  outline
                  color="primary"
                  className='PostItem_Card_Button_edit'
                  onClick={()=>editPost(id)}
                > 
                  {EDIT_BUTTON_LABEL}
                </Button>
                <Button 
                  outline
                  color="primary"
                  className='PostItem_Card_Button_delete' 
                  onClick={()=>deletePost(id)}
                >
                  {DELETE_BUTTON_LABEL}
                </Button>
            </div>
        </div>
    </div>
  );
};

export default PostItem;