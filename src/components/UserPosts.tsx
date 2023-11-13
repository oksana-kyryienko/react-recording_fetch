// #region imports
import React, { useCallback, useEffect, useState } from "react";
import { Post } from "../types/Post";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";
import * as postSrvice from "../services/posts";
import { User } from "../types";
// #endregion

type Props = {
  userId: number;
  users: User[];
  error: string;
  setErrorMessage: (errorMessage: string) => void;
};

export const UserPosts: React.FC<Props> = ({
  userId,
  users,
  error,
  setErrorMessage,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    console.log("PostList rendered");
    console.log("Fetching posts for user ID:", userId);
    postSrvice
      .getUserPosts(userId)
      .then(setPosts)
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const onSelectPost = useCallback((post: Post) => {
    setSelectedPost(post);
    console.log("Selected Post:", post);
  }, []);

  // #region add, delete, update
  const addPost = useCallback(
    ({ title, body, userId }: Post) => {
      setErrorMessage("");
      return postSrvice
        .createPost({ title, body, userId })
        .then((newPost) => {
          setPosts((currentPosts) => [...currentPosts, newPost]);
        })
        .catch((error) => {
          setErrorMessage(`Can't create a post`);
          throw error;
        });
    },
    [setErrorMessage]
  );

  const deletePost = useCallback((postId: number) => {
    setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId)
      );
    return postSrvice.deletePost(postId)
    .catch((error) => {
      setPosts(posts)
      setErrorMessage(`Can't delete a post`);
      throw error;
    });
  }, [posts, setErrorMessage]);

  const updatePost = useCallback(
    (updatedPost: Post) => {
      setErrorMessage("");
      return postSrvice
        .updatePost(updatedPost)
        .then((post) => {
          setPosts((currentPosts) => {
            const newPosts = [...currentPosts];
            const index = newPosts.findIndex(
              (post) => post.id === updatedPost.id
            );

            newPosts.splice(index, 1, post);

            return newPosts;
          });
        })
        .catch((error) => {
          setErrorMessage(`Can't update a post`);
          throw error;
        });
    },
    [setErrorMessage]
  );
  // #endregion

  return (
    <div className="box">
      <h2 className="title is-4">User {userId} Posts</h2>

      <PostList posts={posts} onSelect={onSelectPost} onDelete={deletePost} />
      <PostForm
        users={users}
        key={selectedPost?.id}
        post={selectedPost}
        onSubmit={selectedPost ? updatePost : addPost}
        onReset={() => setSelectedPost(undefined)}
      />
    </div>
  );
};
