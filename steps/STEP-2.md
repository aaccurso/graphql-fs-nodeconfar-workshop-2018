# Step 2

El objetivo de este paso es poder listar los directorios en `ROOT_PATH` de forma análoga a como lo hicimos en el paso anterior listando los archivos.

Es decir, dada la siguiente consulta:

```gql
query listDirs {
  dirs {
    name
    type
  }
}
```

Queremos obtener esta respuesta:

```json
{
  "data": {
    "dirs": [
      {
        "name": "Father",
        "type": "Dir",
      },
      {
        "name": "Mother",
        "type": "Dir",
      }
    ]
  }
}
```
