# CALL INVERSION API - The Financial Engine

> Motor de cálculo financiero y API REST para el simulador Call Inversion. Gestiona la lógica de proyecciones, diversificación de activos y seguridad mediante algoritmos de paridad de riesgo.

## Índice

- [Sobre el Backend](#sobre-el-backend)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura de la API](#arquitectura-de-la-api)
- [Lógica del Algoritmo](#lógica-del-algoritmo)
- [Instalación y Ejecución Local](#instalación-y-ejecución-local)
- [Variables de Envío](#variables-de-entorno)
- [Seguridad y CORS](#seguridad-y-cors)

---

## Sobre el Backend
Este repositorio constituye el "cerebro" logístico del proyecto **Call Inversion**. Mientras que el frontend se encarga de la experiencia de usuario y la visualización, este motor transforma las intenciones del inversor en datos financieros precisos.

Su función principal es eliminar la arbitrariedad en la inversión, aplicando fórmulas matemáticas que equilibran el beneficio esperado con la tolerancia al riesgo real de los activos almacenados en nuestra base de datos.

### 🚀 Responsabilidades del Backend
Su función es transformar datos crudos de mercado en estrategias de inversión mediante:
- **Algoritmo de Paridad de Riesgo:** Distribución automática de capital inversamente proporcional al drawdown de los activos.
- **Motor de Proyección:** Cálculo de interés compuesto con simulación de escenarios de caídas (drawdowns) cíclicas.
- **Capa de Seguridad:** Middleware de validación de JWT mediante Supabase Auth para proteger el motor de cálculo.

## Tecnologías Utilizadas
Este motor ha sido construido con un stack enfocado en la precisión matemática y la seguridad:
- **Runtime:** Node.js
- **Framework:** Express.js (Arquitectura de Middlewares)
- **Base de Datos:** Supabase (PostgreSQL)
- **Seguridad:** JSON Web Tokens (JWT) mediante Supabase Auth & CORS configurado para entornos seguros.
- **Documentación:** JSDoc evolucionado a lógica de tipos.

## Arquitectura de la API
La comunicación con el frontend se realiza a través de una API REST estructurada:

| Método | Ruta | Descripción | Protegido |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/status` | Verifica el estado del servidor. | No |
| **GET** | `/api/activos` | Obtiene activos filtrados por riesgo. | **Sí (JWT)** |
| **POST** | `/api/calculadora` | Ejecuta el algoritmo de proyección. | **Sí (JWT)** |

## Lógica del Algoritmo
El núcleo del sistema utiliza un modelo de **Ponderación Inversa al Riesgo**.

El peso de cada activo ($W_i$) en la cartera se calcula en función de su *Máximo Drawdown* ($DD$):

### El Algoritmo: Ponderación Inversa al Riesgo
A diferencia de los simuladores lineales, nuestra API calcula el peso de cada activo en la cartera basándose en su volatilidad histórica:
$$Peso_i = \frac{1/DD_i}{\sum (1/DD_n)}$$
*Donde $DD$ es el Máximo Drawdown registrado del activo.*

$$W_i = \frac{1/DD_i}{\sum (1/DD_n)}$$

Esto garantiza una diversificación inteligente donde los activos más volátiles tienen una exposición controlada, optimizando la estabilidad de la cartera total.

## Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/call-inversion-api.git](https://github.com/TU_USUARIO/call-inversion-api.git)





