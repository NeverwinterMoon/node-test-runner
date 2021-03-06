module.exports = function () {
  var binstall = require("binstall");
  var path = require("path");
  var fs = require("fs");
  var packageInfo = require(path.join(__dirname, "package.json"));

  // Use major.minor.patch from version string - e.g. "1.2.3" from "1.2.3-alpha"
  var binVersion = packageInfo.version.match(/^(\d+\.\d+\.\d+).*$/)[1];


  // 'arm', 'ia32', or 'x64'.
  var arch = process.arch;

  // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  var operatingSystem = process.platform;

  var filename = operatingSystem + "-" + arch + ".tar.gz";
  var url = "https://dl.bintray.com/elmlang/elm-test/"
    + binVersion + "/" + filename;

  var binariesDir = path.join(__dirname, "bin");
  var packageInfo = require(path.join(__dirname, "package.json"));
  var binaryExtension = process.platform === "win32" ? ".exe" : "";
  var executablePaths = [path.join(binariesDir, "elm-interface-to-json" + binaryExtension)];
  var errorMessage = "Unfortunately, there are no elm-test " + binVersion + " binaries available on your operating system and architecture.\n\nIf you would like to build Elm from source, there are instructions at https://github.com/elm-lang/elm-platform#build-from-source\n";

  return binstall(url, {path: binariesDir},
    {verbose: true, verify: executablePaths, errorMessage: errorMessage}
  );
};
