Respuestas a las preguntas de TASKS.md

Q1 — Diagnóstico de ruta muerta

Al ejecutar GET /tasks obtuve un 404 porque findAll() no tiene decorador de ruta y NestJS no lo registra como endpoint. Vi que NestJS solo expone métodos anotados con decoradores de ruta como @Get(). Para arreglarlo añadí @Get() encima de findAll() y al hacerlo la ruta GET /tasks quedó disponible.

Q2 — transform: true vs ParseIntPipe

Al revisar el código vi que transform: true convierte cuerpos a instancias de DTO, pero no sustituye la validación de parámetros de ruta. Yo uso ParseIntPipe para transformar y validar el parámetro :id en la fase de tubería; al fallar la conversión lanza 400. En resumen, transform hace conversión global para DTOs y ParseIntPipe es una comprobación explícita y temprana para parámetros individuales.

Q3 — Silent strip vs hard rejection

Al probar sin forbidNonWhitelisted y manteniendo whitelist: true, la petición se aceptó y obtuve 201 si la creación era válida; observé que la propiedad password se eliminó antes de llegar al servicio. El servicio recibió el DTO sin password y no lo persistió. Esto puede ser problemático porque se silencian campos inesperados y se pueden ocultar errores o suposiciones inseguras sobre los datos.

Q4 — Efecto secundario por mutación

Comprobé que findAll() devuelve referencias internas, así que al modificar el objeto devuelto cambié el estado del servicio porque los objetos se pasan por referencia. También vi que Object.assign en update muta el objeto original en el arreglo. Para evitarlo devuelvo copias con this.products.map(p => ({...p})) o creo y reemplazo un nuevo objeto en vez de mutar el existente.

Q5 — Trampa del campo opcional

Al enviar { "price": -50 } la validación falló porque @IsPositive se aplica si price está presente y el valor negativo rompe la regla. Al enviar {} la validación pasó porque @IsOptional hace que los validadores se omitan cuando la propiedad es undefined o null. @IsOptional no valida campos ausentes; no permite valores inválidos si la propiedad está presente.

Q6 — Reuso de IDs tras eliminación

Borré la tarea 1 y luego creé una nueva; la nueva tarea recibió el valor actual de nextId, así que no se reutilizó el id eliminado. Vi que findOne(1) sigue fallando con NotFound hasta que exista otra tarea con ese id. Si hubiéramos usado this.tasks.length + 1 se podrían generar ids duplicados tras borrados y creaciones, causando colisiones y búsquedas erróneas.

Q7 — Módulo olvidado

Arranqué el servidor y no falló; al intentar POST /users obtuve 404 porque el controlador no estaba registrado en la aplicación. Es un error de configuración en tiempo de ejecución, no un error de compilación.

Q8 — Falta de 201

Al probar un POST de creación observé que por defecto @Post() devuelve 201 Created en NestJS. No es imprescindible añadir @HttpCode(201) si queremos ese comportamiento, pero yo suelo declararlo para dejar el contrato explícito. Esto importa cuando los clientes dependen de un código específico o cuando se quiere cambiar la respuesta por defecto.

Q9 — Servicio que devuelve null vs lanza excepción

Si el servicio devolviera null la firma sería findOne(id: number): Product | null y el controlador tendría que comprobarlo, por ejemplo: const p = this.productsService.findOne(id); if (!p) throw new NotFoundException(...); return p;. Prefiero la versión que lanza NotFoundException desde el servicio porque centraliza la política de errores y evita repetir comprobaciones nulas en cada llamador; así update y remove no necesitan volver a validar la existencia y el flujo queda más claro.
