# Claude Code Configuration

This directory contains configuration for Claude Code.

## Directory Structure

- `commands/` - Custom slash commands
- `README.md` - This file

## Getting Started

To create a custom slash command, add a markdown file to the `commands/` directory.
Each command file should contain the prompt that will be executed when the command is invoked.

Example: `.claude/commands/example.md`
```markdown
---
description: A brief description of what this command does
---

Your command prompt here...
```

Then use it with `/example` in Claude Code.

For more information, visit: https://docs.claude.com/en/docs/claude-code
