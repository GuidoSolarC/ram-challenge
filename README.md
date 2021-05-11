# Rick & Morty Challenge

Para poder ejecutar el proyecto, basta con:

## Clonar repositorio
```
git clone https://github.com/GuidoSolarC/ram-challenge.git
```

## Instalar las dependencias
```
npm install
```

### Luego compilar
```
npm run serve
```
---

## Descripción
Utilicé para este proyecto Vue.js (v2), utilizando axios, vue-router, Bootstrap 5, FontAwesome.

Mi idea principal, fue construir un componente principal, que contuviera "componentes hijos" independientes con su lógica respectiva.
Al momento de "cargar" por primera vez el proyecto, los componentes realizarán su lógica de manera automática, con la opción de poder refrescar c/u de estos onDemand.

La estructura de archivos, está compuesta de la siguiente manera.

![Captura de Pantalla 2021-05-04 a la(s) 21 22 07](https://user-images.githubusercontent.com/36977397/117087887-cfb06480-ad1e-11eb-9d05-ddb83e2a8459.png)

Una vez desplegado el proyecto, se debiera visualizar lo siguiente.
![Captura de Pantalla 2021-05-04 a la(s) 21 23 13](https://user-images.githubusercontent.com/36977397/117087941-04bcb700-ad1f-11eb-85e4-fd74b87b1ac0.png)

---
### Pequeño disclaimer
Lamentablemente, no me la pude con los unit testing, porque no he podido tener la experiencia de utilizarlos en los ambientes donde he trabajado anteriormente, y tampoco me he dado el tiempo de estudiarlo de manera consciente, asi que me queda por aprender a usarlos de ahora en más.
Gracias por su tiempo.
