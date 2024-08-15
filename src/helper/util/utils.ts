const fs = require("fs")
const jsonData = fs.readFileSync('src/helper/testData/testData.json');
const data = JSON.parse(jsonData);
const timestamp = Date.now().toString().slice(-8);
export default class Utils implements IUtils {

  static async searchResultName() {
    data.savedSearchResultName = "AutomationSave_" + timestamp;

    const updatedJsonData = JSON.stringify(data, null, 2)
    await fs.writeFileSync('src/helper/testData/testData.json', updatedJsonData);
    return data.savedSearchResultName;
  }

  static async nameTheProject(name) {

    data.projectName = `Automation${name}_${timestamp}`;

    const updatedJsonData = JSON.stringify(data, null, 2)
    await fs.writeFileSync('src/helper/testData/testData.json', updatedJsonData);
    return data.projectName;
  }
}

export interface IUtils { }