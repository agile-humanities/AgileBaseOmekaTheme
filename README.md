**Readme**

About

The Agile Base Omeka S Theme was developed by Agile Humanities Agency in conjunction with Michigan State University’s Creativity in the Time of COVID-19 project. While it can be used as a clean, standalone theme, it is intended as front-end scaffolding for demanding design implementation.

The theme scaffold is SASS based, and a lot of customization can be done by modifying the main configuration file. The theme’s SASS components are built on the Stop14 Theme System Library, which must be installed via NPM (see instructions below). 

The theme system can be used in four ways:

- Out of the box, for a spare theme;
- By modifying colours, typefaces, and a host of other settings in the main configuration file to customize the theme;
- By modifying the existing SASS components as necessary; or
- By adding your own CSS file to override the theme’s core settings.

Agile Humanities is also available for custom design and installation. Contact us through our website: <https://agilehumanities.ca> .

**Requirements**

- All requirements for Omeka S v4
- The latest version of Node.js and the package manager NPM installed
- Access to a command line interface

**Installation**

- Install Omeka S v4 as per instructions
- Download, install, and activate the following modules as per their instructions:
  - AgileThemeTools: <https://github.com/agile-humanities/AgileThemeTools>
  - Advanced Search : <https://gitlab.com/Daniel-KM/Omeka-S-module-AdvancedSearch>
  - BlocksDisposition:	 <https://gitlab.com/Daniel-KM/Omeka-S-module-BlocksDisposition>
  - IiifServer : <https://gitlab.com/Daniel-KM/Omeka-S-module-IiifServer>
  - Image Server: <https://gitlab.com/Daniel-KM/Omeka-S-module-ImageServer>
  - UniversalViewer: <https://gitlab.com/Daniel-KM/Omeka-S-module-UniversalViewer>
  - Mirador: <https://gitlab.com/Daniel-KM/Omeka-S-module-Mirador>
- Clone the Agile Base Theme in the theme folder (required for installing theme) (@todo: upload to GitHub)
- Rename theme folder to a custom theme name
- Navigate to the Agile Base theme 
- Run `npm install` from theme folder to install core libraries
- Run `npm i -g add-local-binaries-to-path` from the terminal. This allows you to run programs in your node\_modules folder directly from the command line (such as gulp).
  - See <https://www.npmjs.com/package/add-local-binaries-to-path> for instructions
- Run `gulp build` from the terminal to build your initial assets folder. You must run gulp before styles and Javascript will be available.
- Remove existing GIT information. Your theme folder is tied to the AgileBaseOmekaTheme repository. To make your own, you must remove the .git folder from the theme.
  - Run `rm -rf .git` in the theme folder. If you encounter permissions problems, you’ll need to be sudo or root user to do this. Try `sudo rm -rf .git’
- Optionally you can now create your own git repository if desired. 
  - IMPORTANT NOTE:  The /asset folder, which contains the core css and js files, is volatile and will be deleted and rebuild after running gulp build. It will also be ignored by default in any git repository. If you are using .git DO NOT modify the files in the asset folder directly. Always modify main 00\_main\_configuration.yml file, and/or the files the /source folder, which will then build your new css and js assets.
- Modify theme config (themefolder/config/theme.ini) with your new theme info.


**Creating your site**

Instructions for creating a new site using this theme. This also points to modifications you’ll need to make to existing Omeka S builds to enable the theme capabilities.

- Make sure that all the modules above are successfully installed via Admin > Modules
- Create your site (Admin > Sites)
- IMPORTANT: You must enable a default search page. Admin > Sites > YourSite > Theme > [Settings] > Advanced Search > Available search pages > enable
- Enable theme for the site (Admin > Sites > YourSite > Theme)
- Enable Universal Viewer and/or Mirador as your base viewer
  - Navigate to Admin > Sites > Your Theme > Site Admin > [Settings Tab]
  - Under “Blocks Disposition” click on the desired viewer beside “For Item Show” (and others). 
  - If no options appear here you have not installed the Blocks Disposition, UV and/or Mirador correctly. Review their installation instructions.
- Change your logo in the theme system.
  - Replace ./source/img/svg/marks/logo.svg with your own logo
  - Alternatively you can modify the ./view/layout/layout.phtml template to point to your own logo file
  - Run `gulp build` to reflect your logo change in your built asset folder
- Create your homepage via Admin > Sites > YourSite > Pages > [Add New Page button]
- Suggested: Add a Homepage Introduction Block
  - Provide a site title, label text, and optional short introduction
  - Add Item Attachments once you’ve added items to your repository. Note that items with landscape images work best by default in the homepage introduction block.
  - Change “Assign to region” to “Splash Area” to create a full screen carousel
  - Leave other options as default unless you want to experiment!
- Under Admin > Sites > YourSite > Navigation select this page as the homepage (upper right)

Customize Omeka S as per its instructions. 
