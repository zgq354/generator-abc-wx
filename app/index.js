'use strict';
const Generator = require('yeoman-generator');
const tools = require('./tools');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'type',
        choices: ['page', 'component'],
        message: 'Create a page or component?',
        default: 'page',
      },
      {
        type: 'confirm',
        name: 'useTs',
        message: 'Use TypeScript?',
        default: true,
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the page/component:',
        required: true,
        validate: v => {
          v = v.trim();

          if (!/^[a-z][a-z-]*$/.test(v)) {
            return `Name [${v}] is invalid, the test [/^[a-z][a-z-]*$/] failed`;
          }

          if (tools.fileExist(v, this.distComponentPath)) {
            return `[${v}] is already existed`;
          }

          return true;
        }
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { props: { type, name, useTs } } = this;

    const templateObj = {
      page: [
        'template.css',
        'template.ts',
        'template.json',
        'template.wxml',
      ],
      component: [
        'template.css',
        'template.ts',
        'template.json',
        'template.wxml',
      ],
    };

    templateObj[type].forEach(fileName => {
      let ext = fileName.split('.')[1];
      if (ext === 'ts' && !useTs) {
        ext = 'js';
      }
      this.fs.copy(
        this.templatePath(`${type}/${fileName}`),
        this.destinationPath(`${name}/${name}.${ext}`),
      );
    });
  }
};
