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

## Crear tipo Dir y resolver `dirs`

De la misma forma que con _File_ necesitamos crear el tipo _Dir_ que va a devolver nuestra nueva query `dirs`.

Si bien en este paso _File_ y _Dir_ van a terminar teniendo la misma definición de campos, queremos poder distinguirlos para una parte muy importante del ejercicio, pero no nos adelantemos!

> **Pro Tip**: intenta reutilizar la lógica del resolver de `files` para nuestro nuevo resolver `dirs`, te va a ser de ayuda más adelante!

---

Antes de continuar verifica que pasen los tests: `npm run test:2`

[Paso anterior](STEP-1.md) - [Paso siguiente](STEP-3.md)
