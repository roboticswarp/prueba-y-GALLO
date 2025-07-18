# Prueba Técnica: API de Gestión de Tareas
**Candidato:** Andrés Mauricio Gallo Amado

---

## Resumen del Proyecto

Esta es una API RESTful construida con Node.js, Express y MySQL. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) completas sobre un recurso de "Tareas".

El proyecto está estructurado siguiendo las mejores prácticas de desarrollo para garantizar un código limpio, seguro y mantenible.

---

## 1. Requisitos Previos

Para ejecutar este proyecto, necesitará tener instalado:

-   **Node.js** (versión 18 o superior recomendada)
-   **MySQL Server**
-   Un cliente de API como **Postman** o la extensión **Thunder Client** para VSCode.

---

## 2. Configuración del Entorno

Siga estos pasos para poner en marcha el proyecto:

**1. Instalar Dependencias:**
Abra una terminal en la raíz del proyecto y ejecute el siguiente comando:
```bash
npm install
```

**2. Configurar la Base de Datos:**
   a. Acceda a su consola de MySQL.
   b. Cree la base de datos:
      ```sql
      CREATE DATABASE prueba_tecnica_db;
      ```
   c. Seleccione la base de datos recién creada:
      ```sql
      USE prueba_tecnica_db;
      ```
   d. Ejecute el siguiente script SQL para crear la tabla `tareas`:
      ```sql
      CREATE TABLE tareas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(255) NOT NULL,
          descripcion TEXT,
          completado BOOLEAN DEFAULT false,
          creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      ```

**3. Variables de Entorno:**
En la raíz del proyecto, cree un archivo llamado `.env` y llénelo con sus credenciales de base de datos, siguiendo este ejemplo:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=su_password_de_mysql
DB_DATABASE=prueba_tecnica_db
```

---

## 3. Ejecución

Una vez configurado el entorno, puede iniciar el servidor.

**Para desarrollo (con reinicio automático):**
```bash
npm run dev
```

**Para ejecución normal:**
```bash
node server.js
```

El servidor se iniciará y estará escuchando en `http://localhost:3000`.

---

## 4. Endpoints de la API

La API expone los siguientes endpoints bajo el prefijo `/api/tareas`:

| Método | Ruta              | Descripción                  | Body de Ejemplo (para POST y PUT)                                  |
| :----- | :---------------- | :--------------------------- | :----------------------------------------------------------------- |
| `POST` | `/`               | Crea una nueva tarea.        | `{ "titulo": "Nueva Tarea", "descripcion": "Detalles...", "completado": false }` |
| `GET`  | `/`               | Obtiene todas las tareas.    | N/A                                                                |
| `GET`  | `/:id`            | Obtiene una tarea por su ID. | N/A                                                                |
| `PUT`  | `/:id`            | Actualiza una tarea.         | `{ "titulo": "Tarea Actualizada", "descripcion": "Nuevos detalles...", "completado": true }` |
| `DELETE`| `/:id`            | Elimina una tarea.           | N/A                                                                |

---

## 5. Notas de Arquitectura y Buenas Prácticas

-   **Arquitectura por Capas:** El código está organizado en `rutas`, `controladores` y una capa de `acceso a datos` para facilitar la mantenibilidad.
-   **Seguridad:** Todas las consultas a la base de datos utilizan **prepared statements** para prevenir inyecciones SQL.
-   **Manejo de Errores:** La API maneja los errores de forma robusta, devolviendo los códigos de estado HTTP apropiados (200, 201, 204, 400, 404, 500).
-   **Validación:** Se ha implementado validación de entrada en los endpoints de creación y actualización para garantizar la integridad de los datos.

---