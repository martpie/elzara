const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

// Directories to scan
const imagesDir = "./public/uploads";
const referencesDir = "./content";

// Function to list all files in a directory recursively
function listFilesInDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFilesInDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Function to check if a filename is referenced in any of the files
function isReferenced(filename, files) {
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes(filename)) {
      return true;
    }
  }
  return false;
}

// Function to prompt for confirmation
function confirmDeletion(filesToDelete) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\nThe following images are unreferenced and will be deleted:");
  filesToDelete.forEach((file) => console.log(`- ${file}`));

  rl.question("\nDo you want to delete these files? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === "yes") {
      filesToDelete.forEach((file) => {
        fs.unlinkSync(file);
        console.log(`Deleted: ${file}`);
      });
    } else {
      console.log("Deletion aborted.");
    }
    rl.close();
  });
}

// Main logic
function findAndDeleteUnreferencedImages() {
  const imageFiles = listFilesInDir(imagesDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(ext);
  });

  const referenceFiles = listFilesInDir(referencesDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".md", ".json"].includes(ext);
  });

  const unreferencedImages = [];
  imageFiles.forEach((imagePath) => {
    const imageName = path.basename(imagePath);
    if (!isReferenced(imageName, referenceFiles)) {
      console.log(`Unreferenced image: ${imageName}`);
      unreferencedImages.push(imagePath);
    }
  });

  if (unreferencedImages.length > 0) {
    confirmDeletion(unreferencedImages);
  } else {
    console.log("No unreferenced images found.");
  }
}

// Execute the script
findAndDeleteUnreferencedImages();
