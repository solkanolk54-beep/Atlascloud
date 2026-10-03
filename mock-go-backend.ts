import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// 1. مسار نظرة عامة على النظام
app.get('/api/v1/system/overview', (req, res) => {
  res.json({
    uptime_percentage: '99.99%',
    k8s_nodes: 12,
    patroni_status: 'PostgreSQL 16 Active',
    s3_storage_used: '2.4 TB',
    active_region: 'dz-north-1',
    compliance: 'Loi 18-07 ANPDP Certified',
  });
});

// 2. مسار قواعد بيانات PostGIS
app.get('/api/v1/databases/postgis', (req, res) => {
  res.json([
    {
      id: 'db-01',
      name: 'db-satim-gis-prod',
      region: 'dz-north-1',
      active_extensions: ['PostGIS 3.4', 'pgvector'],
      ha_sync_status: 'Patroni Sync (RPO=0)',
      status: 'HEALTHY',
    },
    {
      id: 'db-02',
      name: 'db-felaha-agri-map',
      region: 'dz-south-1 (Ouargla Edge)',
      active_extensions: ['PostGIS', 'Raster'],
      ha_sync_status: 'Active Replica',
      status: 'HEALTHY',
    },
    {
      id: 'db-03',
      name: 'db-logistiq-routing',
      region: 'dz-west-1 (Oran Port)',
      active_extensions: ['pgRouting', 'PostGIS'],
      ha_sync_status: 'Multi-Master Read Pool',
      status: 'HEALTHY',
    },
  ]);
});

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws/v1/iot/stream' });

function roundTwo(val: number): number {
  return Math.round(val * 100) / 100;
}

wss.on('connection', (ws: WebSocket) => {
  console.log('[WebSocket] Client connected to /ws/v1/iot/stream');

  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-DZ', { hour12: false });
      const payload = [
        {
          node_id: 'IoT-Node-44',
          device_name: 'Truck-DZ-023 (Algiers -> Oran)',
          temperature: roundTwo(2.5 + Math.random() * 1.8),
          humidity: roundTwo(50.0 + Math.random() * 10.0),
          latitude: 36.7538,
          longitude: 3.0588,
          timestamp: timeStr,
        },
        {
          node_id: 'Agri-Node-102',
          device_name: 'Biskra Olive Farm Plot-04',
          temperature: roundTwo(27.0 + Math.random() * 2.2),
          humidity: roundTwo(65.0 + Math.random() * 5.0),
          latitude: 34.85,
          longitude: 5.7333,
          timestamp: timeStr,
        },
        {
          node_id: 'IoT-Node-12',
          device_name: 'Pharma-Truck-Saidal (Constantine -> Ouargla)',
          temperature: roundTwo(3.8 + Math.random() * 0.9),
          humidity: roundTwo(48.0 + Math.random() * 6.0),
          latitude: 33.2201,
          longitude: 4.8812,
          timestamp: timeStr,
        },
      ];
      ws.send(JSON.stringify(payload));
    }
  }, 3000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('[WebSocket] Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`🚀 AtlasCloud Sovereign Backend API (Go-compatible) running on http://localhost:${port}`);
  console.log(`📡 WebSocket stream live at ws://localhost:${port}/ws/v1/iot/stream`);
});
