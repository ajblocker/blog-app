// index.js
// This module reads commands from commands.json and executes them sequentially.

import fs from "fs/promises";
import { join } from "path";
import { resetPosts } from "./blogService.js";

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
      break;
    }
    case "read": {
      // Look up a post by ID
      // If found, log "Post <id>: <title> - <content>"
      // If not found, log "Post <id> not found"
      break;
    }
    case "update": {
      // Ensure at least title or content is provided
      // If both are empty, log "Either title or content must be provided"
      // Update the post if it exists
      // Log "Post <id> updated" if successful
      // Log "Post <id> not found" if ID does not exist
      break;
    }
    case "delete": {
      // Delete a post by ID
      // Log "Post <id> deleted" if successful
      // Log "Post <id> not found" if ID does not exist
      break;
    }
    case "list": {
      // Lists all posts as an array of objects
      // Logs: "All posts: [<array of post objects>]"
      break;
    }
    case "exit": {
      console.log("Exiting program");
      process.exit(0);
    }
    default: {
      console.log(`Unknown action: ${cmd.action}`);
      break;
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
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const commandsFilePath = join(process.cwd(), "commands.json");

  const data = await fs.readFile(commandsFilePath, "utf-8");
  const commands = JSON.parse(data);

  for (const cmd of commands) {
    await processCommand(cmd);
  }
}

processCommand({ action: "reset" });
