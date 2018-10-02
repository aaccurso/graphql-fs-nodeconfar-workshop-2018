# Step 0

__TODO__ agregar imagen de la familia Simpson.

## Enunciado

Vamos a implementar un esquema de GraphQL que nos permita listar archivos y directorios dentro de un filesystem.

Para ello nuestro punto de entrada o `ROOT_PATH` va a ser un directorio que contiene a los personajes de Los Simpsons organizados geneológicamente.

Los archivos van a representar a los personajes y los directorios van a representar las relaciones entre dichos personajes.

```
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

* No te olvides de poner el where en el delete from: `npm install`.
* Ejecuta `npm run test:step-0` para verificar que todo este bajo control.
* Ejecuta `npm run start:dev` para levantar el servicio GraphQL.
* Entra a http://localhost:4000/ e intenta ejecutar la query `{ hello }`.
