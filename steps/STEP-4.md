# Step 4

En este paso queremos generar un listado de archivos y directorios a partir de un único comando `ls`.

Es decir, dada la siguiente consulta:

```gql
query list {
  ls {
    name
    type
  }
}
```

Queremos obtener esta respuesta:

```json
{
  "data": {
    "ls": [
      {
        "name": "Bart_Simpson.png",
        "type": "File"
      },
      {
        "name": "Father",
        "type": "Dir"
      },
      {
        "name": "Lisa_Simpson.png",
        "type": "File"
      },
      {
        "name": "Maggie_Simpson.png",
        "type": "File"
      },
      {
        "name": "Mother",
        "type": "Dir"
      }
    ]
  }
}
```

## Crear interfaz __Stat__

__TODO__: hablar de interfaces y del método `__resolveType`

## Implementar interfaz __Stat__ para __File__ y __Dir__

__TODO__: completar

## Agregar field _ls_ al tipo __Query__

__TODO__: completar

## Resolver _ls_ para tipo __Query__

__TODO__: completar
