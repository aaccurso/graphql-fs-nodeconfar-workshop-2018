# Step 2

Queremos listar los nombres de los directorios y archivos en `ROOT_PATH`.
Luego queremos poder listar archivos y directorios recursivamente dentro de otros directorios.

__TODO__: pensar si extraer el _listado recursivo_ en otro step.

Query:

```gql
query listDirs {
  dirs {
    name
    type
    files {
      name
      type
    }
    dirs {
      name
      type
    }
  }
}
```

Resultado:

```json
{
  "data": {
    "dirs": [
      {
        "name": "dirA",
        "type": "Dir",
        "files": [
          {
            "name": "fileA.txt",
            "type": "File"
          }
        ],
        "dirs": []
      }
    ]
  }
}
```

## Crear tipo __Dir__

TODO: completar

## Agregar field _dirs_ al tipo __Query__

TODO: completar

## Resolver el field _dirs_

TODO: completar

## Resolver _files_ y _dirs_ para tipo __Dir__

TODO: completar
