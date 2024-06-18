const fs = require("fs");

function loadJsonFile(resource) {
  try {
    const filePath = resource;
    const fileContent = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return null;
  }
}

module.exports = { loadJsonFile };
