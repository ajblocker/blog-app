// blogService.js
// This module handles blog post CRUD operations

import fs from "fs/promises";
import { join } from "path";

// Filepath for posts.json. Use this for reading/writing posts.
const postsFile = join(process.cwd(), "posts.json");

/**
 * Reset posts.json: clear all posts and set nextId back to 1.
 */
export async function resetPosts() {
  const data = {
    nextId: 1,
    posts: [],
  };
  //brings in string from JSON file
  await fs.writeFile(postsFile, JSON.stringify(data));
  return `Post reset`;
}

/**
 * Add a new post with a unique ID and timestamp.
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {object} The newly created post object
 */
export async function createPost(title, content) {
  //read the file (JSON.parse)
  //know the length of the file (nextId + 1) and date timestamp
  //create the new post with title, id, and content with an object
  //push the file
  //write the file (JSON.stringify)
  //return the new post object
  //?? where writing of the file should happen? in the function or index??
  try {
    //read the file
    const read = await fs.readFile(postsFile, "utf8");
    //parse into an object
    const data = JSON.parse(read);
    //nextId in file = 1
    const currentNextId = data.nextId;
    //empty array []
    let posts = data.posts;
    console.log(data, currentNextId, posts);
    //creates a new post object
    const newPost = {
      //new id
      id: currentNextId,
      title: title,
      content: content,
      createdAt: new Date(),
    };
    //add/push new content to post
    posts.push(newPost);
    //determine the nextId and increase by 1
    const nextId = posts.length + 1;
    //build new file base with new post
    const newData = {
      nextId: nextId,
      posts: posts,
    };
    //write to file and bring in string from JSON
    await fs.writeFile(postsFile, JSON.stringify(newData));
    return newPost;
  } catch (error) {
    console.log(`An error occurred logging ${error}`);
  }
}

/**
 * Find and return a post by its ID.
 * @param {number} id - Post ID
 * @returns {object|undefined} The post if found, otherwise undefined
 */
export async function readPost(id) {
  try {
    //read the file
    const read = await fs.readFile(postsFile, "utf8");
    //parse into an object
    const data = JSON.parse(read);
    //find the post with matching id
    const findPost = data.posts.find(function (post) {
      //compare postId
      return post.id === id;
    });
    return findPost;
  } catch (error) {
    console.log(`An error occurred logging ${error}`);
    return undefined;
  }
}

/**
 * Update a post's title and/or content.
 * @param {number} id - Post ID
 * @param {string} newTitle - New title (optional)
 * @param {string} newContent - New content (optional)
 * @returns {boolean} True if updated successfully, false if post not found
 */
export async function updatePost(id, newTitle, newContent) {
  try {
    //read the file
    const read = await fs.readFile(postsFile, "utf8");
    //parse into an object
    const data = JSON.parse(read);

    //find posts with matching id
    const post = data.posts.find(function (post) {
      return post.id === id;
    });
    //check if there is a post or not
    if (!post) {
      return false;
    }
    //update the title
    if (newTitle !== undefined) {
      return (post.title = newTitle);
    }
    //update the content
    if (newContent !== undefined) {
      return (post.content = newContent);
    }
    //write to file and bring in string from JSON file
    await fs.writeFile(postsFile, JSON.stringify(data), "utf8");
    return true;
  } catch (error) {
    console.log(`An error occurred while logging ${error}`);
    return false;
  }
}

/**
 * Delete a post by its ID.
 * @param {number} id - Post ID
 * @returns {boolean} True if deleted successfully, false if post not found
 */
export async function deletePost(id) {
  try {
    //read the file
    const read = await fs.readFile(postsFile, "utf8");
    //parse into an object
    const data = JSON.parse(read);
    //filter everything except id
    const post = data.posts.filter(function (post) {
      return post.id !== id;
    });
    if (post) {
      return true;
    } else {
      false;
    }
  } catch (error) {
    console.log(`An error occurred logging ${error}`);
  }
}

/**
 * Return all posts as an array of objects.
 * @returns {Array<object>} Array of all post objects
 */
export async function listPosts() {
  try {
    //read the file
    const read = await fs.readFile(postsFile, "utf8");
    //parse into an object
    const data = JSON.parse(read);
    //return the posts array
    return data.posts;
  } catch (error) {
    console.log(`An error occurred logging ${error}`);
  }
}
