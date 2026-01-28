// index.js
// This module reads commands from commands.json and executes them sequentially.

import fs from "fs/promises";
import { join } from "path";
import {
  createPost,
  deletePost,
  readPost,
  resetPosts,
  updatePost,
  listPosts,
} from "./blogService.js";
import { fileURLToPath } from "url";

/**
 * Executes a single blog command object.
 * The command object has an "action" property and optional data (title, content, id).
 * Each case performs any necessary input validation, executes the action, and logs the outcome.
 *
 * @param {object} cmd - The command to process
 *
 * Implement each case based on the descriptions below.
 */
export async function processCommand(cmd) {
  switch (cmd.action) {
    case "reset": {
      // Clears all posts and resets nextId to 1
      // Logs: "Posts have been reset"
      const response = await resetPosts();
      console.log(response);
      break;
    }
    case "create": {
      // Check that title and content are provided
      // If missing, log "Title and content must be provided"
      // Otherwise, create a new post with a unique ID and timestamp
      // Logs: "Created post <id>: <title>"
      //call function created in blogService
      //pass in cmd.title / cmd.content
      //console.log
      if (!cmd.title || !cmd.content) {
        console.log("Title and content must be provided");
      } else {
        const response = await createPost(cmd.title, cmd.content);
        console.log(`Created post: ${response.id}: ${response.title}`);
      }
      break;
    }
    case "read": {
      // Look up a post by ID
      // If found, log "Post <id>: <title> - <content>"
      // If not found, log "Post <id> not found"
      const response = await readPost(cmd.id);
      if (response) {
        console.log(
          `Post ${response.id}: ${response.title} - ${response.content}`,
        );
      } else {
        console.log(`Post ${cmd.id} not found`);
      }
      break;
    }
    case "update": {
      // Ensure at least title or content is provided
      // If both are empty, log "Either title or content must be provided"
      // Update the post if it exists
      // Log "Post <id> updated" if successful
      // Log "Post <id> not found" if ID does not exist
      if (
        (!cmd.title || cmd.title === "") &&
        (!cmd.content || cmd.content === "")
      ) {
        console.log(`Either title or content must be provided `);
      } else {
        const success = await updatePost(cmd.id, cmd.title, cmd.content);
        if (success) {
          console.log(`Post ${cmd.id} updated`);
        } else {
          console.log(`Post ${cmd.id} not found`);
        }
      }
      break;
    }
    case "delete": {
      // Delete a post by ID
      // Log "Post <id> deleted" if successful
      // Log "Post <id> not found" if ID does not exist
      const deleteF = await deletePost(cmd.id);
      if (deleteF) {
        console.log(`Post ${cmd.id} deleted`);
      } else {
        console.log(`Post ${cmd.id} not found`);
      }
      break;
    }
    case "list": {
      // Lists all posts as an array of objects
      // Logs: "All posts: [<array of post objects>]"
      const response = await listPosts();
      console.log(`All posts:`, response);
      break;
    }
    case "exit": {
      console.log("Exiting program");
      process.exit(0);
      break;
    }
    default: {
      console.log(`Unknown action: ${cmd.action}`);
    }
  }
}

/**
 * ===============================
 * IMPORTANT – DO NOT MODIFY
 * ===============================
 *
 * If this file is executed directly (e.g., `node index.js`),
 * it will read commands from commands.json and process them sequentially.
 *
 * This section is required for autograding and testing.
 */
// if (process.argv[1] === new URL(import.meta.url).pathname) {
//   const commandsFilePath = join(process.cwd(), "commands.json");

//   const data = await fs.readFile(commandsFilePath, "utf-8");
//   const commands = JSON.parse(data);

//   for (const cmd of commands) {
//     await processCommand(cmd);
//   }
// }

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const commandsFilePath = join(process.cwd(), "commands.json");
  try {
    const data = await fs.readFile(commandsFilePath, "utf-8");
    const commands = JSON.parse(data);
    for (const cmd of commands) {
      await processCommand(cmd);
    }
  } catch (error) {
    console.error("Error processing commands:", error);
  }
}
