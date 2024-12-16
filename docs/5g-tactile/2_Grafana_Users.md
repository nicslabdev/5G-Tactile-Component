---
sidebar_position: 2
---

# Grafana

Grafana es una plataforma de código abierto utilizada principalmente para la visualización y análisis de métricas, registros y eventos a través de paneles interactivos. Su capacidad para conectarse a múltiples fuentes de datos y su versatilidad en la creación de visualizaciones hacen que sea una herramienta popular en la supervisión y análisis de infraestructura y aplicaciones.

En este tutorial, abordaremos cómo securizar una instancia de Grafana, creando y gestionando usuarios y roles de manera eficaz para personalizar los niveles de acceso según las necesidades de tu equipo o proyecto.

## Gestión de Usuarios y Roles en Grafana
Grafana permite la asignación de diferentes roles a los usuarios, lo que es esencial para mantener la seguridad y control sobre qué información y acciones son accesibles para cada miembro de un equipo. Los roles determinan los permisos de los usuarios en términos de:

- **Visualización de datos**: quién puede ver qué paneles y dashboards.
- **Modificación y edición**: quién tiene la capacidad de crear o modificar paneles.
- **Administración de usuarios**: quién puede crear, modificar o eliminar usuarios y roles.

### Crear y Asignar Usuarios
**1.** **Acceder a la configuración de usuarios**

   Dentro de la interfaz de Grafana, existe una sección de configuración donde se pueden gestionar los usuarios. Aquí, puedes añadir nuevos usuarios proporcionando su correo electrónico, nombre de usuario y asignando un rol inicial.

**2.** **Roles predefinidos**

   Grafana viene con roles predefinidos como Viewer, Editor, Admin y Grafana Admin. Estos roles permiten diferentes niveles de acceso:

   - **Viewer**: Este rol sólo permite visualizar paneles y dashboards sin posibilidad de editar.
   - **Editor**: Además de la visualización, los usuarios con este rol pueden crear y modificar paneles y dashboards.
   - **Admin**: Los administradores de la organización pueden gestionar los usuarios, roles, paneles y fuentes de datos dentro de su organización.

**3.** **Gestión de Equipos y Grupos**

   Grafana también permite agrupar usuarios en equipos, facilitando la administración de permisos de manera colectiva. Los equipos pueden tener roles asignados que automáticamente afectan a todos sus miembros, lo cual es útil para gestionar grandes conjuntos de usuarios con los mismos requisitos de acceso.

## Procedimiento
### Organizaciones
En Grafana, una organización es una entidad que agrupa usuarios, equipos, y recursos como paneles y dashboards. Cada organización tiene su propio conjunto de permisos y configuraciones, lo que permite gestionar de manera independiente los accesos y roles de los usuarios. Esto es útil para separar proyectos o departamentos dentro de una misma instancia de Grafana, asegurando que cada grupo de trabajo tenga acceso solo a la información y herramientas que necesita.

El objetivo es configurar una organización distinta por cada cliente y gemelo para mantener el acceso separado de cada uno de los posibles clientes. Los pasos a seguir son los siguientes.

**1.** Una vez se ha accedido a grafana, se debe dirigir al panel lateral, adminitración, general y hacer click en organizaciones.
![Grafana Organizations Step 1](/grafana/GrafanaOrg1.png)

**2.** Hacer click en el botón "New Org".
![Grafana Organizations Step 2](/grafana/GrafanaOrg2.png)

**3.** Introduce el nombre de la organización.

**4.** Introduce las preferencias deseadas de la organización.

**5.** Después de estos sencillos pasos, la nueva organización habrá sido creada.
![Grafana Organizations Step 3](/grafana/GrafanaOrg3.png)

### Usuarios
En Grafana, los usuarios son fundamentales para administrar el acceso y la seguridad dentro de la plataforma. Cada usuario puede tener un rol asignado, que define los permisos y acciones que pueden realizar dentro de la instancia. Grafana permite una gestión detallada de usuarios a través de:

- Roles predefinidos
- Equipos y grupos
- Organizaciones

Para crear un nuevo usuario, se deben seguir los siguientes pasos:

**1.** En la parte superior derecha, comprovamos que estamos trabajando en la organanización que queremos. Luego buscamos la sección de usuarios y pulsamos el botón de nuevo usuario.
![Grafana Users Step 1](/grafana/GrafanaUsers1.png)

**2.** En la ventana que aparece rellenamos la información y creamos el usuario.

**3.** A continuación aparece la vista de los detalles del usuario. Aquí se puede añadir el usuario a alguna organización y asignarle dentro de esta organización uno de los roles predefinidos. Por defecto, todos los usuarios empiezan en la organización Main con el rol de viewer
![Grafana Users Step 2](/grafana/GrafanaUsers2.png)

**4.** Podemos agregar una nueva organización y eliminar la Main para que el usuario quede en la organización que creamos previamente. En este caso se añade a la organización de ejemplo con el rol de editor.
![Grafana Users Step 3](/grafana/GrafanaUsers3.png)




### Equipos

En Grafana, los "equipos" son una funcionalidad que permite agrupar usuarios para gestionar permisos y acceso a los recursos de manera más eficiente. Para crear y configurar equipos se deben seguir los siguientes pasos.
