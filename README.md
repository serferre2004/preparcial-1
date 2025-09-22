This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Arquitectura de la solución

Esta solución tiene tres páginas `/authors`, `/crear` y `/favoritos`, la primera página muestra una lista de autores a partir de una petición a la API dada, esto se maneja mediante un contexto general en un componente `ListContext.tsx`, el cual contiene listas de todos los autores, autores favoritos y otros métodos como `addAuthor`, `removeAuthor`, `updateAuthor`, `addFav`, `removeFav` que se encargan de manejar la información de estas listas. Este contexto está disponible en las tres páginas.
Para el manejo de botones por cada autor se usa un componente `authorCard` que usa del contexto los métodos de `removeAuthor`, `addFav`, `removeFav`; para el método `updateAuthor` se redirige a la página `/crear` junto con un parámetro de url que indica el `id` del autor a modificar. Este componente se replica según el número de autores en la página `/authors`. Desde esta página se pueden manejar el botón Nuevo autor, que redirige a la página `/crear` sin ningún parámetro. Desde esta página `/crear` se usan los métodos `addAuthor` y `updateAuthor` que modifican la lista de autores según el parámetro recibido desde la url. Por último la página `/favoritos` simplemente consume la lista de autores favoritos desde el contexto general.

## Opción escogida

La opción escogida fue la **opción 1: Accesibilidad** 

## Instrucciones de ejecución

Para ejecutar la aplicación se debe ejecutar el contenedor que inicializa el backend para el consumo de la API, después se debe iniciar el proyecto de `npm` como se indica debajo, en modo desarrollo. Cuando se abra [http://localhost:3000](http://localhost:3000) en el navegador, se redirige automáticamente a `/authors`, en donde se muestra toda la información. Para navegar a `/favoritos` debe hacerse usando el botón en la parte central de la página, y para crear o editar autores debe hacerse desde los botones de nuevo autor (al final de la lista) o en el ícono de edición de cada autor en la parte superior derecha de la tarjeta del autor. Para añadir un autor a favoritos o eliminarlos usar los botones con los íconos de estrella y basura respectivamente. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
