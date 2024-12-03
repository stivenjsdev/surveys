# Surveys: Encuestas de Beneficios de la PMO

Este proyecto es una aplicación de gestión de encuestas desarrollada con **Next.js** utilizando el **App Router**, **TypeScript**, **Tailwind CSS**, y **shadcn/ui**. Proporciona una plataforma para crear, administrar y completar encuestas, con una arquitectura bien estructurada y componentes reutilizables.

## Tabla de Contenidos

- [Surveys: Encuestas de Beneficios de la PMO](#surveys-encuestas-de-beneficios-de-la-pmo)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Rutas de la Aplicación](#rutas-de-la-aplicación)
    - [`/dashboard`](#dashboard)
    - [`/dashboard/survey/[id]`](#dashboardsurveyid)
    - [`/survey/[id]`](#surveyid)
    - [`/survey-complete`](#survey-complete)
    - [Resumen de las Rutas](#resumen-de-las-rutas)
    - [Ejemplo de Navegación](#ejemplo-de-navegación)
  - [Descripción de las Carpetas](#descripción-de-las-carpetas)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Instalación y Configuración](#instalación-y-configuración)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Modelo de Datos](#modelo-de-datos)
    - [Modelo: Response](#modelo-response)
      - [Campos](#campos)
      - [Configuración del Esquema](#configuración-del-esquema)
    - [Modelo: Survey](#modelo-survey)
      - [Campos](#campos-1)
      - [Configuración del Esquema](#configuración-del-esquema-1)
    - [Relación entre Modelos](#relación-entre-modelos)
  - [Licencia](#licencia)

## Características

- Creación y administración de encuestas.
- Componentes interactivos basados en **Radix UI** y **shadcn/ui**.
- Validación de formularios con **React Hook Form** y **Zod**.
- Persistencia de datos utilizando **Mongoose**.
- UI moderna con **Tailwind CSS**.
- Compatibilidad con arrastrar y soltar usando **@hello-pangea/dnd**.

## Estructura del Proyecto

```plaintext
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── survey/
│   │   ├── [id]/page.tsx
│   │   └── page.tsx
│   ├── survey-complete/
│   │   └── page.tsx
│   ├── fonts/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── CreateSurveyForm.tsx
│   │   ├── CreateSurveyModal.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── StatisticsCard.tsx
│   │   └── SurveyList.tsx
│   └── actions/
│       └── surveyActions.ts
├── models/
│   ├── Response.ts
│   └── Survey.ts
```

## Rutas de la Aplicación

La aplicación utiliza el **App Router** de Next.js para manejar las rutas. A continuación, se describen las rutas disponibles, sus funcionalidades y las vistas correspondientes.

---

### `/dashboard`

- **Descripción**: Página principal para los administradores donde se muestra el resumen de las encuestas creadas.
- **Componente Asociado**: `src/app/dashboard/page.tsx`
- **Funcionalidad**:
  - Listar todas las encuestas creadas.
  - Mostrar estadísticas generales.
  - Acceso a la creación de nuevas encuestas.

---

### `/dashboard/survey/[id]`

- **Descripción**: Página dinámica para visualizar las 10 opciones mas prioritarias, calculadas por medio de puntuación, entre todos los encuestados.
- **Componente Asociado**: `src/app/dashboard/survey/[id]/page.tsx`
- **Funcionalidad**:
  - Listar las 10 opciones mas prioritarias y su puntuación.

---

### `/survey/[id]`

- **Descripción**: Página dinámica para responder una encuesta específica.
- **Componente Asociado**: `src/app/survey/[id]/page.tsx`
- **Parámetros**:
  - `id`: El identificador único de la encuesta (ObjectId en MongoDB).
- **Funcionalidad**:
  - Mostrar el título y descripción de la encuesta.
  - Renderizar las opciones de respuesta.
  - Enviar las respuestas seleccionadas.

---

### `/survey-complete`

- **Descripción**: Página que se muestra después de completar una encuesta.
- **Componente Asociado**: `src/app/survey-complete/page.tsx`
- **Funcionalidad**:
  - Confirmación visual de que la encuesta fue completada exitosamente.
  - Mensaje de agradecimiento al usuario.

---

### Resumen de las Rutas

| Ruta                     | Descripción                                              | Método HTTP | Funcionalidad                                    |
| ------------------------ | -------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `/dashboard`             | Resumen y estadísticas de encuestas.                     | `GET`       | Página de administración.                        |
| `/dashboard/survey/[id]` | 10 opciones mas prioritarias de una encuesta específica. | `GET`       | Página de administración.                        |
| `/survey/[id]`           | Responder una encuesta específica.                       | `GET`       | Página dinámica con el contenido de la encuesta. |
| `/survey-complete`       | Confirmación de encuesta completada.                     | `GET`       | Página de agradecimiento.                        |

---

### Ejemplo de Navegación

1. Un administrador accede al **dashboard** en `/dashboard` para ver un resumen de todas las encuestas creadas y crear una nueva encuesta desde el modal.
2. Un participante accede al enlace `/survey/[id]` para completar la encuesta.
3. Después de enviar sus respuestas, el participante es redirigido a `/survey-complete` con un mensaje de agradecimiento.
4. El administrador desde el **dashboard** en `/dashboard` mediante el botón ver resultados, accede a las 10 opciones mas prioritarias entre todos los encuestados en `/dashboard/survey/[id]`.

## Descripción de las Carpetas

- `app/`: Contiene las páginas principales de la aplicación utilizando el App Router de Next.js.
- `components/`: Incluye componentes reutilizables de la interfaz de usuario y acciones.
- `models/`: Define los modelos de datos utilizados en la aplicación.
- `public/`: Archivos estáticos como imágenes o íconos.

## Tecnologías Utilizadas

- NodeJs: `22.11.0`
- Framework: Next.js 15.0.3
- Lenguaje: TypeScript
- Estilos: Tailwind CSS 3.4.1
- Validación: Zod
- Formularios: React Hook Form
- Base de datos: Mongoose
- UI: shadcn/ui

## Instalación y Configuración

Sigue los pasos para instalar y configurar el proyecto:

1. Clona este repositorio:

```bash
git clone https://github.com/stivenjsdev/surveys.git
cd surveys
```

2. Instala las dependencias:

```bash
npm install --force
```

3. Crea en la raíz del proyecto el archivo .env con la siguiente variable de entorno:

```bash
MONGODB_URI=<stringDeConexión>
```

1. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:3000`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor en modo producción.
- `npm run lint`: Ejecuta el linter para verificar errores en el código.

## Modelo de Datos

El proyecto utiliza **Mongoose** para la definición de los modelos de datos. A continuación, se describen los modelos principales: **Response** y **Survey**.

### Modelo: Response

El modelo **Response** representa las respuestas que los usuarios envían para una encuesta. Está relacionado con el modelo **Survey** a través de la clave foránea `surveyId`.

#### Campos

- **surveyId** (`ObjectId`): Clave foránea que referencia al modelo `Survey`.
- **fullName** (`String`): Nombre completo del participante.
- **selections** (`Array<number>`): Arreglo de números que representan las opciones seleccionadas en la encuesta.
- **createdAt** (`Date`): Fecha de creación de la respuesta (generada automáticamente por Mongoose).
- **updatedAt** (`Date`): Fecha de última actualización de la respuesta (generada automáticamente por Mongoose).

#### Configuración del Esquema

- `timestamps`: Habilita los campos `createdAt` y `updatedAt` automáticamente.

### Modelo: Survey

El modelo **Survey** representa una encuesta creada por los administradores. Este modelo incluye un campo virtual para las respuestas relacionadas.

#### Campos

- **title** (`String`): Título de la encuesta.
- **description** (`String`): Descripción breve de la encuesta.
- **options** (`Array<string>`): Lista de opciones disponibles en la encuesta. (No se utiliza directamente, ya que las opciones están predefinidas en `surveyOptions.ts`).
- **responses** (`Virtual<ResponseType[]>`): Campo virtual que contiene las respuestas relacionadas con la encuesta.
- **createdAt** (`Date`): Fecha de creación de la encuesta (generada automáticamente por Mongoose).
- **updatedAt** (`Date`): Fecha de última actualización de la encuesta (generada automáticamente por Mongoose).

#### Configuración del Esquema

- Campo Virtual `responses`:

  - Relaciona las respuestas (`Response`) con una encuesta (`Survey`).
  - `ref`: Modelo de referencia (`Response`).
  - `localField`: Campo en el modelo `Survey` (`_id`).
  - `foreignField`: Campo en el modelo `Response` (`surveyId`).

- Opciones de Serialization:
  - `toObject` y `toJSON`: Incluyen los campos virtuales al convertir los documentos a objetos JSON.

### Relación entre Modelos

- Una encuesta (`Survey`) puede tener múltiples respuestas (`Response`).
- La relación entre los modelos está definida por:
  - `surveyId` en el modelo `Response`, que referencia el `_id` del modelo `Survey`.
  - El campo virtual `responses` en el modelo `Survey`.

## Licencia

Este proyecto está licenciado bajo la MIT License.
