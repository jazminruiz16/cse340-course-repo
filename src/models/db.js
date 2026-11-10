import { Pool } from 'pg';

/**
 * Grupo de conexiones para una base de datos PostgreSQL.
 * 
 * Un grupo de conexiones mantiene un conjunto de conexiones a la base de datos que pueden reutilizarse,
 * evitando así la sobrecarga que supone crear nuevas conexiones para cada solicitud.
 * Esto mejora el rendimiento y reduce la carga sobre el servidor de bases de datos.
 * 
 * Utiliza una cadena de conexión proveniente de variables de entorno para simplificar la configuración.
 * El formato de la cadena de conexión es:
 * postgresql://nombre_de_usuario:contraseña@host:puerto/base_de_datos
 */
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

/**
* Problema común con SSL:
 *
 * Es posible que encuentres errores de conexión SSL dependiendo de tu sistema operativo,
 * la versión de Node.js o la configuración del servidor PostgreSQL. Si has confirmado
 * que tus credenciales son correctas pero sigues viendo errores SSL, intenta actualizar
 * la propiedad 'ssl' en la configuración de 'Pool' (mostrada arriba) a:
 *
 * ssl: {
 *     rejectUnauthorized: false
 * }
 */

/**
 * Dado que modificaremos el objeto *pool* estándar en modo de desarrollo, necesitamos crear y
 * exportar una referencia a dicho objeto. Esto nos permite utilizar el mismo nombre para la
 * exportación, independientemente de si nos encontramos en modo de desarrollo o de producción.
 */
let db = null;

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SQL_LOGGING === 'true') {
    /**
     * En el modo de desarrollo, envolvemos el pool para proporcionar registro de consultas.
     * Esto facilita la depuración al mostrar en la consola todas las consultas ejecutadas.
     * 
     * El envoltorio también añade información sobre el tiempo de ejecución para ayudar a identificar consultas lentas,
     * y realiza un seguimiento del número de filas afectadas por cada consulta.
     */
    db = {
        async query(text, params) {
            try {
                const start = Date.now();
                const res = await pool.query(text, params);
                const duration = Date.now() - start;
                console.log('Executed query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    duration: `${duration}ms`,
                    rows: res.rowCount
                });
                return res;
            } catch (error) {
                console.error('Error in query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    error: error.message
                });
                throw error;
            }
        },

        async close() {
            await pool.end();
        }
    };
} else {
    // In production, export the pool directly without logging overhead
    db = pool;
}

/**
 * Tests the database connection by executing a simple query.
 */
const testConnection = async () => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

export { db as default, testConnection };
