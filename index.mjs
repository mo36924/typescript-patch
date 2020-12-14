import fs from "fs-extra";

const checker = `
        var checker = {
            getNodeCount: function () { return ts.sum(host.getSourceFiles(), "nodeCount"); },
`;

const replaceChecker = `
        var checker = {
            createTupleType: createTupleType,
            getLiteralType: getLiteralType,
            getIntersectionType: getIntersectionType,
            createSyntheticExpression: createSyntheticExpression,
            getGlobalType: getGlobalType,
            createSymbolTable: ts.createSymbolTable,
            emptyArray: ts.emptyArray,
            getNodeCount: function () { return ts.sum(host.getSourceFiles(), "nodeCount"); },
`;

const getEffectiveCallArguments1 = `
        function getEffectiveCallArguments(node) {
            if (node.kind === 205) {
                var template = node.template;
`;

const getEffectiveCallArguments2 = `
        function getEffectiveCallArguments(node) {
            if (node.kind === 205 /* TaggedTemplateExpression */) {
                var template = node.template;
`;

const replaceGetEffectiveCallArguments = `
        function getEffectiveCallArguments(node) {
            if (node.kind === 205 /* TaggedTemplateExpression */) {
                if(ts.taggedTemplateExpressionHook){
                    var args = ts.taggedTemplateExpressionHook(node, checker);
                    if(args){
                        return args;
                    }
                }
                var template = node.template;
`;

const files = [
  "node_modules/typescript/lib/tsc.js",
  "node_modules/typescript/lib/tsserver.js",
  "node_modules/typescript/lib/tsserverlibrary.js",
  "node_modules/typescript/lib/typescript.js",
  "node_modules/typescript/lib/typescriptServices.js",
  "node_modules/typescript/lib/typingsInstaller.js",
];

for (const file of files) {
  const code = fs
    .readFileSync(file, "utf-8")
    .replace(checker, () => replaceChecker)
    .replace(getEffectiveCallArguments1, () => replaceGetEffectiveCallArguments)
    .replace(getEffectiveCallArguments2, () => replaceGetEffectiveCallArguments);

  fs.writeFileSync(file, code);
}

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

import "typescript";
