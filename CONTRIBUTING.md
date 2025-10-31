# Contributing to Project Cicero

We love your input! We want to make contributing to Project Cicero as easy and transparent as possible.

## 📋 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Request Process

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## 🔧 Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/project-cicero.git
cd project-cicero

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests (when available)
npm test

# Run linter
npm run lint

# Format code
npm run format
```

## 📝 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples

```
feat(tasks): add drag and drop support

Added @dnd-kit integration for task reordering in board view.

Closes #123
```

```
fix(dashboard): correct chart data calculation

Fixed an issue where completed tasks weren't counted correctly
in the dashboard metrics.
```

## 🧪 Testing Guidelines

- Write unit tests for new features
- Ensure existing tests pass
- Aim for high test coverage
- Test edge cases

## 💅 Code Style

- Use TypeScript for type safety
- Follow existing code patterns
- Use meaningful variable names
- Comment complex logic
- Keep functions small and focused

### Formatting

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Max line length: 100 characters

Run `npm run format` to auto-format your code.

## 🐛 Bug Reports

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## 💡 Feature Requests

We track feature requests using GitHub issues. Before creating a new request:

1. Check if it already exists
2. Describe the problem you're trying to solve
3. Explain why this feature would be useful
4. Provide examples of how it would work

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

### Unacceptable Behavior

- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## 📞 Questions?

Don't hesitate to ask questions in:

- GitHub Discussions
- GitHub Issues (with `question` label)

Thank you for contributing! 🎉
