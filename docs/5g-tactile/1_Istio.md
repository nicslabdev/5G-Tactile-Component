---
sidebar_position: 1
---

# Istio

Istio es una potente service mesh de código abierto que te ayuda a gestionar, securizar y monitorizar microservicios dentro de tus clústeres de Kubernetes. Ofrece capacidades como la gestión de tráfico, seguridad, observabilidad y aplicación de políticas, sin requerir cambios en el código subyacente de los servicios.

En esta sección, te guiaremos a través del proceso de instalación y configuración de Istio en tu entorno de Kubernetes. Al final de esta guía, tendrás Istio completamente instalado y listo para gestionar tus microservicios.

## Prerequisitos
Antes de comenzar la instalación, asegúrate de tener lo siguiente:
- Un clúster de Kubernetes en funcionamiento (versión 1.19 o posterior).
- `kubectl` instalado y configurado para interactuar con tu clúster de Kubernetes.
- Recursos suficientes en el clúster para desplegar los componentes de Istio (CPU y memoria).
- Conocimiento básico de los conceptos de Kubernetes tales como pods, servicios y namespaces.

## Descripción general de la instalación
Cubriremos los siguientes pasos en esta guía:
1. **Descargar el paquete de instalación de Istio.**
2. **Instalar la herramienta de línea de comandos de Istio (istioctl).**
3. **Habilitar la inyección de sidecar de Istio para tus servicios.**
4. **Verificar la instalación.**

¡Vamos a profundizar en cada paso y poner Istio en funcionamiento!

## 1. Descargar el Paquete de Instalación de Istio

El primer paso es descargar el paquete de instalación de Istio desde el repositorio oficial de Istio en GitHub. Este paquete incluye todas las herramientas y archivos de configuración necesarios para instalar Istio en tu clúster de Kubernetes.

### Pasos:

1. Navega a la [página de versiones](https://istio.io/latest/docs/setup/getting-started/#download) de Istio y descarga la versión más reciente de Istio. También puedes descargarlo usando el siguiente comando:

   ```bash
   curl -L https://istio.io/downloadIstio | sh -
   ```

2. Después de descargar, cambia al directorio de Istio:

   ```bash
   cd istio-<version>
   ```
   > **_NOTA:_** Reemplaza `<version>` con la versión de Istio que descargaste (por ejemplo, istio-1.17.1).

3. Añade el cliente `istioctl` al `PATH` de tu sistema para que puedas ejecutarlo fácilmente desde cualquier ubicación:

   ```bash
   export PATH=$PWD/bin:$PATH
   ```

Una vez que hayas completado estos pasos, estarás listo para instalar Istio usando `istioctl`. Procede a la siguiente sección para continuar con la instalación.

:::tip[Recuerda!]
Asegúrate de personalizar el marcador `<version>` según la versión específica de Istio que estés descargando.
:::

## 2. Instalar la Herramienta de Línea de Comandos de Istio (`istioctl`)

Ahora que has descargado el paquete de Istio y añadido `istioctl` al `PATH` de tu sistema, el siguiente paso es instalar el plano de control de Istio en tu clúster de Kubernetes usando `istioctl`.

### Pasos:

1. Verifica que `istioctl` esté correctamente configurado ejecutando el siguiente comando para comprobar su versión:

   ```bash
   istioctl version
   ```
Este comando debería mostrar la versión instalada de `istioctl` y otros detalles sobre Istio.

2. Instala Istio en tu clúster de Kubernetes ejecutando el siguiente comando. Esto desplegará Istio con el perfil de configuración por defecto:
   ```bash
   istioctl install --set profile=default
   ```

3. Una vez completada la instalación, verifica que los componentes de Istio se hayan instalado en el namespace `istio-system` ejecutando:
   ```bash
   kubectl get pods -n istio-system
   ```

Después de que el plano de control esté instalado, procede a la siguiente sección para habilitar la inyección de sidecar de Istio para tus servicios.

## 3. Habilitar la Inyección de Sidecar de Istio

Istio funciona inyectando un proxy Envoy (sidecar) en los pods de tus servicios. Este sidecar intercepta todo el tráfico de red entre tus servicios y aplica las políticas de Istio, como la gestión del tráfico, seguridad y observabilidad.

Puedes habilitar la inyección automática del sidecar en namespaces específicos de Kubernetes o inyectar manualmente el sidecar en pods individuales.

### Pasos:

1. **Etiqueta tu Namespace para Inyección Automática**

   Para habilitar la inyección automática del sidecar en un namespace particular, ejecuta el siguiente comando:

   ```bash
   kubectl label namespace <your-namespace> istio-injection=enabled
   ```
   > **_NOTA:_** Reemplaza `<your-namespace>` con el namespace donde están ejecutándose tus servicios.

2. **Verifica la Etiqueta**

   Confirma que la etiqueta se ha aplicado ejecutando:

   ```bash
   kubectl get namespace -L istio-injection
   ```
   Deberías ver una columna etiquetada como `istio-injection`, mostrando `enabled` para el namespace que etiquetaste.

3. **Despliega tu Aplicación**

   Después de habilitar la inyección del sidecar, cualquier nuevo pod creado en el namespace etiquetado tendrá automáticamente el sidecar de Istio inyectado.

4. **Verifica la Inyección del Sidecar**

   Una vez que tu aplicación esté desplegada, verifica que el sidecar de Istio ha sido inyectado ejecutando:

   ```bash
   kubectl get pods -n <your-namespace>
   ```

   Luego, inspecciona los detalles del pod para verificar la presencia del contenedor `istio-proxy`:

   ```bash
   kubectl describe pod <your-pod-name> -n <your-namespace>
   ```

   Deberías ver dos contenedores: uno para tu aplicación y otro para `istio-proxy`.

En este punto, Istio está gestionando el tráfico de tus servicios. Continúa a la siguiente sección para verificar la instalación general.

## 4. Verificar la Instalación de Istio

Después de instalar Istio y habilitar la inyección de sidecar para tus servicios, es importante verificar que todo esté funcionando correctamente. Esta sección te guiará a través de la comprobación de la salud y funcionalidad de tu instalación de Istio.

### Pasos:

1. **Revisa el Plano de Control de Istio**

   Usa el siguiente comando para listar todos los pods en el namespace `istio-system`, asegurándote de que los componentes del plano de control estén en ejecución:

   ```bash
   kubectl get pods -n istio-system
   ```

   Deberías ver varios pods, como `istiod`, `istio-ingressgateway`, y posiblemente otros, dependiendo de tu configuración. Ejemplo de salida:

   ```bash
   NAME                                    READY   STATUS    RESTARTS   AGE
   istiod-7dfc7c98d6-8nb8t                 1/1     Running   0          3m
   istio-ingressgateway-56fc9cf56b-6l6m8   1/1     Running   0          3m
   ```
2. **Verifica la Inyección del Sidecar**

   Verifica que el sidecar (`istio-proxy`) esté en ejecución en uno de los pods de tu aplicación. Lista todos los pods en el namespace donde está ejecutándose tu aplicación:

   ```bash
   kubectl get pods -n <your-namespace>
   ```

   Luego, puedes inspeccionar un pod para confirmar que el sidecar ha sido inyectado:

   ```bash
   kubectl describe pod <your-pod-name> -n <your-namespace>
   ```

   Deberías ver dos contenedores listados: uno para tu aplicación y otro para `istio-proxy`.

3. **Monitorea el Estado de Istio**

   Puedes monitorear la salud de tus componentes de Istio revisando los logs. Por ejemplo, para ver los logs del componente `istiod`, usa:

   ```bash
   kubectl logs -n istio-system -l app=istiod
   ```

:::tip[😉]
Si todas las verificaciones anteriores tienen éxito, Istio debería estar completamente instalado y operativo en tu clúster. Ahora puedes comenzar a aprovechar las potentes capacidades de gestión de tráfico, seguridad y observabilidad de Istio.
:::