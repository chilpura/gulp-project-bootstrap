# Starter project

This is a starter web project using Gulp, Twig and Hologram. Gulp handles usual build tasks, compiles Twig templates and builds a styleguide from sass comments. Default task starts a server for the styleguide at localhost:8000 and for the development site at localhost:3000. There is a watch task that updates both the site and the styleguide when there are changes. The style guide is recompiled every time there is a change, but the browser needs to be refreshed manually.

## Commands

Commands can be run separately.

### Default Task

    gulp

Running the default task automatically watches your project folders for any changes and runs the accompanying task.

### CSS

    gulp styles

Running the gulp styles task will run your selected CSS tasks once.

### JavaScript

    gulp scripts

Running the gulp scripts task will run your selected JavaScript tasks once.

### Images

    gulp images

Running the gulp images task will run your selected image tasks once.

### Styleguide

    gulp styleguide

Runs styleguide tasks.
