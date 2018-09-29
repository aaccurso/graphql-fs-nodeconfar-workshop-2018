# Step 2

Queremos listar los nombres de los directorios en `ROOT_PATH`.
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

__TODO__: completar

## Agregar field _dirs_ al tipo __Query__

__TODO__: completar

## Resolver field _dirs_ para tipo __Query__

__TODO__: completar


En este momento se puede realizar la siguiente query:

```gql
query listDirs {
  dirs {
    name
    type
  }
}
```

## Agregar fields _files_ y _dirs_ al tipo __Dir__

__TODO__: completar

## Resolver _files_ y _dirs_ para tipo __Dir__

__TODO__: completar
