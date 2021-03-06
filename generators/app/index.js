const Generator = require('yeoman-generator');

const validate = require('./validate');

module.exports = class extends Generator {
  initializing() {
    this.log('Node Project Generator');
    this.log();
  }

  prompting() {
    const done = this.async();
    const store = true;

    const prompts = [
      {
        type: 'input',
        name: 'project',
        message: 'What is the name of your project?',
        default: 'awesome-project'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project?',
        default: 'An awesome project'
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: validate.validateName,
        store: store
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
        validate: validate.validateEmail,
        store: store
      },
      {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
        validate: validate.validateUsername,
        store: store
      }
    ];

    this.prompt(prompts).then((props) => {
      this.props = props;
      done();
    });
  }

  writing() {
    this.log();
    this.log('🚀  Generating project...');
    this.log();

    const files = require('./files');

    const templates = {
      project: this.props.project,
      description: this.props.description,
      name: this.props.name,
      email: this.props.email,
      username: this.props.username,
      year: new Date().getFullYear()
    };

    files.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file.template),
        this.destinationPath(file.destination),
        templates
      );
    });
  }

  install() {
    this.log();
    this.log('📦  Installing dependencies...');
    this.log();

    this.npmInstall(
      [
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'prettier'
      ],
      { 'save-dev': true }
    );
  }

  end() {
    this.log();
    this.log('🎉  Successfully generated!');
  }
};
