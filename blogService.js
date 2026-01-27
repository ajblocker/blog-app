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
    const posts = JSON.parse(read);
    //determine the nextId
    const nextId = posts.length + 1;
    //creates a new post object
    const newPost = {
      id: nextId,
      title: title,
      content: content,
      createdAt: new Date(),
      ...postsFile,
    };
    //add/push new content to post
    posts.push(newPost);
    //write to file
    await fs.writeFile(postsFile, JSON.stringify(newPost));
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
export async function readPost(id) {}

/**
 * Update a post's title and/or content.
 * @param {number} id - Post ID
 * @param {string} newTitle - New title (optional)
 * @param {string} newContent - New content (optional)
 * @returns {boolean} True if updated successfully, false if post not found
 */
export async function updatePost(id, newTitle, newContent) {}

/**
 * Delete a post by its ID.
 * @param {number} id - Post ID
 * @returns {boolean} True if deleted successfully, false if post not found
 */
export async function deletePost(id) {}

/**
 * Return all posts as an array of objects.
 * @returns {Array<object>} Array of all post objects
 */
export async function listPosts() {
  //read file
  //JSONparse the file
  //return the data
}
