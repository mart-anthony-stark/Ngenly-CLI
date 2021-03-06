# Ngenly CLI

A node project boilerplate generator

## Installation

Install the package globally using yarn or npm

```console
npm install -g ngenly
```

## Usage

- execute in terminal
  ngenly [command]

### Commands

- Create a new project

```console
ngenly new
```

- Generate CRUD files

```console
ngenly -g crud [expressjs | expressts] [model_name]
```

- View the cli version

```console
ngenly -v
```

- ngenly new = generates a new project
- ngenly [-g | generate] = starts generating project or crud using menu
- ngenly -v = returns cli version
- ngenly --version = returns cli version
- ngenly -g [crud] [library] [name] = generates crud files (Model, Controller, Router)
