import { genModule } from "@proxtx/combine/combine.js";
import { genCombine } from "@proxtx/combine-rest/request.js";
import config from "@proxtx/config";
import fs from "fs/promises";

export class Trigger {
  constructor(triggerConfig, folder) {
    this.folder = folder;
    this.config = triggerConfig;

    (async () => {
      this.api = await genCombine(
        config.apps + "/",
        "public/api.js",
        genModule
      );

      this.html = await fs.readFile(this.folder + "index.html", "utf8");
      this.handler = await fs.readFile(this.folder + "handler.js", "utf8");
    })();
  }

  getSelectionGui = async () => {
    return {
      html: this.html,
      handler: this.handler,
      data: { url: config.guiUrl },
    };
  };

  triggers = async (data) => {
    return await this.api.execute(
      config.pwd,
      data.appName,
      data.method,
      data.arguments
    );
  };
}
