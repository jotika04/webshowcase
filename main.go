package main

import (
	// Import Fiber Swagger
	"github.com/arsmn/fiber-swagger/v2"
	// Import Go Fiber
	"github.com/gofiber/fiber/v2"
	// Side Effect import for auto-generated swagger documentation
	_ "boilerplate_go_rest/docs"
	"boilerplate_go_rest/auth"
	"boilerplate_go_rest/database"
	"log"
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

func connect_db() {
	var err error
    database.DBConn, err = sql.Open("mysql", "root:my-secret-pw@tcp(127.0.0.1:3306)/showcasedb?parseTime=true")
    database.DBConn.SetMaxIdleConns(0) //No Idle connection
	database.DBConn.SetMaxOpenConns(400) //Max connection to 400
	database.DBConn.SetConnMaxLifetime(time.Second * 5) //Connection dies after 5 seconds

    if err != nil {
        log.Fatal(err)
    }
    if err := database.DBConn.Ping(); err != nil {
        log.Fatal(err)
    }
    fmt.Println("Database connection successfully opened")
}

func setupRoutes(app *fiber.App) {
	// Add endpoint to serve swagger documentation
	app.Get("/swagger/*", swagger.New(swagger.Config{ // custom
		URL:         "/swagger/doc.json",
		DeepLinking: false,
	}))

	// Add endpoint to get an item by it's ID
	app.Get("/api/item/:id", GetItem)

	app.Post("/api/user/", auth.RegisterUser)
	app.Get("/api//user/:userID", auth.GetUser)
}

// @title Fiber Example API
// @version 1.0
// @description This is a sample swagger for Fiber
// @contact.name API Support
// @contact.email youremail@provider.com
// @host localhost:3000
// @BasePath /
func main() {
	// Create new Fiber application
	app := fiber.New()

	connect_db()

	defer database.DBConn.Close()

	setupRoutes(app)

	// Listen on the port '3000'
	app.Listen(":3000")
}

// GetItem godoc
// @Summary Get an item
// @Description Get an item by its ID
// @ID get-item-by-int
// @Accept  json
// @Produce  json
// @Tags Item
// @Param id path int true "Item ID"
// @Success 200 {object} Item
// @Failure 400 {object} HTTPError
// @Failure 404 {object} HTTPError
// @Failure 500 {object} HTTPError
// @Router /api/item/{id} [get]
func GetItem(c *fiber.Ctx) error {
	// Create new Item and returns it
	return c.JSON(Item{
		Id: c.Params("id"),
	})
}

type Item struct {
	Id string
}

type HTTPError struct {
	Status  string
	Message string
}
