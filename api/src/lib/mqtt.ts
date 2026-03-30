import mqtt from 'mqtt';
import { ReadingsService } from '../readings/service';

let client: mqtt.MqttClient;

export const connectMQTT = () => {
  const host = process.env.MQTT_HOST ?? 'localhost';
  const port = process.env.MQTT_PORT ?? '1883';

  client = mqtt.connect(`mqtt://${host}:${port}`);

  client.on('connect', () => {
    console.log(`[MQTT] Conectado al broker ${host}:${port}`);
    client.subscribe('agrisec/sensors', (err) => {
      if (err) console.error('[MQTT] Error al suscribirse:', err);
      else console.log('[MQTT] Suscrito a agrisec/sensors');
    });
  });

  client.on('error', (error) => {
    console.error('[MQTT] Error de conexión:', error);
  });

  client.on('message', async (_topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      await ReadingsService.save(payload);
    } catch (error) {
      console.error('[MQTT] Error procesando mensaje:', error);
    }
  });

  client.on('disconnect', () => {
    console.warn('[MQTT] Desconectado del broker');
  });

  return client;
};

export const getMQTTClient = () => client;
