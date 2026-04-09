# Respuestas :)

## Activity 1:

1. What happens if you send a POST to /products with price: -5? Why?
   R/ La respueta al hacerlo es que:
   {
   "message": [
   "price must be a positive number"
   ],
   "error": "Bad Request",
   "statusCode": 400
   }
   Dado a los servicios que se hicieron para porductos y sus caracteristicas

2. What is the role of ParseIntPipe in @Param('id', ParseIntPipe)?
   R/ Es para que no se haga una comparacion de int y str dado que la url es un str entonces convierte a numero lo que se le pase por primer parametro

3. What would happen without @IsNotEmpty() on name?
   R/ Pues que el nombre podria quedar vacio al hacer el post

4. Why does the service throw NotFoundException instead of returning null?
   R/ Es dado que se devuelve es el error por ello el mensaje de error NotFoundException en vez de null

5. What is the difference between @Get() and @Get(':id')?
   R/ Get() trae todos los de un objeto y Get(":id") tiene que pasar por url un parametro id por lo que se consigue solo de un objeto
