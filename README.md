# Ngenly CLI

A node project boilerplate generator

- [Installation](#installation)
- [Commands](#commands)
- [Create New Project](#create-a-new-project)
- [Generate CRUD files](#generate-crud-files)

## Installation

Install the package globally using yarn or npm

```console
npm install -g ngenly
```

## Usage

- execute in terminal
  ngenly [command]

## Commands

| Command                             | Description                                      |
| ----------------------------------- | ------------------------------------------------ |
| `ngenly new`                        | Generates a new project                          |
| `ngenly upgrade`                    | Installs the latest version of ngenly globally   |
| `ngenly [-g / generate]`            | Starts generating project or crud using menu     |
| `ngenly -v`                         | Returns cli version                              |
| `ngenly --version`                  | Returns cli version                              |
| `ngenly -g [crud] [library] [name]` | Generates crud files (Model, Controller, Router) |
| `ngenly --gui`                      | Opens the browser for ngenly GUI                 |

## Create a new project

```console
ngenly new
```

![Alt text](image-1.png)

- Project Boilerplate will be created with its own folder
  ![Alt text](image-2.png)
  > You can also generate project boilerplate with one-liner command
  > Usage: ngenly -g project [expressjs | expressts | fastifyjs | fastifyts] [projectName]

```console
ngenly -g project expressjs School-Management-API
```

## Generate CRUD files

> Usage: ngenly -g crud [expressjs | expressts | fastifyjs | fastifyts] [model_name]

```
ngenly -g crud expressjs user
```

![Generate CRUD](image.png)
