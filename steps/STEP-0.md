# Step 0 <img align="right" width="100" height="100" src="../img/graphql-fs-level-0.png">

<p align="center">
  <img src="../img/simpsons.jpg">
</p>

## Enunciado

Vamos a implementar un esquema de GraphQL que nos permita **listar archivos y directorios dentro de un filesystem**.

Para ello nuestro punto de entrada o `ROOT_PATH` va a ser un directorio que contiene a los personajes de _Los Simpsons_ organizados geneológicamente.

Los archivos van a representar a los personajes y los directorios van a representar el parentezco entre dichos personajes.

```plain
The_Simpsons/
├── Bart_Simpson.png
├── Lisa_Simpson.png
├── Maggie_Simpson.png
├── Father/
│   ├── Homer_Simpson.png
│   ├── Father/
│   │   └── Abe_Simpson.png
│   └── Mother/
│       └── Mona_Simpson.png
└── Mother/
    ├── Marge_Simpson.png
    ├── Patty_Bouvier.png
    ├── Selma_Bouvier.png
    ├── Father/
    │   └── Clancy_Bouvier.jpg
    └── Mother/
        └── Jacqueline_Bouvier.gif
```

## Setup

Antes de comenzar vamos a verificar que todo este andando correctamente en nuestro entorno local.

> Es recomendable instalar la versión 8+ de Node.js ya que todas las herramientas utilizadas en el workshop fueron probadas con dicha versión.

1) [No te olvides de poner el where en el delete from](https://www.youtube.com/watch?v=i_cVJgIz_Cs): `npm install`.
2) Ejecuta `npm run test:step-0` para verificar que todo este bajo control.
3) Ejecuta `npm run start:dev` para levantar el servicio GraphQL.
4) Entra a http://localhost:4000/ e intenta ejecutar la query `{ hello }`.

## FileSystem API

Para resolver el ejercicio es una buena idea repasar la documentación de los siguientes métodos de la API `fs`:

* [readdir](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)(path)
* [stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)(path)
* [writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)(filename, data)

En el source del proyecto vas a encontrar un módulo `filesystem.js` que expone dichos métodos wrappeados en promises para así aprovechar la sintáxis _async/await_ soportada en la versión de Node.js que vamos a utilizar. Sin embargo, esto es opcional ya que también se puede usar la convención de callbacks que ya todos conocemos.

## Tests

En cada paso del workshop es posible ejecutar el comando `npm run test:step-N` donde `N` es el numero de paso actual. Esto nos permite verificar si nuestra implementación resuelve lo especificado en cada paso.

## All set!

Eso es todo! Ya podes comenzar a resolver el [Step 1](STEP-1.md).
