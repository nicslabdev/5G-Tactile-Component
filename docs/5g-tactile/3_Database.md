---
sidebar_position: 3
---

# Bases de datos

La protección de las bases de datos es un aspecto crucial para garantizar la seguridad y privacidad de la información almacenada en el sistema. En esta sección, abordaremos las mejores prácticas y recomendaciones para implementar cifrado en las bases de datos, asegurando que los datos sensibles estén protegidos tanto en reposo como en tránsito.

El cifrado de bases de datos implica la utilización de algoritmos criptográficos para convertir los datos legibles en un formato codificado, que solo puede ser descifrado por personas o sistemas autorizados. Este proceso es esencial para prevenir accesos no autorizados y mitigar riesgos asociados con la exposición de datos sensibles.

## Importancia del Cifrado de Bases de Datos

El cifrado de bases de datos ofrece múltiples beneficios, entre los que se incluyen:

- **Confidencialidad**: Protege la información sensible contra accesos no autorizados.
- **Integridad**: Asegura que los datos no sean alterados de manera maliciosa.
- **Cumplimiento Normativo**: Ayuda a cumplir con regulaciones y estándares de seguridad de datos.

En los siguientes apartados, exploraremos diferentes técnicas y herramientas para implementar cifrado en bases de datos, así como las consideraciones clave para mantener un entorno seguro y eficiente.

## Cifrado en MongoDB

MongoDB ofrece soporte nativo para el cifrado de datos en reposo, lo que permite proteger la información almacenada en la base de datos mediante el uso de algoritmos criptográficos avanzados. Para habilitar el cifrado en MongoDB, se puede utilizar la característica de Encrypted Storage Engine, que cifra automáticamente los datos antes de escribirlos en el disco.

### Configuración del Cifrado en MongoDB

Para configurar el cifrado en MongoDB, sigue estos pasos:

1. **Instalar MongoDB Enterprise**: El cifrado en reposo está disponible en la versión Enterprise de MongoDB.
2. **Configurar el archivo de configuración**: Añade las siguientes líneas al archivo de configuración `mongod.conf`:

    ```yaml
    security:
      enableEncryption: true
      encryptionKeyFile: /path/to/encryption/keyfile
    ```

3. **Reiniciar el servicio MongoDB**: Aplica los cambios reiniciando el servicio MongoDB.

:::note Open Twins
Para el caso concreto de Open Twins, se debe añadir esta información en la sección correspondiente del archivo `values.yaml` del repositorio de Helm charts. Puedes encontrar la ubicación exacta [aquí](https://github.com/ertis-research/Helm-charts/blob/a6d09d2020f4e483427bc2e9c7146fb62ab3fb95/OpenTwins/values.yaml#L301C51-L302C1).
:::

## Cifrado en InfluxDB

A diferencia de MongoDB, InfluxDB no ofrece soporte nativo para el cifrado de datos en reposo. Por lo tanto, es necesario cifrar el disco duro donde se almacena la base de datos para asegurar la protección de los datos.

Por ello se recomienda al administrador de la infraestructura comunicar antes de la instalación que los discos que almacenen datos deben tener cifrado activado. Sin embargo, a continuación se describe una guía para cifrar discos duros en un entorno LINUX.

:::danger IMPORTANTE
El cifrado de los discos debe realizarse **antes** de almacenar datos, ya que el proceso de cifrado generalmente implica el formateo de los discos, lo que resultará en la pérdida de cualquier dato previamente almacenado.
:::

### Configuración del Cifrado de Disco en InfluxDB

Para cifrar el disco duro en un sistema Linux, puedes utilizar herramientas como `LUKS` (Linux Unified Key Setup). A continuación, se describen los pasos básicos para cifrar un disco utilizando `LUKS`:

1. **Instalar las herramientas necesarias**:

    ```sh
    sudo apt-get install cryptsetup
    ```

2. **Cifrar el disco**:

    ```sh
    sudo cryptsetup luksFormat /dev/sdX
    ```

3. **Abrir el disco cifrado**:

    ```sh
    sudo cryptsetup luksOpen /dev/sdX encrypted_disk
    ```

4. **Crear un sistema de archivos en el disco cifrado**:

    ```sh
    sudo mkfs.ext4 /dev/mapper/encrypted_disk
    ```

5. **Montar el disco cifrado**:

    ```sh
    sudo mount /dev/mapper/encrypted_disk /mnt/influxdb
    ```

6. **Configurar InfluxDB para utilizar el disco cifrado**: Modifica el archivo de configuración de InfluxDB para que almacene los datos en el directorio montado.

    ```toml
    [data]
      dir = "/mnt/influxdb/data"
      wal-dir = "/mnt/influxdb/wal"
    ```