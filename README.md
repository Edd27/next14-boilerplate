# Next.js boilerplate

This GitHub project template is designed to help you get started quickly with Next.js.

## Demo

You can see the demo project on [this link](https://next-template.edgarbenavides.dev/)

## Technologies

[![next-js](https://img.shields.io/badge/next.js-000?style=for-the-badge&logo=next.js&logoColor=fff)](https://nextjs.org/)
[![typescript](https://img.shields.io/badge/typescript-2C6FBB?style=for-the-badge&logo=typescript&logoColor=FFF)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/prisma-4F60CE?style=for-the-badge&logo=prisma&logoColor=FFF)](https://www.prisma.io/)
[![eslint](https://img.shields.io/badge/eslint-4133B7?style=for-the-badge&logo=eslint&logoColor=FFF)](https://eslint.org/)
[![prettier](https://img.shields.io/badge/prettier-F6B249?style=for-the-badge&logo=prettier&logoColor=000)](https://prettier.io/)
[![next-auth](https://img.shields.io/badge/next%20auth-1687FB?style=for-the-badge&logo=next.js&logoColor=FF5C01)](https://next-auth.js.org/)
[![shadcn](https://img.shields.io/badge/shadcn%20ui-000?style=for-the-badge&logo=shadcnui&logoColor=fff)](https://ui.shadcn.com/docs/components/accordion)

## Getting started

### Option 1: Use template on GitHub

1. Fork this project

2. Create new project and select this template as repository template:

![alt text](image.png)

### Option 2: Create new project

1. Create a new project using `create-next-app` tool with this command

   ```bash
   npx create-next-app@latest --example "https://github.com/Edd27/next14-boilerplate" [name-of-your-project]
   ```

## Run the boilerplate

### Manually

1. Create a `.env` file from `.env.example`, then update variables values.

   ```bash
   cp .env.example .env
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Push prisma schema to the database.

   ```bash
   npx prisma db push
   ```

4. Seed database:

   ```bash
   npx prisma db seed
   ```

5. Run server on dev mode:

   ```bash
   npm run dev
   ```

6. Access the app at:
   ```bash
   http://localhost:3000
   ```

### Using Docker

1. Create `.env.development` and `.env.production` files:

   ```bash
   cp .env.example .env.development
   cp .env.example .env.production
   ```

   > NOTE: Update the `.env.development` and `.env.production` files

2. Run the app using Docker Compose:

   ```bash
   docker compose --env-file .env.development up -d --build
   ```

3. Access the app at:
   ```bash
   http://localhost:3000
   ```

## Testing

Teste the app with the following credentials:

- Username:

  ```
  edgar
  ```

- Password:

  ```
  admin12345
  ```

## License

This project is open-source and released under the [MIT License](https://choosealicense.com/licenses/mit/).
