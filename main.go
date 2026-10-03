package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// هيكل بيانات PostGIS DBaaS
type PostGISInstance struct {
	ID               string   `json:"id"`
	Name             string   `json:"name"`
	Region           string   `json:"region"`
	ActiveExtensions []string `json:"active_extensions"`
	HASyncStatus     string   `json:"ha_sync_status"`
	Status           string   `json:"status"`
}

// هيكل بيانات مستشعرات IoT
type IoTSensorData struct {
	NodeID      string  `json:"node_id"`
	DeviceName  string  `json:"device_name"`
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	Timestamp   string  `json:"timestamp"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func main() {
	r := gin.Default()

	// تمكين CORS للوحة التحكم
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// 1. مسار نظرة عامة على النظام (System Status)
	r.GET("/api/v1/system/overview", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"uptime_percentage": "99.99%",
			"k8s_nodes":        12,
			"patroni_status":   "PostgreSQL 16 Active",
			"s3_storage_used":  "2.4 TB",
			"active_region":    "dz-north-1",
			"compliance":       "Loi 18-07 ANPDP Certified",
		})
	})

	// 2. مسار جلب قواعد بيانات PostGIS
	r.GET("/api/v1/databases/postgis", func(c *gin.Context) {
		instances := []PostGISInstance{
			{
				ID:               "db-01",
				Name:             "db-satim-gis-prod",
				Region:           "dz-north-1",
				ActiveExtensions: []string{"PostGIS 3.4", "pgvector"},
				HASyncStatus:     "Patroni Sync (RPO=0)",
				Status:           "HEALTHY",
			},
			{
				ID:               "db-02",
				Name:             "db-felaha-agri-map",
				Region:           "dz-south-1 (Ouargla Edge)",
				ActiveExtensions: []string{"PostGIS", "Raster"},
				HASyncStatus:     "Active Replica",
				Status:           "HEALTHY",
			},
		}
		c.JSON(http.StatusOK, instances)
	})

	// 3. مسار بث البث المباشر لمستشعرات IoT عبر WebSocket
	r.GET("/ws/v1/iot/stream", func(c *gin.Context) {
		ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			return
		}
		defer ws.Close()

		for {
			// توليد قراءات حية لشاحنة نقل مبرد ومزرعة زيتون
			data := []IoTSensorData{
				{
					NodeID:      "IoT-Node-44",
					DeviceName:  "Truck-DZ-023 (Algiers -> Oran)",
					Temperature: roundThreeDigits(2.5 + rand.Float64()*1.5),
					Humidity:    roundThreeDigits(50.0 + rand.Float64()*10.0),
					Latitude:    36.7538,
					Longitude:   3.0588,
					Timestamp:   time.Now().Format("15:04:05"),
				},
				{
					NodeID:      "Agri-Node-102",
					DeviceName:  "Biskra Olive Farm Plot-04",
					Temperature: roundThreeDigits(27.0 + rand.Float64()*2.0),
					Humidity:    roundThreeDigits(65.0 + rand.Float64()*5.0),
					Latitude:    34.8500,
					Longitude:   5.7333,
					Timestamp:   time.Now().Format("15:04:05"),
				},
			}

			if err := ws.WriteJSON(data); err != nil {
				break
			}
			time.Sleep(3 * time.Second)
		}
	})

	fmt.Println("🚀 AtlasCloud Sovereign Backend API running on port :8080...")
	r.Run(":8080")
}

func roundThreeDigits(val float64) float64 {
	return float64(int(val*100)) / 100
}
