'use strict';

var iconGenerator = require('iconGenerator');
var defaultSchema = require('defaultSchema').schema;
var files = require('supportedExtensions').extensions;
var folders = require('supportedFolders').extensions;
var fs = require('fs');

describe('generating icons', function () {
  it('removes first dot from text', function () {
    var text = '.test';
    var noDottedText = 'test';
    expect(iconGenerator.removeFirstDot(text)).toEqual(noDottedText);
  });

  it('resolves path from one directory to another', function () {
    var fromDirPath = './test/';
    var toDirName = 'icons';
    var pathTo = './../icons/';
    expect(iconGenerator.getPathToDirName(toDirName, fromDirPath)).toEqual(pathTo);
  });

  it('file extension should not have a leading dot', function () {
    files.supported
      .filter(function (file) { return !file.filename; })
      .forEach(function (file) {
        file.extensions.forEach(function (extension) {
          expect(extension.startsWith('.')).toBeFalsy();
        });
      });
  });

  it('ensures each supported file extension has an associated icon file', function () {
    var suffix = '@2x';
    var iconDirPath = iconGenerator.getPathToDirName('icons', '.');

    files.supported.forEach(function (file) {
      var iconFileExtension = file.svg ? '.svg' : '.png';
      var iconFilePath = iconDirPath + 'file_type_' +
        file.icon + suffix + iconFileExtension;

      expect(fs.existsSync(iconFilePath)).toBeTruthy();
    });
  });

  it('ensures each supported file extension that has a light theme version ' +
    'has an associated icon file',
    function () {
      var suffix = '@2x';
      var iconDirPath = iconGenerator.getPathToDirName('icons', '.');

      files.supported
        .filter(function (file) { return file.light; })
        .forEach(function (file) {
          var iconFileExtension = file.svg ? '.svg' : '.png';
          var iconFilePath = iconDirPath + 'file_type_light_' +
            file.icon + suffix + iconFileExtension;

          expect(fs.existsSync(iconFilePath)).toBeTruthy();
        });
    });

  it('ensures each supported folder has an associated icon file', function () {
    var suffix = '@2x';
    var iconDirPath = iconGenerator.getPathToDirName('icons', '.');

    folders.supported.forEach(function (folder) {
      var iconFileExtension = folder.svg ? '.svg' : '.png';
      var iconFilePath = iconDirPath + 'folder_type_' +
        folder.icon + suffix + iconFileExtension;

      expect(fs.existsSync(iconFilePath)).toBeTruthy();
    });
  });

  it('ensures each supported folder that has a light theme version ' +
    'has an associated icon file',
    function () {
      var suffix = '@2x';
      var iconDirPath = iconGenerator.getPathToDirName('icons', '.');

      folders.supported
        .filter(function (folder) { return folder.light; })
        .forEach(function (folder) {
          var iconFileExtension = folder.svg ? '.svg' : '.png';
          var iconFilePath = iconDirPath + 'folder_type_light_' +
            folder.icon + suffix + iconFileExtension;

          expect(fs.existsSync(iconFilePath)).toBeTruthy();
        });
    });

  it('ensures each supported folder has an associated opened icon file', function () {
    var suffix = '@2x';
    var iconDirPath = iconGenerator.getPathToDirName('icons', '.');

    folders.supported.forEach(function (folder) {
      var iconFileExtension = folder.svg ? '.svg' : '.png';
      var iconOpenFilePath = iconDirPath + 'folder_type_' +
        folder.icon + '_opened' + suffix + iconFileExtension;

      expect(fs.existsSync(iconOpenFilePath)).toBeTruthy();
    });
  });

  it('ensures each supported folder that has a light theme version ' +
    'has an associated opened icon file',
    function () {
      var suffix = '@2x';
      var iconDirPath = iconGenerator.getPathToDirName('icons', '.');

      folders.supported
        .filter(function (folder) { return folder.light; })
        .forEach(function (folder) {
          var iconFileExtension = folder.svg ? '.svg' : '.png';
          var iconOpenFilePath = iconDirPath + 'folder_type_light_' +
            folder.icon + '_opened' + suffix + iconFileExtension;

          expect(fs.existsSync(iconOpenFilePath)).toBeTruthy();
        });
    });

  it('ensures each supported file extension has a definition', function () {
    var fileDefinitions = iconGenerator.buildJsonStructure().files.defs;

    files.supported.forEach(function (file) {
      var definition = '_f_' + file.icon;
      expect(fileDefinitions[definition]).toBeDefined();
    });
  });

  it('ensures each supported file extension that has a light theme version has a definition',
    function () {
      var fileDefinitions = iconGenerator.buildJsonStructure().files.defs;

      files.supported
        .filter(function (file) { return file.light; })
        .forEach(function (file) {
          var definition = '_f_light_' + file.icon;
          expect(fileDefinitions[definition]).toBeDefined();
        });
    });

  it('ensures each supported file extension has an icon path', function () {
    var fileDefinitions = iconGenerator.buildJsonStructure().files.defs;

    files.supported.forEach(function (file) {
      var definition = '_f_' + file.icon;
      expect(fileDefinitions[definition].iconPath).toBeDefined();
    });
  });

  it('ensures each supported file extension that has a light theme version has an icon path',
    function () {
      var fileDefinitions = iconGenerator.buildJsonStructure().files.defs;

      files.supported
        .filter(function (file) { return file.light; })
        .forEach(function (file) {
          var definition = '_f_light_' + file.icon;
          expect(fileDefinitions[definition].iconPath).toBeDefined();
        });
    });

  it('ensures each supported folder has a definition', function () {
    var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

    folders.supported.forEach(function (folder) {
      var definition = '_fd_' + folder.icon;
      expect(folderDefinitions[definition]).toBeDefined();
    });
  });

  it('ensures each supported folder that has a light theme version has a definition', function () {
    var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

    folders.supported
      .filter(function (folder) { return folder.light; })
      .forEach(function (folder) {
        var definition = '_fd_light_' + folder.icon;
        expect(folderDefinitions[definition]).toBeDefined();
      });
  });

  it('ensures each supported folder has an open definition', function () {
    var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

    folders.supported.forEach(function (folder) {
      var definition = '_fd_' + folder.icon + '_open';
      expect(folderDefinitions[definition]).toBeDefined();
    });
  });

  it('ensures each supported folder that has a light theme version has a open definition',
    function () {
      var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

      folders.supported
        .filter(function (folder) { return folder.light; })
        .forEach(function (folder) {
          var definition = '_fd_light_' + folder.icon + '_open';
          expect(folderDefinitions[definition]).toBeDefined();
        });
    });

  it('ensures each supported folder has an icon path', function () {
    var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

    folders.supported.forEach(function (folder) {
      var definition = '_fd_' + folder.icon;
      expect(folderDefinitions[definition].iconPath).toBeDefined();
    });
  });

  it('ensures each supported folder that has a light theme version has an icon path',
    function () {
      var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

      folders.supported
        .filter(function (folder) { return folder.light; })
        .forEach(function (folder) {
          var definition = '_fd_light_' + folder.icon;
          expect(folderDefinitions[definition].iconPath).toBeDefined();
        });
    });

  it('ensures each supported folder has an open icon path', function () {
    var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

    folders.supported.forEach(function (folder) {
      var definition = '_fd_' + folder.icon + '_open';
      expect(folderDefinitions[definition].iconPath).toBeDefined();
    });
  });

  it('ensures each supported folder that has a light theme version has an open icon path',
    function () {
      var folderDefinitions = iconGenerator.buildJsonStructure().folders.defs;

      folders.supported
        .filter(function (folder) { return folder.light; })
        .forEach(function (folder) {
          var definition = '_fd_light_' + folder.icon + '_open';
          expect(folderDefinitions[definition].iconPath).toBeDefined();
        });
    });

  it('ensures each supported folder has a folder name referencing its definiton',
    function () {
      var folderNames = iconGenerator.buildJsonStructure().folders.names.folderNames;

      folders.supported.forEach(function (folder) {
        var definition = '_fd_' + folder.icon;
        folder.extensions.forEach(function (extension) {
          var extensionName = (folder.dot ? '.' : '') + extension;
          expect(folderNames[extensionName]).toEqual(definition);
        });
      });
    });

  it('ensures each supported folder that has a light theme version ' +
    'has a folder name referencing its definiton',
    function () {
      var folderNames = iconGenerator.buildJsonStructure().folders.light.folderNames;

      folders.supported
        .filter(function (folder) { return folder.light; })
        .forEach(function (folder) {
          var definition = '_fd_light_' + folder.icon;
          folder.extensions.forEach(function (extension) {
            var extensionName = (folder.dot ? '.' : '') + extension;
            expect(folderNames[extensionName]).toEqual(definition);
          });
        });
    });

  it('ensures each supported folder has a folder name expanded referencing its definiton',
    function () {
      var folderNamesExpanded = iconGenerator.buildJsonStructure()
        .folders.names.folderNamesExpanded;

      folders.supported.forEach(function (folder) {
        var definition = '_fd_' + folder.icon + '_open';
        folder.extensions.forEach(function (extension) {
          var extensionName = (folder.dot ? '.' : '') + extension;
          expect(folderNamesExpanded[extensionName]).toEqual(definition);
        });
      });
    });

  it('ensures each supported folder that has a light theme version ' +
    'has a folder name expanded referencing its definiton',
    function () {
      var folderNamesExpanded = iconGenerator.buildJsonStructure()
        .folders.light.folderNamesExpanded;

      folders.supported
        .filter(function (folder) { return folder.light; })
        .forEach(function (folder) {
          var definition = '_fd_light_' + folder.icon + '_open';
          folder.extensions.forEach(function (extension) {
            var extensionName = (folder.dot ? '.' : '') + extension;
            expect(folderNamesExpanded[extensionName]).toEqual(definition);
          });
        });
    });

  it('ensures each supported file extension that is not a filename ' +
    'has a file extension referencing its definiton',
    function () {
      var fileExtensions = iconGenerator.buildJsonStructure().files.names.fileExtensions;

      files.supported
        .filter(function (file) { return !file.filename; })
        .forEach(function (file) {
          var definition = '_f_' + file.icon;
          file.extensions.forEach(function (extension) {
            var extensionName = iconGenerator.removeFirstDot(extension);
            expect(fileExtensions[extensionName]).toEqual(definition);
          });
        });
    });

  it('ensures each supported file extension that is not a filename ' +
    'and has a light theme version has a file extension referencing its definiton',
    function () {
      var fileExtensions = iconGenerator.buildJsonStructure().files.light.fileExtensions;

      files.supported
        .filter(function (file) { return !file.filename && file.light; })
        .forEach(function (file) {
          var definition = '_f_light_' + file.icon;
          file.extensions.forEach(function (extension) {
            var extensionName = iconGenerator.removeFirstDot(extension);
            expect(fileExtensions[extensionName]).toEqual(definition);
          });
        });
    });

  it('ensures each supported file extension that is a filename ' +
    'has a file name referencing its definiton',
    function () {
      var fileNames = iconGenerator.buildJsonStructure().files.names.fileNames;

      files.supported
        .filter(function (file) { return file.filename && !file.languages; })
        .forEach(function (file) {
          var definition = '_f_' + file.icon;
          file.extensions.forEach(function (extension) {
            expect(fileNames[extension]).toEqual(definition);
          });
        });
    });

  it('ensures each supported file extension that is a filename ' +
    'and has a light theme version has a file name referencing its definiton',
    function () {
      var fileNames = iconGenerator.buildJsonStructure().files.light.fileNames;

      files.supported
        .filter(function (file) { return file.filename && file.light && !file.languages; })
        .forEach(function (file) {
          var definition = '_f_light_' + file.icon;
          file.extensions.forEach(function (extension) {
            expect(fileNames[extension]).toEqual(definition);
          });
        });
    });

  it('ensures each supported file extension that is supported by language ids ' +
    'has a language id referencing its definiton',
    function () {
      var languageIds = iconGenerator.buildJsonStructure().files.languageIds;

      files.supported
        .filter(function (file) { return file.languages; })
        .forEach(function (file) {
          var definition = '_f_' + file.icon;
          var assertLanguage = function (language) {
            expect(languageIds[language]).toEqual(definition);
          };

          file.languages.forEach(function (langIds) {
            if (Array.isArray(langIds.ids)) {
              langIds.ids.forEach(function (id) { assertLanguage(id); });
            } else {
              assertLanguage(langIds.ids);
            }
          });
        });
    });

  /*
    This can be unskipped once 'toMatchObject' method has been released by facebook.
    See: https://github.com/facebook/jest/issues/2195
  */
  it.skip('ensures icons schema is vscode default schema for icons', function () {
    expect(iconGenerator.getDefaultSchema()).toMatchObject(defaultSchema);
  });
});