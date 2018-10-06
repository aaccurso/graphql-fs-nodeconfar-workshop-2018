# Step 2 <img align="right" width="100" height="100" src="../img/graphql-fs-level-2.png">

El objetivo de este paso es poder **listar los directorios** en `ROOT_PATH` de forma análoga a como lo hicimos en el paso anterior listando los archivos.

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

## Campo `type`

Habrás notado que se agregó el campo `type` como propiedad de un directorio. Te animas a agregarselo también al tipo __File__?

> **Pro Tip**: intenta reutilizar el resolver de `files`, te va a ser de ayuda más adelante!

---

Antes de continuar verifica que pasen los tests: `npm run test:2`

[Paso anterior](STEP-1.md) - [Paso siguiente](STEP-3.md)
