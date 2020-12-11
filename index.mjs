import fs from "fs-extra";

fs.removeSync("CopyrightNotice.txt");
fs.removeSync("LICENSE.txt");
fs.removeSync("bin");
fs.removeSync("lib");
fs.removeSync("loc");
fs.copySync("node_modules/typescript/CopyrightNotice.txt", "CopyrightNotice.txt");
fs.copySync("node_modules/typescript/LICENSE.txt", "LICENSE.txt");
fs.copySync("node_modules/typescript/bin", "bin");
fs.copySync("node_modules/typescript/lib", "lib");
fs.copySync("node_modules/typescript/loc", "loc");
