import { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

type Registro = { id: number; texto: string; creado_en: string };

// Se ejecuta una vez, antes de mostrar la pantalla: prepara la base de datos.
async function migrarSiHaceFalta(db: SQLiteDatabase) {
  const VERSION_ACTUAL = 1;
  const fila = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const versionGuardada = fila?.user_version ?? 0;
  if (versionGuardada >= VERSION_ACTUAL) return;

  if (versionGuardada === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE registros (
        id INTEGER PRIMARY KEY NOT NULL,
        texto TEXT NOT NULL,
        creado_en TEXT NOT NULL
      );
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${VERSION_ACTUAL}`);
}

function Pantalla() {
  const db = useSQLiteContext();
  const [registros, setRegistros] = useState<Registro[]>([]);

  const cargar = useCallback(async () => {
    const filas = await db.getAllAsync<Registro>('SELECT * FROM registros ORDER BY id DESC');
    setRegistros(filas);
  }, [db]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const agregar = async () => {
    const texto = `Registro n.º ${registros.length + 1}`;
    await db.runAsync(
      'INSERT INTO registros (texto, creado_en) VALUES (?, ?)',
      texto,
      new Date().toISOString()
    );
    await cargar();
  };

  const [mensaje, setMensaje] = useState('');

  const generarMuchos = async () => {
    const inicio = Date.now();
    await db.withTransactionAsync(async () => {
      for (let i = 1; i <= 200; i++) {
        await db.runAsync(
          'INSERT INTO registros (texto, creado_en) VALUES (?, ?)',
          `Clase de prueba ${i}`,
          new Date().toISOString()
        );
      }
    });
    const ms = Date.now() - inicio;
    await cargar();
    setMensaje(`Se guardaron 200 registros en ${ms} ms`);
  };

  const borrarTodo = async () => {
    await db.runAsync('DELETE FROM registros');
    await cargar();
    setMensaje('Se borraron todos los registros');
  };
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Prueba de SQLite</Text>
      <Text>Registros guardados: {registros.length}</Text>
      <Button title="Guardar un registro" onPress={agregar} />
      <Button title="Generar 200 registros" onPress={generarMuchos} />
      <Button title="Borrar todo" onPress={borrarTodo} />
      <Text>{mensaje}</Text>
      <FlatList
        data={registros}
        keyExtractor={(r) => r.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.fila}>
            {item.texto} · {item.creado_en}
          </Text>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="poc.db" onInit={migrarSiHaceFalta}>
      <Pantalla />
      <StatusBar style="auto" />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, paddingTop: 70, paddingHorizontal: 20, gap: 12 },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  fila: { paddingVertical: 6 },
});